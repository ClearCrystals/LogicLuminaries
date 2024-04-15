import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { useUser } from "./UserContext";

axios.defaults.xsrfCookieName = "csrfToken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

/**
 * Represents an authentication form for signin and signup.
 *
 * This component allows a user to either sign in or sign up
 * based on the selected authentication mode. The mode can
 * be switched between 'signin' and 'signup'. The form submits
 * the data to a specified URL and then navigates to another
 * page upon successful authentication.
 *
 * @param {Object} props - The properties passed to the component.
 * @returns {React.Component} The `AuthForm` component.
 */

export default function AuthForm(props) {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [id, setId] = useState("");
  let [authMode, setAuthMode] = useState("signin");
  const [showSuccess, setShowSuccess] = useState(false);
  const { setUsername } = useUser(); // Get setUsername from context
  const navigate = useNavigate();

  useEffect(() => {
    const modeFromURL = new URLSearchParams(window.location.search).get("mode");
    if (modeFromURL && (modeFromURL === "signup" || modeFromURL === "signin")) {
      setAuthMode(modeFromURL);
    }
  }, []);

//   This is where authentication needs to occur. Other pages will be blocked depending on auth token.

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !pwd) {
      console.error("Email and password are required.");
      return; // Prevent further execution
    }

    const url =
      authMode === "signin"
        ? "http://localhost:8000/sudoku/signin/"
        : "http://localhost:8000/sudoku/signup/";

    const data = authMode === "signin" ? { email, pwd } : { id, email, pwd };

    const csrfToken = Cookies.get("csrfToken");

    try {
      console.log(`Sending data to ${url}:`, JSON.stringify(data));
      let response = await axios.post(url, JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
        },
      });
      if (response.status === 200) {
        if (authMode === "signin") {
          setUsername(email); // Set username in context after successful sign in
        } else if (authMode === "signup") {
          setUsername(email); // Also set it after signing up
          setShowSuccess(true);
        }
        navigate("/components/Games"); // Navigate after setting the context
      }

      console.log(`${authMode} response:`, response.data);
      setShowSuccess(true);
    } catch (error) {
      console.error(`Error during ${authMode}:`, error);
    }
  };

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin");
    setShowSuccess(false);
  };

  return (
    //add back button on sign in
    <div id="authContainer">
      <Container>
        <Row>
          <Col id="authCol">
            {showSuccess && (
              <div
                style={{
                  color: "green",
                  backgroundColor: "lightgreen",
                  padding: "10px",
                  marginBottom: "10px",
                }}
              >
                Account created successfully! Please signin.
              </div>
            )}
            <form className="Auth-form" onSubmit={handleSubmit}>
              <h1 style={{ textAlign: "center" }}>
                {authMode === "signin" ? "Sign In" : "Sign Up"}
              </h1>
              {/* TODO: bootstrap forms */}
              {authMode === "signup" && (
                <div className="form_item">
                  <label className="form_label">ID </label>
                  <input
                    type="text"
                    placeholder="Enter ID"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                  />
                </div>
              )}
              <div className="form_item">
                <label className="form_label">Email address </label>
                <input
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form_item">
                <label className="form_label">Password </label>
                <input
                  type="password"
                  placeholder="Enter password"
                  value={pwd}
                  onChange={(e) => setPwd(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
              <p className="text-center mt-2">
                {authMode === "signin"
                  ? "Need an account? "
                  : "Already registered? "}
                <button className="link-like-button" onClick={changeAuthMode}>
                  {authMode === "signin" ? "Sign Up" : "Sign In"}
                </button>
              </p>
            </form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

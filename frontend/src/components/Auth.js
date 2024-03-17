import React, { useState } from "react";
import axios from "axios";
import Cookies from 'js-cookie';

axios.defaults.xsrfCookieName = 'csrfToken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

export default function AuthForm(props) {
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState(""); // Updated to match serializer field
    const [id, setId] = useState(""); // Represents the user ID for signup
    let [authMode, setAuthMode] = useState("signin");

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = { email, pwd, id }; // Updated to match serializer fields

        const url = "http://localhost:8000/api/sudoku/"; // Adjust URL as needed

        const csrfToken = Cookies.get('csrftoken');

        try {
            console.log(JSON.stringify(data)); // Log data to be sent
            let response = await axios.post(url, JSON.stringify(data), {
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,
                }
            });
            console.log(response.data); // Log response data
        } catch (error) {
            console.error("Error during authentication:", error);
        }
    };

    const changeAuthMode = () => {
        setAuthMode(authMode === "signin" ? "signup" : "signin")
    }

    return (
        <div>
            <form className="Auth-form" onSubmit={handleSubmit}>
                <h3>{authMode === "signin" ? "Sign In" : "Sign Up"}</h3>
                {authMode === "signup" && (
                    <div>
                        <label>ID</label>
                        <input
                            type="text"
                            placeholder="Enter ID"
                            value={id}
                            onChange={e => setId(e.target.value)}
                        />
                    </div>
                )}
                <div>
                    <label>Email address</label>
                    <input
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="Enter password"
                        value={pwd}
                        onChange={e => setPwd(e.target.value)}
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
        </div>
    );
}

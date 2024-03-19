import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";

axios.defaults.xsrfCookieName = 'csrfToken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

export default function AuthForm(props) {
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState(""); 
    const [id, setId] = useState(""); 
    let [authMode, setAuthMode] = useState("signin");

    const navigate = useNavigate();

    useEffect(() => {
        const modeFromURL = new URLSearchParams(window.location.search).get('mode');
        if (modeFromURL && (modeFromURL === 'signup' || modeFromURL === 'signin')) {
            setAuthMode(modeFromURL);
        }
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!email || !pwd) {
            console.error("Email and password are required.");
            return; // Prevent further execution
        }

        const url = authMode === "signin" ? 
                    "http://localhost:8000/sudoku/signin/" : 
                    "http://localhost:8000/sudoku/signup/";

        const data = authMode === "signin" ? 
                     { email, pwd } : 
                     { id, email, pwd };

        const csrfToken = Cookies.get('csrfToken');

        try {
            console.log(`Sending data to ${url}:`, JSON.stringify(data));
            let response = await axios.post(url, JSON.stringify(data), {
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,
                }
            });
            if (response.status === 200) { // Assuming 200 is the success status code
                navigate("/components/Games"); // Adjust the path as per your route configuration
            }

            console.log(`${authMode} response:`, response.data);
        } catch (error) {
            console.error(`Error during ${authMode}:`, error);
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

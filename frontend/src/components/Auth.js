import React, { useState } from "react"
export default function (props) {
    let [authMode, setAuthMode] = useState("signin")
    const changeAuthMode = () => {
        setAuthMode(authMode === "signin" ? "signup" : "signin")
    }
    if (authMode === "signin") {
        return (
            <div>
                <form className="Auth-form">
                    <h3>Sign In</h3>
                    <div>
                        <label>Email address</label>
                        <input
                            type="email"
                            placeholder="Enter email"
                        />
                    </div>
                    <div>
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="Enter password"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                    <p className="forgot-password text-right mt-2">
                        Forgot <a href="#">password?</a>
                    </p>
                </form>
            </div>
        )
    }
    return (
        <form className="Auth-form">
            Already registered?{" "}
            <span className="link-primary" onClick={changeAuthMode}>
                Sign In
            </span>
            <div>
                <label>Full Name</label>
                <input
                    type="email"
                    placeholder="e.g Jane Doe"
                />
            </div>
            <div>
                <label>Email address</label>
                <input
                    type="email"
                    placeholder="Email Address"
                />
            </div>
            <div>
                <label>Password</label>
                <input
                    type="password"
                    placeholder="Password"
                />
            </div>
            <div>
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </div>
            <p className="text-center mt-2">
                Forgot <a href="#">password?</a>
            </p>
        </form>
    )
}
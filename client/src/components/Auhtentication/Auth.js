import React, { useState } from "react";
import "./style.css";
// const dotenv = require("dotenv");
// dotenv.config();
import { useCookies } from "react-cookie";

const Auth = () => {
  const [islogin, setIsLogin] = useState(true);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [rePassword, setRePassword] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(null);

  const emailField = (e) => {
    e.preventDefault();

    setEmail(() => e.target.value);
  };

  const passwordField = (e) => {
    e.preventDefault();

    setPassword(() => e.target.value);
  };

  const handleConfirmPass = (e) => {
    e.preventDefault();

    setRePassword(() => e.target.value);
  };
  const handleSubmit = async (e, endpoint) => {
    e.preventDefault();
    if (!islogin && password !== rePassword) {
      setError("Please Make sure password match");
      return;
    }
    const response = await fetch(`http://localhost:8080/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const dataReceived = await response.json();
    if (dataReceived.detail) {
      setError(dataReceived.detail);
    } else {
      const { email, token } = dataReceived;
      setCookie("Email", email);
      setCookie("AuthToken", token);
      window.location.reload();
    }
  };

  const viewLogin = (boole) => {
    setError(null);
    setIsLogin(boole);
  };

  return (
    <div className="auth-container">
      <div className="auth-container-box">
        <form>
          <h2>{islogin ? "Please log in" : "Please Sign up!"}</h2>
          <input
            type="email"
            name="email"
            required
            placeholder="email address"
            onChange={(e) => emailField(e)}
          />
          <input
            type="password"
            name="password"
            required
            placeholder="Password"
            onChange={(e) => passwordField(e)}
          />
          {!islogin && (
            <input
              type="password"
              name="Repassword"
              required
              placeholder="confirm password"
              onChange={(e) => handleConfirmPass(e)}
            />
          )}
          <button
            style={{ height: "40px", borderRadius: "10px", cursor: "pointer" }}
            type="submit"
            onClick={(e) => handleSubmit(e, islogin ? "login" : "signup")}
          >
            {islogin ? "Login" : "Sign up"}
          </button>
          {error && <p>{error}</p>}
        </form>

        <div className="auth-options">
          <button
            onClick={() => viewLogin(false)}
            style={{ backgroundColor: islogin ? "white" : "darkgray" }}
          >
            {" "}
            Sign up
          </button>
          <button
            onClick={() => viewLogin(true)}
            style={{ backgroundColor: !islogin ? "white" : "darkgray" }}
          >
            {" "}
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;

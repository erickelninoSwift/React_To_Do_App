import React, { useState } from "react";
import "./style.css";
const Auth = () => {
  const [islogin, setIsLogin] = useState(true);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [rePassword, setRePassword] = useState(null);

  const handleSubmit = async (e, endpoint) => {
    e.preventDefault();
    if (!islogin && password !== rePassword) {
      setError("Please Make sure password match");
      return;
    }
    try {
      await fetch(`http://localhost:8080/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: "",
      });
    } catch (error) {}

    if ((islogin && !email) || !password) {
      setError("Please make sure you have filled all fields");
      return;
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
          />
          <input
            type="password"
            name="password"
            required
            placeholder="Password"
          />
          {!islogin && (
            <input
              type="password"
              name="password"
              required
              placeholder="confirm password"
            />
          )}
          <button
            style={{ height: "40px", borderRadius: "10px" }}
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

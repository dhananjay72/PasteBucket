import React from "react";
import "./login.css";

const Login = () => {
  return (
    <div className="form">
      <div className="login-form-heading">
        <h2>Log In</h2>
      </div>
      <div className="login-form-input">
        <input type="text" placeholder="Email" />
      </div>
      <div className="login-form-input">
        <input type="password" placeholder="password" />
      </div>
      <div>
        <button>Login</button>
      </div>
    </div>
  );
};

export default Login;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../features/userSlice";
import { Link } from "react-router-dom";
import { redirect, useNavigate } from "react-router-dom";

import "./login.css";

const Login = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("jwToken")) {
      navigate("/dashboard");
    }
  });

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  useNavigate(() => {
    if (isAuthenticated) navigate("/dashboard");
  });

  const dispatch = useDispatch();

  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleInput = async (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setInput({ ...input, [name]: value });
    // console.log(input);
  };

  return (
    <div className="form">
      <div className="login-form-heading">
        <h2>Log In</h2>
      </div>
      <div className="login-form-input">
        <input
          type="text"
          placeholder="Email"
          name="email"
          value={input.email}
          onChange={handleInput}
        />
      </div>
      <div className="login-form-input">
        <input
          type="password"
          name="password"
          placeholder="password"
          value={input.password}
          onChange={handleInput}
        />
      </div>
      <div className="input-btn">
        <button onClick={() => dispatch(login({ input }))}>Login</button>
      </div>
    </div>
  );
};

export default Login;

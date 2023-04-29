import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, registerUser } from "../../features/userSlice";
import { Link } from "react-router-dom";
import { redirect, useNavigate } from "react-router-dom";

import "./register.css";

const Register = () => {
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
    username: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const handleInput = async (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setInput({ ...input, [name]: value });
    // console.log(input);
  };

  const register = () => {
    console.log(input);
    dispatch(registerUser({ input }));
  };

  return (
    <div className="login-form">
      <div className="login-form-heading">
        <h2>Register</h2>
      </div>
      <div className="login-form-input">
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={input.username}
          onChange={handleInput}
        />
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
      <div className="login-form-input">
        <input
          type="password"
          name="cpassword"
          placeholder="Confirm password"
          value={input.cpassword}
          onChange={handleInput}
        />
      </div>
      <div className="input-btn">
        <button onClick={register}>Register</button>
      </div>
    </div>
  );
};

export default Register;

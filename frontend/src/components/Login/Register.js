import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, registerUser, setErrorMessage } from "../../features/userSlice";
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
  const errorMessage = useSelector((state) => state.user.errorMessage);

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

    if (input.username.length < 5) {
      dispatch(
        setErrorMessage({
          message: "Username must be at least 5 characters long.",
        })
      );
      return;
    }

    if (!validateEmail(input.email)) {
      dispatch(
        setErrorMessage({
          message: "Invalid email address",
        })
      );
      return;
    }

    if (input.cpassword !== input.password) {
      dispatch(
        setErrorMessage({
          message: "Passwords do not match",
        })
      );
      return;
    }

    dispatch(registerUser({ input }));
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
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
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <div className="input-btn">
        <button onClick={register}>Register</button>
      </div>
    </div>
  );
};

export default Register;

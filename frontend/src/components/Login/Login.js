import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../features/userSlice";
import { getSingleDump } from "../../features/dumpSlice";
import { Link } from "react-router-dom";
import { redirect, useNavigate } from "react-router-dom";
import MuiAlert from "@mui/material/Alert";

import Snackbar from "@mui/material/Snackbar";
import "./login.css";

const Login = () => {
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
    email: "",
    password: "",
  });

  const handleInput = async (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setInput({ ...input, [name]: value });
    // console.log(input);
  };

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const loginHandler = (input) => {
    // dispatch(deleteDump({ id: slug }));
    dispatch(login({ input }));
    handleClick();
  };

  return (
    <div className="login-form">
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
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <div className="input-btn">
        {/* <button onClick={() => dispatch(login({ input }))}>Login</button> */}
        <button onClick={() => loginHandler(input)}>Login</button>
      </div>
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        message="Note archived"
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          User Logged In Successfully
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Login;

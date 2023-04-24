import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="item1">
        {" "}
        <Link to="/">Pastify</Link>
      </div>
      <div className="item2">
        {" "}
        <Link to="register">Sign Up</Link>
      </div>
      <div className="item3">
        <Link to="login">Login</Link>
      </div>
    </div>
  );
};

export default Navbar;

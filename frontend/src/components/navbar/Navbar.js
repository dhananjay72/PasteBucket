import React, { useEffect } from "react";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/userSlice";

const Navbar = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const user = useSelector((state) => state.user.username);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    console.log("fsdf");
    // navigate("/tttt");
  };

  // useEffect(() => {});

  return (
    <div className="navbar">
      <div className="item1">
        <Link to="/">Pastify</Link>
      </div>
      {isAuthenticated && <div className="item-heading">Welcome {user}</div>}
      <div className="item2">
        {!isAuthenticated && <Link to="register">Sign Up</Link>}
        {isAuthenticated && <Link to="dashboard">Dashboard</Link>}
      </div>
      <div className="item3">
        <h1>{isAuthenticated}</h1>
        {isAuthenticated && (
          <Link to="login" onClick={logoutHandler}>
            Logout
          </Link>
        )}
        {!isAuthenticated && <Link to="login">Login</Link>}
        {/* <Link to="login">Login</Link> */}
      </div>
    </div>
  );
};

export default Navbar;

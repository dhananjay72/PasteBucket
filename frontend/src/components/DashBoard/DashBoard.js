import React from "react";
import "./dashboard.css";
import DumpForm from "../DumpForm/DumpForm";
import { useSelector, useDispatch } from "react-redux";

const DashBoard = () => {
  const user = useSelector((state) => state.user);

  return (
    <>
      <DumpForm></DumpForm>
      <h1>{user.username}</h1>
    </>
  );
};

export default DashBoard;

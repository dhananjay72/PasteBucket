import React from "react";
import "./dashboard.css";
import DumpForm from "../DumpForm/DumpForm";
import { useSelector, useDispatch } from "react-redux";
import DumpTable from "../DumpTable/DumpTable";
import { inc } from "../../features/userSlice";

const DashBoard = () => {
  const user = useSelector((state) => state.user.cnt);
  const dispatch = useDispatch();

  return (
    <>
      <DumpForm></DumpForm>
      <DumpTable></DumpTable>
      <h1>{user}</h1>
      <button onClick={() => dispatch(inc())}>Login</button>
    </>
  );
};

export default DashBoard;

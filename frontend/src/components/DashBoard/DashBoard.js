import React from "react";
import "./dashboard.css";
import DumpForm from "../DumpForm/DumpForm";
import { useSelector, useDispatch } from "react-redux";
import DumpTable from "../DumpTable/DumpTable";
import { inc, loaduser } from "../../features/userSlice";

const DashBoard = () => {
  const user = useSelector((state) => state.user.cnt);
  const dispatch = useDispatch();

  return (
    <>
      <DumpForm></DumpForm>
      <DumpTable></DumpTable>
    </>
  );
};

export default DashBoard;

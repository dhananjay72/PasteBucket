import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteDump } from "../../features/dumpSlice";
// import {  } from "../../features/userSlice";
import { postDump, loaduser } from "../../features/userSlice";
import { getSingleDump } from "../../features/dumpSlice";
import "./DumpForm.css";

const DumpForm = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  const User = useSelector((state) => state.user.username);

  useEffect(() => {
    if (!isAuthenticated && localStorage.getItem("jwToken")) {
      dispatch(loaduser());
    }
  });

  const [dumpInput, setDumpInput] = useState({
    title: "",
    description: "",
    date: "",
    access: "UNL",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setDumpInput({ ...dumpInput, [name]: value });
    // console.log(dumpInput);
  };

  return (
    <div className="dumpform-container">
      <div className="dumpform-heading">
        <h2>Create a new dump</h2>
      </div>
      <div className="inner-dumpform-container">
        <div>
          <label htmlFor="title">Title</label> <br />
          <input
            type="text"
            name="title"
            value={dumpInput.title}
            onChange={onChangeHandler}
          />
        </div>
        <div>
          <label htmlFor="title">Description</label> <br />
          <textarea
            type="text"
            rows="5"
            name="description"
            value={dumpInput.description}
            onChange={onChangeHandler}
          />
        </div>
        <div className="dumpform-flex-container">
          <div>
            <select
              name="access"
              id="access"
              value={dumpInput.access}
              onChange={onChangeHandler}
            >
              <option value="UNL">Unlisted</option>
              <option value="PVT">Private (only for logged-in users)</option>
            </select>
          </div>
          <div>
            <input
              type="date"
              name="date"
              id=""
              value={dumpInput.date}
              onChange={onChangeHandler}
            />
          </div>
        </div>
        <div className="dump-form-btn">
          <button onClick={() => dispatch(postDump({ dumpInput, User }))}>
            Post
          </button>
          <button onClick={() => dispatch(getSingleDump({ slug: "SOWi43" }))}>
            DD
          </button>
          {/* <button onClick={() => dispatch(deleteDump({ id: "bKFobi" }))}>
            Delete
          </button> */}
        </div>
      </div>
      <div className="fetch-dump">
        <input type="text" />
        <button>Fetch</button>
      </div>
    </div>
  );
};

export default DumpForm;

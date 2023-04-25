import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postDump, deleteDump } from "../../features/dumpSlice";
import "./DumpForm.css";

const DumpForm = () => {
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

  const dispatch = useDispatch();

  return (
    <div className="dumpform-container">
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
        <div>
          <button onClick={() => dispatch(postDump({ dumpInput }))}>
            Post
          </button>
          <button onClick={() => dispatch(deleteDump({ id: "bKFobi" }))}>
            Delete
          </button>
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

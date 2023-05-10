import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Paperclip } from "react-bootstrap-icons";
import { postDump, loaduser } from "../../features/userSlice";
import MuiAlert from "@mui/material/Alert";
import copy from "copy-to-clipboard";
import Snackbar from "@mui/material/Snackbar";
import "./DumpForm.css";
import { useNavigate } from "react-router-dom";

const DumpForm = () => {
  const [open, setOpen] = useState(false);
  const [openClip, setOpenClip] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    setOpenClip(false);
  };

  // MUI

  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const User = useSelector((state) => state.user.username);
  const size = useSelector((state) => state.user.postCreatedInSession);
  const dumps = useSelector((state) => state.user.dumps);

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
    url: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setDumpInput({ ...dumpInput, [name]: value });
  };
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const postDumpHandler = () => {
    dispatch(postDump({ dumpInput, User }));

    handleClick();
  };

  const copyButtonHandler = (link) => {
    copy(`http://localhost:3000/d/${dumpInput.url}`);
    setOpenClip(true);
  };

  const navigate = useNavigate();

  const fetchDumpHandler = (e) => {
    let url = dumpInput.url;
    const len = url.length;
    url = url.substring(len - 6);
    console.log(url);
    navigate(`/d/${url}`);
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
              {!isAuthenticated && (
                <option value="PVT" disabled="true">
                  Private (only for logged-in users)
                </option>
              )}
              {isAuthenticated && (
                <option value="PVT">Private (only for logged-in users)</option>
              )}
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
          <button onClick={postDumpHandler}>Post</button>
        </div>
        {size !== 0 && (
          <div className="posted-dump" onClick={copyButtonHandler}>
            <div className="posted-dump-item1">
              <Paperclip />
            </div>
            <div className="posted-dump-item2">
              {`http://localhost:3000/d/${dumps[dumps.length - 1].slug}`}
            </div>
          </div>
        )}
      </div>
      <div className="fetch-dump">
        <input
          type="text"
          name="url"
          value={dumpInput.url}
          onChange={onChangeHandler}
        />
        <button onClick={fetchDumpHandler}>Fetch</button>
      </div>
      <div>
        <Snackbar
          open={open}
          autoHideDuration={4000}
          onClose={handleClose}
          message="Note archived"
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Post Created Successfully
          </Alert>
        </Snackbar>
        <Snackbar
          open={openClip}
          autoHideDuration={3000}
          onClose={handleClose}
          message="Note archived"
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Copied to clipboard
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

export default DumpForm;

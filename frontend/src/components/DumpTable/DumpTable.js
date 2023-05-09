import React, { useState } from "react";
import "./DumpTable.css";
import { useSelector, useDispatch } from "react-redux";
import { TrashFill } from "react-bootstrap-icons";
import { redirect, useNavigate } from "react-router-dom";
import { getSingleDump } from "../../features/dumpSlice";
import { deleteDump } from "../../features/userSlice";
import MuiAlert from "@mui/material/Alert";

import Snackbar from "@mui/material/Snackbar";

const DumpTable = () => {
  const navigete = useNavigate();
  const dispatch = useDispatch();
  const dumps = useSelector((state) => state.user.dumps);
  const dumpValue = dumps.map((dump) => {
    const { title, text, slug, expiration_date } = dump;

    const expirationDate = new Date(expiration_date);
    const today = new Date();
    const timeDiff = expirationDate.getTime() - today.getTime();
    const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));

    return (
      <tr>
        <td className="title-column" onClick={() => navigete(`/d/${slug}`)}>
          {title.length > 15 ? title.substring(0, 15) + "..." : title}
        </td>
        <td width="40%" className="text-column">
          {text.length > 40 ? text.substring(0, 40) + "...." : text}
        </td>
        <td className="url-column">{slug}</td>
        <td className="date-column">{daysRemaining} days</td>
        <td className="delete-columns">
          <button
            // onClick={() => dispatch(deleteDump({ id: slug }))}
            onClick={() => postDumpHandler(slug)}
            className="delete-btn"
          >
            <TrashFill />
          </button>
        </td>
      </tr>
    );
  });

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

  const postDumpHandler = (slug) => {
    dispatch(deleteDump({ id: slug }));
    handleClick();
  };

  return (
    <div className="dumpTable">
      <table>
        <tr>
          <th className="table-heading">Title</th>
          <th className="table-heading">Description</th>
          <th className="table-heading">URL</th>
          <th className="table-heading">Expires In</th>
          <th className="table-heading">Delete</th>
        </tr>

        {dumpValue}
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
            Post Deleted Successfully
          </Alert>
        </Snackbar>
      </table>
    </div>
  );
};

export default DumpTable;

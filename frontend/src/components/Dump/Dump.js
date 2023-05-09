import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { formatDistance, subDays } from "date-fns";
import "./Dump.css";
import { Person, Clock, Lock, Unlock, Trash3 } from "react-bootstrap-icons";
import { useSelector, useDispatch } from "react-redux";
import { getSingleDump } from "../../features/dumpSlice";

const Dump = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    const url = window.location.href;
    console.log(url.split("d/")[1]);
    dispatch(getSingleDump({ slug: url.split("d/")[1] }));
    console.log(dump);
  }, []);

  const dump = useSelector((state) => state.dump.dump);
  console.log(dump);

  return (
    <div className="single-dump-container">
      <div className="single-dump-heading">
        <h2>{dump.title}</h2>
      </div>
      <div className="single-dump-info">
        <ul>
          <li>
            <Clock /> {dump.newCreatedAT}
          </li>
          <li>
            <Trash3 /> Expires {dump.newExpiryDate}
          </li>
          <li>
            <Person /> {dump.user}
          </li>
          <li>
            <Lock />
            {dump.access === "UNL" && "Public"}
            {dump.access !== "UNL" && "Private"}
          </li>
        </ul>
      </div>
      <div className="single-dump-text">{dump.text}</div>
    </div>
  );
};

export default Dump;

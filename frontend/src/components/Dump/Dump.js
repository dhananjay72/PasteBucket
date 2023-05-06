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
  }, []);

  const dump = useSelector((state) => state.dump.dump);

  return (
    <div className="single-dump-container">
      <div className="single-dump-heading">
        <h2>{dump.title}</h2>
      </div>
      <div className="single-dump-info">
        <ul>
          <li>
            <Clock />{" "}
            {formatDistance(new Date(dump.createdAt), new Date(), {
              addSuffix: true,
            })}
          </li>
          <li>
            <Trash3 /> Expires in
            {` ${
              formatDistance(new Date(), new Date(dump.createdAt), {
                addSuffix: true,
              }).split("about ")[1]
            }`}
          </li>
          <li>
            <Person /> {dump.user}
          </li>
          <li>
            <Lock /> Private
          </li>
        </ul>
      </div>
      <div className="single-dump-text">{dump.text}</div>
    </div>
  );
};

export default Dump;

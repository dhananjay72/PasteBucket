import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

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
  });

  return (
    <div className="single-dump-container">
      <div className="single-dump-heading">
        <h2>hello</h2>
      </div>
      <div className="single-dump-info"></div>
      <div className="single-dump-text">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam
        voluptates accusamus, atque tenetur facilis amet omnis? Dignissimos
        nostrum exercitationem rem officiis illo vel ut laboriosam quibusdam
        tempore voluptate dolore numquam, eaque asperiores iure nihil dolores
        corporis culpa laborum? Cumque enim necessitatibus mollitia asperiores
        doloremque nihil omnis. Voluptas iste illo molestias!
      </div>
    </div>
  );
};

export default Dump;

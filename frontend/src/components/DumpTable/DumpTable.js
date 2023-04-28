import React from "react";
import "./DumpTable.css";
import { useSelector, useDispatch } from "react-redux";

const DumpTable = () => {
  const dumps = useSelector((state) => state.user.dumps);
  const dumpValue = dumps.map((dump) => {
    const { title, text, slug, expiration_date } = dump;
    return (
      <tr>
        <td>{title.length > 6 ? title.substring(0, 6) : title.substring} </td>
        <td>{text.length > 20 ? text.substring(0, 20) : text.substring} </td>
        <td>{slug}</td>
        <td>{expiration_date}</td>
        <td>Delete</td>
      </tr>
    );
  });

  return (
    <div className="dumpTable">
      <table>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>URL</th>
          <th>Expires</th>
          <th>Delete</th>
        </tr>
        {/* <tr>
          <td>Alfreds </td>
          <td>Maria Anders fsdfsdf </td>
          <td>ascvdf</td>
          <td>Germany</td>
          <td>Del</td>
        </tr>
        <tr>
          <td>Alfreds </td>
          <td>Maria Anders fsdfsdf </td>
          <td>ascvdf</td>
          <td>Germany</td>
          <td>Del</td>
        </tr>
        <tr>
          <td>Alfreds </td>
          <td>Maria Anders fsdfsdf </td>
          <td>ascvdf</td>
          <td>Germany</td>
          <td>Del</td>
        </tr>
        <tr>
          <td>Alfreds </td>
          <td>Maria Anders fsdfsdf dsfdsf ds sd sdfdsf</td>
          <td>ascvdf</td>
          <td>Germany</td>
          <td>Del</td>
        </tr>
        <tr>
          <td>Alfreds </td>
          <td>Maria Anders fsdfsdf </td>
          <td>ascvdf</td>
          <td>Germany</td>
          <td>Del</td>
        </tr>
        <tr>
          <td>Alfreds </td>
          <td>Maria Anders fsdfsdf </td>
          <td>ascvdf</td>
          <td>Germany</td>
          <td>Del</td>
        </tr>
        <tr>
          <td>Alfreds </td>
          <td>Maria Anders fsdfsdf </td>
          <td>ascvdf</td>
          <td>Germany</td>
          <td>Del</td>
        </tr>
        <tr>
          <td>Alfreds </td>
          <td>Maria Anders fsdfsdf </td>
          <td>ascvdf</td>
          <td>Germany</td>
          <td>Del</td>
        </tr> */}
        {dumpValue}
      </table>
    </div>
  );
};

export default DumpTable;

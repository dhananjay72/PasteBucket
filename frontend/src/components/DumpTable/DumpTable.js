import React from "react";
import "./DumpTable.css";
import { useSelector, useDispatch } from "react-redux";
import { TrashFill } from "react-bootstrap-icons";

const DumpTable = () => {
  const dumps = useSelector((state) => state.user.dumps);
  const dumpValue = dumps.map((dump) => {
    const { title, text, slug, expiration_date } = dump;

    const expirationDate = new Date(expiration_date);
    const today = new Date();
    const timeDiff = expirationDate.getTime() - today.getTime();
    const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));

    return (
      <tr>
        <td className="title-column">
          {title.length > 15 ? title.substring(0, 15) + "..." : title}{" "}
        </td>
        <td width="40%" className="text-column">
          {text.length > 40 ? text.substring(0, 40) + "...." : text}
        </td>
        <td className="url-column">{slug}</td>
        <td className="date-column">{daysRemaining} days</td>
        <td className="delete-columns">
          <TrashFill />
        </td>
      </tr>
    );
  });

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

import React from "react";
import "./DumpTable.css";

const DumpTable = () => {
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
        <tr>
          <td>Alfreds </td>
          <td>Maria Anders</td>
          <td>Germany</td>
        </tr>
        <tr>
          <td>Centro </td>
          <td>Francisco </td>
          <td>Mexico</td>
        </tr>
        <tr>
          <td>Ernst </td>
          <td>Roland </td>
          <td>Austria</td>
        </tr>
        <tr>
          <td>Island </td>
          <td>Helen </td>
          <td>UK</td>
        </tr>
        <tr>
          <td>Laughing </td>
          <td>Yoshi Tannamuri</td>
          <td>Canada</td>
        </tr>
        <tr>
          <td>Magazzini </td>
          <td>Giovanni Rovelli</td>
          <td>Italy</td>
        </tr>
      </table>
    </div>
  );
};

export default DumpTable;

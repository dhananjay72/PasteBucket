import React from "react";
import "./DumpForm.css";

const DumpForm = () => {
  return (
    <div className="dumpform-container">
      <div className="inner-dumpform-container">
        <div>
          <label htmlFor="title">Title</label> <br />
          <input type="text" name="title" />
        </div>
        <div>
          <label htmlFor="title">Description</label> <br />
          <textarea type="text" name="title" rows="5" si />
        </div>
        <div className="dumpform-flex-container">
          <div>
            <select name="access" id="access">
              <option value="unlisted">Unlisted</option>
              <option value="private">
                Private (only for logged-in users){" "}
              </option>
            </select>
          </div>
          <div>
            <input type="date" name="" id="" />
          </div>
        </div>
        <div>
          <button>Post</button>
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

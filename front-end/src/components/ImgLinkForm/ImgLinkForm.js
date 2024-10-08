import React from "react";
import "tachyons";
import "./ImgLinkForm.css";

const ImgLinkForm = ({ onInputChange, onSubmit }) => {
  return (
    <div>
      <p className="f3">start detecting now</p>
      <div className="center">
        <div className="form center pa4 br3 shadow-5">
          <input
            className="f4 pa2 w-70 center"
            type="text"
            onChange={onInputChange}
          />
          <button
            className="w-30 grow f4 link ph3 pv2 dib white bg-light-blue"
            onClick={onSubmit}
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImgLinkForm;

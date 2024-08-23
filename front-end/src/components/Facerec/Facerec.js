import React from "react";
import "./Facerec.css";

const Facerec = ({ imageUrl, box }) => {
  return (
    <div className="center ma containers">
      <div className="absolute mt2 containers  ">
        <img
          id="inputimage"
          alt=""
          src={imageUrl}
          width="300px"
          height="300px"
        />
        <div
          className="bounding-box"
          style={{
            top: box.topRow,
            right: box.rightCol,
            bottom: box.bottomRow,
            left: box.leftCol,
          }}
        ></div>
      </div>
    </div>
  );
};

export default Facerec;

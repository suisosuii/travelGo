import React, { useEffect } from "react";
//img
import noImg from "../../img/home/no_image_square.jpg";

function Plans(props: { planList: string[]; media: boolean }) {
  console.log(props.planList);
  return (
    <div className="newPlan" style={{ display: "flex" }}>
      <img
        src={noImg}
        alt="NoImage"
        style={{
          width: props.media ? "20vw" : "32vw",
          height: props.media ? "17vw" : "30vw",
          marginLeft: props.media ? "26vw" : "12vw",
          marginTop: "3vh",
          marginBottom: "3vh",
          border: "solid 1px #000000",
        }}
      ></img>
      <div
        className="descrioption"
        style={{
          width: props.media ? "30vw" : "43vw",
          height: props.media ? "17vw" : "30vw",
          marginLeft: "0",
          marginTop: "3vh",
          marginBottom: "3vh",
          border: "solid 1px #000000",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span style={{ fontSize: "2rem" }}>新規作成</span>
      </div>
    </div>
  );
}

export default Plans;

import React, { useState } from "react";

import Serch from "./serch";

function Registration() {
  return (
    <div
      style={{
        height: "84vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <div
        className="soto"
        style={{
          width: "80vw",
          height: "70vh",
          border: "solid 3px",
          borderRadius: "25px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Serch />
      </div>
    </div>
  );
}

export default Registration;

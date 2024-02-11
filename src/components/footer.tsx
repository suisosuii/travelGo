import React from "react";

//png
import XLogo from "../img/footer/logo.svg";

function footer() {
  const buttonClick = () => {
    window.open("https://twitter.com/AAek8g6NM9T3emN", "_blank");
  };
  return (
    <footer
      className="footer"
      style={{
        backgroundColor: "#AADDAA",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <p style={{ fontSize: "1.0rem" }}>exsample@icloud.com</p>
      <div className="Xlogo"></div>
      <img
        src={XLogo}
        alt="X"
        style={{
          width: "40px",
          height: "40px",
        }}
        onClick={buttonClick}
      ></img>
    </footer>
  );
}

export default footer;

import React from "react";
import { Link } from "react-router-dom";
//png
import logo from "../img/header/logo.png";
import AcountMenue from "./header/acount";
import bar from "../img/header/bars_24.png";

const imgSize = 50;

function Header() {
  return (
    <header
      className="header"
      style={{
        backgroundColor: "orange",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div
        className="header-logo"
        style={{
          display: "flex",
          justifyItems: "flex-end",
        }}
      >
        <img
          src={logo}
          alt="Company Logo"
          style={{
            width: imgSize + "px",
            height: imgSize + "px",
            display: "inline-flex",
            marginLeft: "0",
          }}
        />
        <Link to="/">
          <p style={{ fontSize: "1rem", fontWeight: "bold" }}>Travel</p>
        </Link>
      </div>
      <div
        className="menu"
        style={{
          display: "flex",
        }}
      >
        <AcountMenue />
        <div
          className="humberger"
          style={{
            display: "flex",
          }}
        >
          <img
            src={bar}
            alt="bar"
            style={{
              width: imgSize + "px",
              height: imgSize + "px",
              display: "block",
            }}
          ></img>
        </div>
      </div>
    </header>
  );
}

export default Header;

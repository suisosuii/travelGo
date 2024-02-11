import React from "react";
import acount from "../../img/header/acount-def.png";
import { useState } from "react";
import { getAuth, signOut } from "firebase/auth";

import { useNavigate } from "react-router-dom";

import { useAuthContext } from "../../auth/authProvider";

function AcountImg() {
  const { user } = useAuthContext();
  const imgSize = 50;

  const handleSignOut = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      setShowDropdown(!showDropdown);
    } catch (e) {}
  };
  const navigate = useNavigate();

  const handleSignIn = async () => {
    navigate("/SignIn", { state: "SignIn" });
    setShowDropdown(!showDropdown);
  };

  const handleSignUp = async () => {
    navigate("/SignIn", { state: "SignUp" });
    setShowDropdown(!showDropdown);
  };

  const handleProfile = async () => {
    navigate("/Profile", { state: user?.uid });
    setShowDropdown(!showDropdown);
  };

  const [showDropdown, setShowDropdown] = useState(false);

  const handleImageClick = () => {
    setShowDropdown(!showDropdown);
  };
  return (
    <div>
      <img
        src={acount}
        onClick={handleImageClick}
        alt="acountImage"
        style={{
          width: imgSize + "px",
          height: imgSize + "px",
          display: "block",
        }}
      ></img>
      {showDropdown && (
        <ul
          style={{
            position: "absolute",
            top: "5vh",
            backgroundColor: "#f9f9f9", // 背景色を設定
            border: "1px solid #ccc", // ボーダーを設定
            borderRadius: "4px", // 角丸を設定
            padding: "10px", // 内側の余白を設定
            listStyle: "none",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {user ? (
            <>
              <li onClick={handleProfile}>Profile</li>
              <li onClick={handleSignOut}>Sign Out</li>
            </>
          ) : (
            <>
              <li onClick={handleSignIn}>Sign In</li>
              <li onClick={handleSignUp}>Sign UP</li>
            </>
          )}
        </ul>
      )}
    </div>
  );
}

export default AcountImg;

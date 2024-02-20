import React from "react";
import acount from "../../img/header/acount-def.png";
import { useState, useEffect } from "react";
import { useAuthContext } from "../../auth/authProvider";
import { db } from "../../firebase";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";

import ImgUp from "./ImgUp";

type User = {
  name: string;
  uid: string;
  plan: number;
  picURL: string;
};
function Profile() {
  const { user } = useAuthContext();
  const [userState, setUserState] = useState<User>();
  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userDocRef);
        <ImgUp />;
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          setUserState(docSnap.data() as User);
        } else {
          // docSnap.data() will be undefined in this case
          console.log("No such document!");
        }
      }
    };
    fetchUserData();
  }, [user]);
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
        className="profile"
        style={{
          width: "80vw",
          height: "60vh",
          border: "solid 3px",
          borderRadius: "25px",
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          alignItems: "center",
        }}
      >
        <span style={{ fontSize: "2rem" }}>Profile</span>
        <ImgUp />
        <form style={{ display: "flex", justifyContent: "center" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <input
              name="name"
              type="text"
              placeholder="名前を入力"
              value={userState?.name}
              style={{
                margin: "auto",
                display: "flex",
                width: "45vw",
                height: "6vh",
                fontSize: "1.5rem",
                border: "none",
                outline: "none",
                textAlign: "center",
                marginBottom: "5vh",
              }}
            />
          </div>
        </form>
        <div>ユーザーID</div>
        <div
          style={{
            display: "flex",
            height: "6vh",
            fontSize: "0.9rem",
            justifyContent: "center",
            alignItems: "center",
            border: "solid 2px",
            padding: "0 10px", // これを追加
          }}
        >
          {userState?.uid}
        </div>
        <div
          style={{
            marginTop: "3vh",
            display: "flex",
            height: "6vh",
            fontSize: "1.5rem",
            justifyContent: "center",
            alignItems: "center",
            padding: "0 10px", // これを追加
          }}
        >
          旅行予定数：{userState?.plan}
        </div>
      </div>
    </div>
  );
}

export default Profile;

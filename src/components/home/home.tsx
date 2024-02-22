import React from "react";
import { useMedia } from "react-use";
import { useState, useEffect } from "react";

import { useAuthContext } from "../../auth/authProvider";
import { db } from "../../firebase";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { Link } from "react-router-dom";

import Plans from "./Plans";
//img
import noImg from "../../img/home/no_image_square.jpg";

function Home() {
  const [username, setUserName] = useState<string>("");
  const [myPlans, setMyPlans] = useState([]);
  const { user } = useAuthContext();
  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          setUserName(docSnap.data().name);
          setMyPlans(docSnap.data().plans);
        } else {
          // docSnap.data() will be undefined in this case
          console.log("No such document!");
        }
      }
    };
    fetchUserData();
  }, [user]);

  const isWide = useMedia("(min-width: 800px)"); // useMediaの指定の仕方を修正
  return (
    <div className="createplan" style={{ height: "85vh" }}>
      <div className="message">
        {user ? `ようこそ${username}` : "ログインしてください"}
      </div>
      <div className="plan">{isWide ? "PC" : "スマホ"}</div>
      <div className="newPlan" style={{ display: "flex" }}>
        <img
          src={noImg}
          alt="NoImage"
          style={{
            width: isWide ? "20vw" : "32vw",
            height: isWide ? "17vw" : "30vw",
            marginLeft: isWide ? "26vw" : "12vw",
            marginTop: "5vh",
            marginBottom: "5vh",
            border: "solid 1px #000000",
          }}
        ></img>
        {user && <Plans planList={myPlans} />}
        <Link to="/Reg">
          <div
            className="descrioption"
            style={{
              width: isWide ? "30vw" : "43vw",
              height: isWide ? "17vw" : "30vw",
              marginLeft: "0",
              marginTop: "5vh",
              marginBottom: "5vh",
              border: "solid 1px #000000",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ fontSize: "2rem" }}>新規作成</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Home;

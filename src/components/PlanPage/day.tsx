import React, { useEffect, useState } from "react";
import Hour from "./HourPlan";

import { useLocation } from "react-router-dom";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import plus from "../../img/plan/plus.png";
type dayPlan = {
  expectedNum: number;
  expectedData: {
    picURL: string;
    loc: string;
    start: string;
    end: string;
    budget: number;
    descrip: string;
    album: number;
  }[];

  traffic: { budged: number }[];
};

function Day() {
  const location = useLocation();
  console.log(location.state);
  const locState = location.state;

  //dayの配列State
  const [dayPlans, setDayPlans] = useState<dayPlan[]>([]);
  const [days, setDays] = useState<number>(0);
  // const plansDocRef = doc(db, "plans", locState.pid);
  // const fetchUserData = async () => {
  //   const docSnap = await getDoc(plansDocRef);

  //   if (docSnap.exists()) {
  //     console.log("Document data:", docSnap.data());
  //     setDayPlans({})
  //   } else {
  //     // docSnap.data() will be undefined in this case
  //     console.log("No such document!");
  //   }
  // };
  // fetchUserData();
  useEffect(() => {
    if (locState.day === 0) {
      setDayPlans([
        {
          expectedNum: 1,
          expectedData: [
            {
              picURL: "",
              loc: "",
              start: "",
              end: "",
              budget: 0,
              descrip: "",
              album: 0,
            },
          ],
          traffic: [],
        },
      ]);
      setDays(1);
    } else {
    }
  }, [locState.day]);

  const handlePlus = () => {
    setDays(days + 1);
    setDayPlans((prevDayPlans) => [
      ...prevDayPlans,
      { expectedNum: 1, expectedData: [], traffic: [] },
    ]);
    console.log(dayPlans);
  };

  //dayボックスのスタイル
  const dayStyle = {
    display: "flex",
    height: "5vh",
    width: "70vw",
    justifyContent: "space-between",
    cursor: "pointer",
    border: "3px solid black",
    paddingRight: "5vw",
    paddingLeft: "5vw",
    marginTop: "3vh",
    fontSize: "1.5rem",
    alignItems: "center",
    lineHeight: "5vh",
  };

  const titleStyle = {
    display: "flex",
    justifyContent: "center",
    fontSize: "2rem",
    marginTop: "3vh",
  };

  return (
    <div
      style={{
        height: "84vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "auto",
        width: "100vw",
      }}
    >
      <div style={titleStyle}>{locState.title}</div>
      <Hour planData={dayPlans} day={days} />
      <div
        className="plusButton"
        style={{
          width: "50vw",
          height: "5vh",
          border: "solid 2px black",
          marginTop: "5vh",
          borderRadius: "2vh",
        }}
        onClick={() => handlePlus()}
      >
        <img
          src={plus}
          alt="plus"
          style={{ width: "5vh", height: "5vh" }}
        ></img>
      </div>
    </div>
  );
}

export default Day;

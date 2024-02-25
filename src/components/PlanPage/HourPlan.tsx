import React, { useContext, useEffect, useState } from "react";
import { DayPlanContext } from "./Day";

import { useScratch } from "react-use";

import Hide from "./Hide";

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

function HourPlan(props: { day: number }) {
  const { day } = props;

  const context = useContext(DayPlanContext);
  if (!context) {
    // Contextがundefinedの場合の処理をここに書く
    throw new Error("DayPlanContext is not provided");
  }
  const [dayPlans, setDayPlans] = context;

  const [showPlan, setShowPlan] = useState<boolean[]>([]);

  useEffect(() => {
    setShowPlan([]);
    for (let i: number = 0; i < day; i++) {
      setShowPlan((prevShowPlan) => [...prevShowPlan, false]);
    }
  }, [day]);

  const handleShowPlan = (i: number) => {
    setShowPlan((prevShowPlan) =>
      prevShowPlan.map((item, index) => (index === i ? !item : item))
    );
    console.log(showPlan);
  };

  //dayボックスのスタイル
  const dayStyle = {
    display: "flex",
    height: "5vh",
    width: "80vw",
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
  return (
    <div>
      {dayPlans.map((plan, index) => (
        <div style={{ width: "100%" }}>
          <div onClick={() => handleShowPlan(index)}>
            <div style={dayStyle}>
              {`DAY${index + 1}`}
              <span>{showPlan[index] ? "∧" : "∨"}</span>
            </div>
          </div>
          {showPlan[index] && <Hide aryNum={index} />}
        </div>
      ))}
    </div>
  );
}

export default HourPlan;

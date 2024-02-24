import React, { useEffect, useState } from "react";
import { useScratch } from "react-use";

type dayPlan = {
  expectedNum: number;
  expectedData: {
    loc: string;
    time: string;
    budget: number;
    descrip: string;
    album: number;
  }[];

  traffic: { budged: number }[];
};

function HourPlan(props: { planData: dayPlan[]; day: number }) {
  const { planData, day } = props;
  const [daysPlan, setDaysPlan] = useState();

  const [showPlan, setShowPlan] = useState<boolean[]>([]);

  const handleShowPlan = (i: number) => {
    setShowPlan((prevShowPlan) =>
      prevShowPlan.map((item, index) => (index === i ? !item : item))
    );
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
  return (
    <div>
      {planData.map((plan, index) => (
        <div onClick={() => handleShowPlan(index)}>
          <div style={dayStyle}>
            {`DAY${index + 1}`}
            <span>∨</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default HourPlan;

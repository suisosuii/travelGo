import React, { useContext, useEffect, useState } from "react";
import { DayPlanContext } from "./Day";

import Hide from "./Hide";

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
  const dayStyle: React.CSSProperties = {
    display: "flex",
    height: "5vh",
    width: "90vw",
    justifyContent: "space-between",
    cursor: "pointer",
    border: "3px solid black",
    paddingRight: "5vw",
    paddingLeft: "5vw",
    marginTop: "3vh",
    fontSize: "1.5rem",
    alignItems: "center",
    lineHeight: "5vh",
    boxSizing: "border-box",
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center", // 水平方向の配置を制御
        flexDirection: "column",
      }}
    >
      {dayPlans.map((plan, index) => (
        <div
          style={{
            width: "80vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center", // 水平方向の配置を制御
            flexDirection: "column",
          }}
        >
          <div
            onClick={() => handleShowPlan(index)}
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
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

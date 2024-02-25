import React, { useContext, useEffect, useState } from "react";
import { DayPlanContext } from "./day";

function PlanDes(props: { aryNum: number; subNum: number }) {
  const { aryNum, subNum } = props;
  const context = useContext(DayPlanContext);
  if (!context) {
    // Contextがundefinedの場合の処理をここに書く
    throw new Error("DayPlanContext is not provided");
  }
  const [dayPlans, setDayPlans] = context;

  const budStyle: React.CSSProperties = {
    display: "flex",
    width: "40%",
    height: "5vh",
    fontSize: "1rem",
    boxSizing: "border-box",
    border: "2px solid",
    marginRight: "1vw",
  };

  const DesStyle: React.CSSProperties = {
    display: "flex",
    width: "80vw",
    height: "18vh",
    fontSize: "1rem",
    boxSizing: "border-box",
    border: "2px solid",
  };
  return (
    <div
      style={{
        width: "100%",
        height: "auto",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center", // この行を追加
        boxSizing: "border-box",
      }}
    >
      <div
        className="description"
        style={{
          width: "90vw",
          height: "23vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#e6ffe6",
          boxSizing: "border-box",
          border: "solid 3px black",
        }}
      >
        <input
          name="des"
          type="text"
          value={dayPlans[aryNum].expectedData[subNum].descrip}
          placeholder="予定"
          style={DesStyle}
          onChange={(e) => {
            const newDayPlans = [...dayPlans]; // dayPlans配列をコピー
            newDayPlans[aryNum].expectedData[subNum].descrip = e.target.value;
            setDayPlans(newDayPlans); // 更新した配列を設定
          }}
        />
      </div>
      <div
        style={{
          width: "90vw",
          height: "7vh",
          display: "flex",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            width: "50%",
            height: "7vh",
            display: "flex",
            borderRight: "solid 3px black",
            borderLeft: "solid 3px black",
            borderBottom: "solid 3px black",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          予算：
          <input
            name="budged"
            type="text"
            inputMode="numeric"
            placeholder="50000"
            value={dayPlans[aryNum].expectedData[subNum].budget}
            style={budStyle}
            onKeyDown={(e) => {
              // 入力値が数値でない場合、その入力を無視
              if (!/[0-9]/.test(e.key) && e.key !== "Backspace") {
                e.preventDefault();
              }
            }}
            onChange={(e) => {
              // 入力値が数値であることを確認
              // ただし、入力が空である場合も許容
              if (e.target.value === "" || !isNaN(Number(e.target.value))) {
                const newDayPlans = [...dayPlans]; // dayPlans配列をコピー
                newDayPlans[aryNum].expectedData[subNum].budget =
                  e.target.value === "" ? 0 : Number(e.target.value); // budgetを更新
                setDayPlans(newDayPlans); // 更新した配列を設定
              }
            }}
          />
          円
        </div>
        <div
          style={{
            width: "50%",
            height: "7vh",
            display: "flex",
            borderRight: "solid 3px black",
            justifyContent: "center",
            alignItems: "center",
            borderBottom: "solid 3px black",
          }}
        >
          <div>アルバム</div>
        </div>
      </div>
    </div>
  );
}

export default PlanDes;

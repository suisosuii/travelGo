import React, { useContext, useEffect, useRef, useState } from "react";
import { DayPlanContext } from "./Day";

import PlanDes from "./PlanDes";
import plus from "../../img/plan/ExPlus.png";

type dayPlan = {
  expectedNum: number;
  expectedData: {
    picURL: string;
    loc: string;
    start: string;
    end: string;
    budget: number;
    descrip: string;
    album: string[];
  }[];

  traffic: { budged: number }[];
};
function Hide(props: { aryNum: number }) {
  const { aryNum } = props;

  const context = useContext(DayPlanContext);
  if (!context) {
    // Contextがundefinedの場合の処理をここに書く
    throw new Error("DayPlanContext is not provided");
  }
  const [dayPlans, setDayPlans] = context;

  const [showDropdown, setShowDropdown] = useState<boolean[]>([]);

  useEffect(() => {
    setShowDropdown([]);
    for (let i: number = 0; i < dayPlans[aryNum].expectedNum; i++) {
      setShowDropdown((prevShowPlan) => [...prevShowPlan, false]);
    }
  }, [dayPlans[aryNum].expectedNum]);

  const timeStyle: React.CSSProperties = {
    display: "flex",
    width: "13vw",
    height: "5vh",
    fontSize: "1rem",
    boxSizing: "border-box",
    border: "2px solid",
  };

  const locStyle: React.CSSProperties = {
    display: "flex",
    width: "40vw",
    height: "5vh",
    fontSize: "1rem",
    boxSizing: "border-box",
    border: "2px solid",
  };
  const traStyle: React.CSSProperties = {
    display: "flex",
    width: "18vw",
    height: "7vh",
    fontSize: "1.3rem",
    boxSizing: "border-box",
    border: "2px solid",
  };

  const handleShowDropdown = (i: number) => {
    setShowDropdown((prevShowPlan) =>
      prevShowPlan.map((item, index) => (index === i ? !item : item))
    );
  };

  const handlePlus = () => {
    setDayPlans((prevPlanSta) => {
      return prevPlanSta.map((topData, index) => {
        if (index === aryNum) {
          return {
            ...topData,
            expectedNum: topData.expectedNum + 1,
            expectedData: [
              ...topData.expectedData,
              {
                picURL: "",
                loc: "",
                start: "",
                end: "",
                budget: 0,
                descrip: "",
                album: [],
              },
            ],
            traffic: [...topData.traffic, { budged: 0 }],
          };
        } else {
          return topData;
        }
      });
    });
  };

  return (
    <div
      style={{
        width: "90vw",
        height: "auto",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
      }}
    >
      {dayPlans[aryNum].expectedData.map((data, num) => (
        <div key={num}>
          {num !== 0 && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                width: "90vw",
                borderRight: "solid 3px",
                borderLeft: "solid 3px",
                boxSizing: "border-box",
              }}
            >
              <div
                className="dashed"
                style={{
                  height: "15vh",
                  width: "30vw",
                  borderRight: "dashed 5px",
                }}
              ></div>
              <input
                type="text"
                inputMode="numeric"
                placeholder="500"
                value={dayPlans[aryNum].traffic[num - 1].budged}
                style={traStyle}
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
                    newDayPlans[aryNum].traffic[num - 1].budged =
                      e.target.value === "" ? 0 : Number(e.target.value); // budgetを更新
                    setDayPlans(newDayPlans); // 更新した配列を設定
                  }
                }}
              />
              円
            </div>
          )}
          <div
            style={{
              width: "100%",
              height: "7vh",
              border: "solid 3px black",
              display: "flex",
              backgroundColor: "#e6ffe6",
              boxSizing: "border-box",
              alignItems: "center",
              padding: "2vw",
              justifyContent: "space-between",
            }}
          >
            <div className="time" style={{ display: "flex" }}>
              <input
                name="start"
                type="text"
                value={data.start}
                placeholder="開始"
                style={timeStyle}
                onChange={(e) => {
                  const newDayPlans = [...dayPlans]; // dayPlans配列をコピー
                  newDayPlans[aryNum].expectedData[num].start = e.target.value;
                  setDayPlans(newDayPlans); // 更新した配列を設定
                }}
              />
              ～
              <input
                name="end"
                type="text"
                value={data.end}
                placeholder="終了"
                style={timeStyle}
                onChange={(e) => {
                  const newDayPlans = [...dayPlans]; // dayPlans配列をコピー
                  newDayPlans[aryNum].expectedData[num].end = e.target.value;
                  setDayPlans(newDayPlans); // 更新した配列を設定
                }}
              />
            </div>
            <input
              name="loc"
              type="text"
              value={data.loc}
              placeholder="場所"
              style={locStyle}
              onChange={(e) => {
                const newDayPlans = [...dayPlans]; // dayPlans配列をコピー
                newDayPlans[aryNum].expectedData[num].loc = e.target.value;
                setDayPlans(newDayPlans); // 更新した配列を設定
              }}
            />
            <div onClick={() => handleShowDropdown(num)}>
              {showDropdown[num] ? "∧" : "∨"}
            </div>
          </div>
          {showDropdown[num] && <PlanDes aryNum={aryNum} subNum={num} />}
        </div>
      ))}
      <div onClick={() => handlePlus()}>
        <img
          src={plus}
          alt="plus"
          style={{ width: "5vh", height: "5vh" }}
        ></img>
      </div>
    </div>
  );
}

export default Hide;

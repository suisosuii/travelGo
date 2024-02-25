import React, { useEffect, useState } from "react";

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
    album: number;
  }[];

  traffic: { budged: number }[];
};
function Hide(props: { plan: dayPlan }) {
  const { plan } = props;

  const [planSta, setPlanSta] = useState<dayPlan>();

  const [start, setStart] = useState<string[]>([]);
  const [end, setEnd] = useState<string[]>([]);
  const [loc, setLoc] = useState<string[]>([]);
  const [budged, setBudged] = useState<number[]>([]);
  const [descrip, setDeicrip] = useState<string[]>([]);
  const [album, setAlubum] = useState<number[]>([]);
  const [traffic, setTraffic] = useState<number[]>([]);
  const [showDropdown, setShowDropdown] = useState<boolean[]>([]);

  const [exNum, setExNum] = useState<number>(0);

  useEffect(() => {
    setExNum(plan.expectedNum);
    setPlanSta(plan);
  }, [plan]);

  useEffect(() => {
    setShowDropdown([]);
    for (let i: number = 0; i < exNum; i++) {
      setShowDropdown((prevShowPlan) => [...prevShowPlan, false]);
    }
  }, [exNum]);

  useEffect(() => {
    setPlanSta((prevPlanSta) => {
      if (!prevPlanSta) {
        // Handle the case where prevPlanSta is undefined
        return;
      }
      return {
        ...prevPlanSta,
        expectedNum: exNum,
        expectedData: prevPlanSta.expectedData.map((data, index) => ({
          ...data,
          start: start[index] || data.start,
          end: end[index] || data.end,
          loc: loc[index] || data.loc,
          budget: budged[index] || data.budget,
          descrip: descrip[index] || data.descrip,
          album: album[index] || data.album,
        })),
        traffic: prevPlanSta.traffic.map((data, index) => ({
          budged: traffic[index] || data.budged,
        })),
      };
    });
    console.log(planSta);
  }, [start, end, loc, budged, descrip, album, traffic]);

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
    setExNum(exNum + 1);
    setPlanSta((prevPlanSta) => {
      if (!prevPlanSta) {
        // Handle the case where prevPlanSta is undefined
        return;
      }
      return {
        ...prevPlanSta,
        expectedNum: exNum,
        expectedData: [
          ...prevPlanSta.expectedData,
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
        traffic: [...prevPlanSta.traffic, { budged: 0 }],
      };
    });
    console.log(planSta);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {planSta &&
        planSta.expectedData.map((data, num) => (
          <div key={num}>
            {num !== 0 && (
              <div style={{ display: "flex", alignItems: "center" }}>
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
                  value={traffic[num - 1]}
                  style={traStyle}
                  onKeyPress={(e) => {
                    // 入力値が数値でない場合、その入力を無視
                    if (!/[0-9]/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  onChange={(e) => {
                    // 入力値が数値であることを確認
                    if (!isNaN(Number(e.target.value))) {
                      const newTraffic = [...traffic]; // start配列をコピー
                      newTraffic[num - 1] = Number(e.target.value); // num番目の値を更新
                      setTraffic(newTraffic); // 更新した配列を設定
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
                  value={start[num]}
                  placeholder="開始"
                  style={timeStyle}
                  onChange={(e) => {
                    const newStart = [...start]; // start配列をコピー
                    newStart[num] = e.target.value; // num番目の値を更新
                    setStart(newStart); // 更新した配列を設定
                  }}
                />
                ～
                <input
                  name="end"
                  type="text"
                  value={end[num]}
                  placeholder="終了"
                  style={timeStyle}
                  onChange={(e) => {
                    const newEnd = [...end]; // start配列をコピー
                    newEnd[num] = e.target.value; // num番目の値を更新
                    setEnd(newEnd); // 更新した配列を設定
                  }}
                />
              </div>
              <input
                name="loc"
                type="text"
                value={loc[num]}
                placeholder="場所"
                style={locStyle}
                onChange={(e) => {
                  const newLoc = [...loc]; // start配列をコピー
                  newLoc[num] = e.target.value; // num番目の値を更新
                  setLoc(newLoc); // 更新した配列を設定
                }}
              />
              <div onClick={() => handleShowDropdown(num)}>
                {showDropdown[num] ? "∧" : "∨"}
              </div>
            </div>
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

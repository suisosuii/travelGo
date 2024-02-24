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

  const [start, setStart] = useState<string>();
  const [end, setEnd] = useState<string>();
  const [loc, setLoc] = useState<string>();
  const [budged, setBudged] = useState<number>();
  const [descrip, setDeicrip] = useState<string>();
  const [album, setAlubum] = useState<number>();
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
        traffic: [{ budged: 0 }],
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
                <input placeholder="交通費" style={locStyle} />
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
                  value={start}
                  placeholder="開始"
                  style={timeStyle}
                  onChange={(e) => setStart(e.target.value)}
                />
                ～
                <input
                  name="end"
                  type="text"
                  value={end}
                  placeholder="終了"
                  style={timeStyle}
                  onChange={(e) => setEnd(e.target.value)}
                />
              </div>
              <input
                name="loc"
                type="text"
                value={loc}
                placeholder="場所"
                style={locStyle}
                onChange={(e) => setLoc(e.target.value)}
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

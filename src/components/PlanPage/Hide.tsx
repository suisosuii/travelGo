import React, { useEffect, useState } from "react";

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

  const [start, setStart] = useState<string>();
  const [end, setEnd] = useState<string>();
  const [loc, setLoc] = useState<string>();
  const [budged, setBudged] = useState<number>();
  const [descrip, setDeicrip] = useState<string>();
  const [album, setAlubum] = useState<number>();
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

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

  useEffect(() => {
    console.log("HIDE OPEN");
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {plan.expectedData.map((data, num) => (
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
          <div>∨</div>
        </div>
      ))}
    </div>
  );
}

export default Hide;

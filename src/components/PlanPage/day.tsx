import React, { useEffect, useState, createContext } from "react";
import Hour from "./HourPlan";

import { useAuthContext } from "../../auth/authProvider";
import Updata from "./Updata";
import { useLocation, useNavigate } from "react-router-dom";
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
    album: string[];
  }[];

  traffic: { budged: number }[];
};

// 新しいContextを作成します
export const DayPlanContext = createContext<
  [dayPlan[], React.Dispatch<React.SetStateAction<dayPlan[]>>] | undefined
>(undefined);

function Day() {
  const location = useLocation();
  const locState = location.state;

  const { user } = useAuthContext();
  const navigator = useNavigate();
  //サインインリダイレクト
  useEffect(() => {
    if (!user) {
      navigator("/SignIn", { state: "SignIn" });
    }
  }, [user]);

  //dayの配列State
  const [dayPlans, setDayPlans] = useState<dayPlan[]>([]);
  const [days, setDays] = useState<number>(0);

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
              album: [],
            },
          ],
          traffic: [],
        },
      ]);
      setDays(1);
    } else {
      const fetchPlanData = async () => {
        const planDocRef = doc(db, "plans", locState.pid);
        const docSnap = await getDoc(planDocRef);

        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          const data = docSnap.data();
          setDayPlans(data.planInfo);
          setDays(data.day);
        } else {
          // docSnap.data() will be undefined in this case
          console.log("No such document!");
        }
      };
      fetchPlanData();
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

  let totalBudget = dayPlans.reduce((total, dayPlan) => {
    let expectedDataBudget = dayPlan.expectedData.reduce(
      (total, data) => total + data.budget,
      0
    );
    let trafficBudget = dayPlan.traffic.reduce(
      (total, traffic) => total + traffic.budged,
      0
    );
    return total + expectedDataBudget + trafficBudget;
  }, 0);

  return (
    // Context Providerを使用してdayPlans stateを提供します
    <DayPlanContext.Provider value={[dayPlans, setDayPlans]}>
      <div
        style={{
          height: "84vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        <div style={titleStyle}>{locState.title}</div>
        <Hour day={days} />
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
        <Updata pid={locState.pid} />
        <div style={{ fontSize: "1.3rem" }}>{"合計金額：" + totalBudget}</div>
      </div>
    </DayPlanContext.Provider>
  );
}

export default Day;

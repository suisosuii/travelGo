import React, { useContext } from "react";
import { DayPlanContext } from "./day";
import { useNavigate } from "react-router-dom";

import {
  doc,
  addDoc,
  collection,
  setDoc,
  updateDoc,
  arrayUnion,
  increment,
  getDoc,
  arrayRemove,
} from "firebase/firestore";
import { db } from "../../firebase";

function Updata(props: { pid: string }) {
  const navigate = useNavigate();
  const { pid } = props;
  const context = useContext(DayPlanContext);
  if (!context) {
    // Contextがundefinedの場合の処理をここに書く
    throw new Error("DayPlanContext is not provided");
  }
  const [dayPlans, setDayPlans] = context;

  const handleSend = async () => {
    //送信オブジェクト
    const planRef = doc(db, "plans", pid);
    //送信
    try {
      await updateDoc(planRef, { planInfo: dayPlans, day: dayPlans.length });
      console.log("送信成功");
      navigate("/");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <button
      onClick={() => handleSend()}
      style={{
        marginTop: "7vh",
        width: "50vw",
        height: "8vh",
        fontSize: "1.5rem",
      }}
    >
      更新
    </button>
  );
}

export default Updata;

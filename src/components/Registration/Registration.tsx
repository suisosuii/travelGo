import React, { useEffect, useState } from "react";

import { useAuthContext } from "../../auth/authProvider";

import Search from "./Search";
import { useLocation, useNavigate } from "react-router-dom";
import {
  DocumentSnapshot,
  collection,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "../../firebase";

type PlanInfo = {
  id: string;
  owner: string;
  title: string;
  users: { name: string; uid: string }[];
  day: number;
};

function Registration() {
  const { user } = useAuthContext();
  const location = useLocation();
  console.log(location.state);
  const selectPlanId = location.state || { id: null };

  const [planData, setPlanData] = useState<PlanInfo | null>();

  const navigator = useNavigate();
  //サインインリダイレクト
  useEffect(() => {
    if (!user) {
      navigator("/SignIn", { state: "SignIn" });
    }
  }, [user]);

  useEffect(() => {
    if (selectPlanId.id) {
      const fetchPlanData = async () => {
        if (user) {
          const planDocRef = doc(db, "plans", selectPlanId.id);
          const docSnap = await getDoc(planDocRef);

          if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            const data = docSnap.data();
            setPlanData({
              id: data.id,
              owner: data.owner,
              title: data.title,
              users: data.users,
              day: data.day,
            });
          } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
          }
        }
      };
      fetchPlanData();
    }
  }, []);
  return (
    <div
      style={{
        height: "84vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <div
        className="soto"
        style={{
          width: "80vw",
          height: "70vh",
          border: "solid 3px",
          borderRadius: "25px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {planData ? <Search planData={planData} /> : <Search planData={null} />}
      </div>
    </div>
  );
}

export default Registration;

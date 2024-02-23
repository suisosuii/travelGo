import React, { useEffect, useRef, useState } from "react";
import { UseIsWide } from "../mediaProvider";

import { db } from "../../firebase";
import { Link } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
//img
import noImg from "../../img/home/no_image_square.jpg";

type PlansArray = {
  title: string;
  pid: string;
};

function Plans(props: { planList: string[] }) {
  const { planList } = props;
  const [myPlan, setMyPlans] = useState<PlansArray[]>([]);
  const prevPlanListRef = useRef<string[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (
        planList &&
        planList.length > 0 &&
        JSON.stringify(planList) !== JSON.stringify(prevPlanListRef.current)
      ) {
        setMyPlans([]);
        const q = query(collection(db, "plans"), where("id", "in", planList));
        const querySnapshot = await getDocs(q);
        console.log("データ読み取り");
        if (querySnapshot) {
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            setMyPlans((prevPlans) => [
              ...prevPlans,
              { title: doc.data().title, pid: doc.data().id },
            ]);
          });
        } else {
          // docSnap.data() will be undefined in this case
          console.log("No such document!");
        }
      }
    };
    fetchUserData();
  }, [planList]);
  const isWide = UseIsWide();
  return (
    <div
      className="newPlan"
      style={{ display: "flex", flexDirection: "column" }}
    >
      {myPlan.map(({ title, pid }, index) => (
        <div key={index} style={{ display: "flex" }}>
          <img
            src={noImg}
            alt="NoImage"
            style={{
              width: isWide ? "20vw" : "32vw",
              height: isWide ? "17vw" : "30vw",
              marginLeft: isWide ? "26vw" : "12vw",
              marginTop: "3vh",
              marginBottom: "3vh",
              border: "solid 1px #000000",
            }}
          ></img>
          <div
            className="descrioption"
            style={{
              width: isWide ? "30vw" : "43vw",
              height: isWide ? "17vw" : "30vw",
              marginLeft: "0",
              marginTop: "3vh",
              marginBottom: "3vh",
              border: "solid 1px #000000",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Link to="/Reg" state={{ id: pid }}>
              <span style={{ fontSize: "2rem", cursor: "pointer" }}>
                {title}
              </span>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Plans;

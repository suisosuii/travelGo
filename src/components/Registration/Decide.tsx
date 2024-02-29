import React, { useEffect, useState } from "react";
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
import { useAuthContext } from "../../auth/authProvider";

type UserPro = {
  name: string;
  uid: string;
};

type PlanIdProps = {
  pid: string | null;
};

function Decide(props: {
  usersInfo: UserPro[];
  titleText: string;
  planId: PlanIdProps;
  oldUsers: UserPro[] | null;
  days: number;
}) {
  //認証情報
  const { user } = useAuthContext();

  //遷移用
  const navigate = useNavigate();

  //props関連
  const { usersInfo, titleText, planId, oldUsers, days } = props;
  const [usersPro, setUsersPro] = useState<UserPro[]>([]);
  const [text, setText] = useState<string>("");
  const [alPlanId, setAlPlanId] = useState<string>();
  const [oldUsersPro, setOldUsersPro] = useState<UserPro[]>([]);
  const [dayNum, setDayNum] = useState<number>();
  useEffect(() => {
    setUsersPro(usersInfo);
    setText(titleText);
    planId.pid && setAlPlanId(planId.pid);
    oldUsers && setOldUsersPro(oldUsers);
    setDayNum(days);
  }, [usersInfo, titleText, planId, oldUsers, days]);

  //送信関数
  const handleSend = async () => {
    if (user) {
      console.log("day=" + dayNum);
      //送信オブジェクト
      const data = {
        title: text,
        users: usersPro.map((user) => ({ name: user.name, uid: user.uid })),
        owner: user?.uid,
        day: dayNum,
      };
      const profileRef = doc(db, "users", user.uid);
      const newPlansRef = doc(collection(db, "plans"));
      //送信
      try {
        if (!alPlanId) {
          await setDoc(newPlansRef, { ...data, id: newPlansRef.id });
          setAlPlanId(newPlansRef.id);
          await updateDoc(profileRef, {
            plans: arrayUnion(newPlansRef.id),
            plan: increment(1),
          });
          usersPro.map(async (us) => {
            const friendProfileRef = doc(db, "users", us.uid);
            await updateDoc(friendProfileRef, {
              plans: arrayUnion(newPlansRef.id),
              plan: increment(1),
            });
          });
        } else {
          const alPlansRef = doc(db, "plans", alPlanId);
          await updateDoc(alPlansRef, { ...data });
          if (oldUsers) {
            oldUsersPro.map(async (user) => {
              if (!usersPro.some((us) => us.uid === user.uid)) {
                // usersProのすべての要素のuidにuser.uidが含まれていない場合の処理
                const nonProfileRef = doc(db, "users", user.uid);
                await updateDoc(nonProfileRef, {
                  plan: increment(-1),
                  plans: arrayRemove(alPlanId),
                });
              }
            });
          }
          //各ユーザープロフィールにプラン追加
          usersPro.map(async (us) => {
            const friendProfileRef = doc(db, "users", us.uid);
            // まず、friendProfileRef からドキュメントを取得する
            const friendProfileDoc = await getDoc(friendProfileRef);

            // friendProfileDoc から plans フィールドの値を取得する
            const currentPlans = friendProfileDoc.data()?.plans || [];
            if (!currentPlans.includes(alPlanId)) {
              // alPlanId が plans フィールドに含まれていない場合、updateDoc を実行する
              await updateDoc(friendProfileRef, {
                plans: arrayUnion(alPlanId),
                plan: increment(1),
              });
            } else {
              // alPlanId がすでに plans フィールドに含まれている場合、何もしない
              console.log("alPlanId is already included in plans field.");
            }
          });
        }
        navigate("/Plan", {
          state: { pid: alPlanId, title: data.title, day: dayNum },
        });
        console.log("送信成功");
      } catch (e) {
        console.error("Error adding document: ", e);
      }
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
      {alPlanId ? "更新or計画へ" : "予定作成"}
    </button>
  );
}

export default Decide;

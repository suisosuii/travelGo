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
} from "firebase/firestore";
import { db } from "../../firebase";
import { useAuthContext } from "../../auth/authProvider";

type UserPro = {
  name: string;
  uid: string;
};
function Decide(props: { usersInfo: UserPro[]; titleText: string }) {
  //認証情報
  const { user } = useAuthContext();

  //遷移用
  const navigate = useNavigate();

  //props関連
  const { usersInfo, titleText } = props;
  const [usersPro, setUsersPro] = useState<UserPro[]>([]);
  const [text, setText] = useState<string>("");
  useEffect(() => {
    setUsersPro(usersInfo);
    setText(titleText);
  }, [usersInfo, titleText]);

  //送信関数
  const handleSend = async () => {
    if (user) {
      console.log("click");
      //送信オブジェクト
      const data = {
        title: text,
        users: usersPro.map((user) => ({ name: user.name, uid: user.uid })),
        owner: user?.uid,
      };
      const profileRef = doc(db, "users", user.uid);
      const newPlansRef = doc(collection(db, "plans"));

      //送信
      try {
        await setDoc(newPlansRef, { ...data, id: newPlansRef.id });
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
        navigate("/Plan");
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
        width: "40vw",
        height: "8vh",
        fontSize: "1.5rem",
      }}
    >
      予定作成
    </button>
  );
}

export default Decide;

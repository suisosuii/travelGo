import { User } from "firebase/auth";
import React from "react";
import { useState, useEffect } from "react";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";
import { useAuthContext } from "../../auth/authProvider";
import acount from "../../img/header/acount-def.png";

type UserPro = {
  name: string;
  uid: string;
};

function ScrollBox(props: {
  usersInfo: any;
  childFunc(UserPro: UserPro[]): void;
}) {
  //認証情報
  const { user } = useAuthContext();
  const storage = getStorage();
  const { usersInfo } = props;
  const [usersPro, setUsersPro] = useState<UserPro[]>([]);
  const [userImages, setUserImages] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    usersInfo.forEach(async (userInfo: UserPro) => {
      if (!userImages[userInfo.uid]) {
        const url = await fetchUserData(userInfo.uid);
        setUserImages((prevState) => ({ ...prevState, [userInfo.uid]: url }));
      }
    });
  }, [usersInfo]);

  useEffect(() => {
    setUsersPro(usersInfo);
  }, [usersInfo]);

  const handleDel = (index: number) => {
    props.childFunc && props.childFunc(usersPro.filter((_, i) => i !== index));
  };

  const fetchUserData = async (uid: string) => {
    const profilePicRef = ref(storage, "profile/" + uid);
    //画像取得
    try {
      const url = await getDownloadURL(profilePicRef);
      return url;
    } catch (error) {
      console.error("Error getting download URL:", error);
      return acount;
    }
  };
  const divStyle = {
    width: "65vw",
    height: "15vw",
    borderBottom: "3px solid",
    display: "flex", // 追加
    justifyContent: "space-between", // 追加
    alignItems: "center", // 追加
  };

  //取り消しstyle
  const cancelStyle = {
    width: "10vw",
    height: "4vh",
    border: "none",
    background: "red",
    borderRadius: "4px",
    color: "white",
    marginRight: "1vw",
  };
  return (
    <div
      style={{
        width: "65vw",
        height: "26vh",
        boxSizing: "border-box",
        border: "1px solid black",
        overflow: "auto",
      }}
    >
      {usersPro.map(({ name, uid }, index) => (
        <div style={{ ...divStyle, textAlign: "left" }} key={uid}>
          <div
            style={{
              display: "flex", // 追加
              alignItems: "center", // 追加
              fontSize: "1.3rem",
            }}
          >
            <img
              src={userImages[uid]}
              alt=""
              style={{
                width: "14vw",
                height: "14vw",
                borderRadius: "50%",
                marginRight: "3vw",
              }}
            />
            {name}
          </div>
          <div style={cancelStyle} onClick={() => handleDel(index)}>
            削除
          </div>
        </div>
      ))}
    </div>
  );
}

export default ScrollBox;

import { User } from "firebase/auth";
import React from "react";
import { useState, useEffect } from "react";

type UserPro = {
  name: string;
  uid: string;
  plan: number;
  picURL: string;
};

function ScrollBox(props: {
  usersInfo: any;
  childFunc(UserPro: UserPro[]): void;
}) {
  const { usersInfo } = props;
  const [usersPro, setUsersPro] = useState<UserPro[]>([]);
  useEffect(() => {
    setUsersPro(usersInfo);
  }, [usersInfo]);

  const handleDel = (index: number) => {
    props.childFunc && props.childFunc(usersPro.filter((_, i) => i !== index));
  };

  const divStyle = {
    width: "65vw",
    height: "5vh",
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
        height: "20vh",
        boxSizing: "border-box",
        border: "1px solid black",
        overflow: "auto",
      }}
    >
      {usersPro.map(({ name, uid }, index) => (
        <div style={{ ...divStyle, textAlign: "left" }} key={uid}>
          <div>ユーザー名：{name}</div>
          <div style={cancelStyle} onClick={() => handleDel(index)}>
            削除
          </div>
        </div>
      ))}
    </div>
  );
}

export default ScrollBox;

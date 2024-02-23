import React, { useEffect, useState, useRef } from "react";

import { useAuthContext } from "../../auth/authProvider";
import { db } from "../../firebase";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";

import SerchIcon from "../../img/Registration/検索アイコン.png";
import Scroll from "./ScrollBox";
import Dicide from "./Decide";

type UserPro = {
  name: string;
  uid: string;
};

type PlanInfo = {
  id: string;
  owner: string;
  title: string;
  users: { name: string; uid: string }[];
};

type SearchProps = {
  planData: PlanInfo | null;
};

function Search({ planData }: SearchProps) {
  //ref
  const ref = useRef<HTMLInputElement>(null);

  //認証情報
  const { user } = useAuthContext();

  //state
  const [hideTop, setHideTop] = useState<number>();
  const [hideLeft, setHideLeft] = useState<number>();
  const [text, setText] = useState<string>("");
  const [serchId, setSerchId] = useState<string>("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [serchUser, setSerchUser] = useState<UserPro | null>(null);
  const [usersPro, setUsersPro] = useState<UserPro[]>([]);

  //要素位置情報取得
  useEffect(() => {
    if (ref.current) {
      console.log(ref.current.clientTop);
      const clientTop = ref?.current.getBoundingClientRect().top;
      const clientLeft = ref?.current.getBoundingClientRect().left;
      planData && setUsersPro(planData.users);
      setHideTop(clientTop);
      setHideLeft(clientLeft);
    }
  }, [planData]);

  //DB読み込み処理
  const fetchUserData = async () => {
    if (user) {
      const userRef = doc(db, "users", serchId);
      const docSnap = await getDoc(userRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setSerchUser(docSnap.data() as UserPro);
      } else {
        // docSnap.data() will be undefined in this case
        setSerchUser(null);
        console.log("No such document!");
      }
    }
  };

  //子->親へのデータ受け渡し用関数
  const childDel = (childData: UserPro[]) => {
    setUsersPro(childData);
    console.log(childData);
  };

  //ユーザー追加ボタン
  const handleAdd = () => {
    const isDuplicate = usersPro?.some((user) => user.uid === serchUser?.uid);
    if (isDuplicate) {
      // 重複した場合の処理をここに書く
      console.log("User already exists in the array.");
    } else {
      serchUser && setUsersPro([...usersPro, serchUser]);
    }
    setShowDropdown(!showDropdown);
  };

  //エンターキー検出
  const onKeydown = (key: string) => {
    if (key == "Enter") {
      search();
    }
  };

  //検索ボタン動作
  const search = () => {
    serchId && fetchUserData();
    !showDropdown && setShowDropdown(!showDropdown);
  };

  //タイトル取得
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setText(e.target.value);
  };

  return (
    <div>
      <form style={{ display: "flex", justifyContent: "center" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <input
            name="title"
            type="text"
            value={planData ? planData.title : ""}
            placeholder="タイトルを入力"
            style={{
              marginTop: "3vh",
              display: "flex",
              width: "55vw",
              height: "6vh",
              fontSize: "1.5rem",
              border: "none",
              outline: "none",
              textAlign: "center",
              marginBottom: "5vh",
              borderBottom: " 5px solid #00552e",
            }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(e)
            }
          />
        </div>
      </form>
      <div
        className="search"
        style={{ fontSize: "1.5rem", display: "flex", flexDirection: "column" }}
      >
        同行者
      </div>
      <div style={{ marginTop: "1vh", display: "flex" }}>
        <input
          name="search"
          type="text"
          placeholder="uidを入力"
          style={{
            display: "flex",
            width: "55vw",
            height: "10vw",
            fontSize: "1.5rem",
            border: "solid 2px",
            boxSizing: "border-box",
          }}
          onKeyDown={(e) => onKeydown(e.key)}
          onChange={(e) => setSerchId(e.target.value)}
          ref={ref}
        />
        <img
          src={SerchIcon}
          alt="search"
          style={{
            height: "10vw",
            width: "10vw",
            border: "solid 2px",
            boxSizing: "border-box",
          }}
          onClick={search}
        ></img>
      </div>
      {showDropdown && hideTop && hideLeft && (
        <div
          style={{
            position: "absolute",
            backgroundColor: "#f9f9f9", // 背景色を設定
            top: `calc(${(hideTop / window.innerWidth) * 100}vw + 10vw)`,
            left: `calc(${(hideLeft / window.innerWidth) * 100}vw - 5vw)`,
            height: "15vw",
            width: "75vw",
            border: "solid 2px",
            boxSizing: "border-box",
            fontSize: "1.0rem",
            display: "flex", // 追加
            alignItems: "center", // 追加
            borderRadius: "8px", // 角丸を設定
            padding: "10px", // 内側の余白を設定
            paddingLeft: "5vw",
            justifyContent: "space-between", // 追加
          }}
        >
          {serchUser ? (
            <div
              style={{
                display: "flex", // 追加
                alignItems: "center", // 追加
              }}
            >
              <div>{serchUser.name}</div>
              <div
                style={{
                  background: "green",
                  borderRadius: "8px",
                  height: "12vw",
                  width: "18vw",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginLeft: "10px", // 名前とボックスの間にスペースを追加
                }}
                onClick={handleAdd}
              >
                追加
              </div>
            </div>
          ) : (
            "uidが見つかりません"
          )}

          <div
            onClick={() => setShowDropdown(!showDropdown)}
            style={{ color: "red", fontSize: "1.3rem" }}
          >
            ✖
          </div>
        </div>
      )}
      <Scroll usersInfo={usersPro} childFunc={childDel} />
      <Dicide usersInfo={usersPro} titleText={text} />
    </div>
  );
}

export default Search;

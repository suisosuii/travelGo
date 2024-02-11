import { auth } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { db } from "../../firebase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { doc, addDoc, collection, setDoc } from "firebase/firestore";

type User = {
  name: string;
  uid: string;
  plan: number;
  picURL: string;
};

function Login() {
  const location = useLocation();
  const navigate = useNavigate();

  const mode = location.state;

  //変数宣言
  const [errorLog, setErrorLog] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");

  //登録ボタン
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (mode == "SignUp") {
      createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          console.log(userCredential);
          const user = userCredential.user;
          //dbにユーザー追加
          const data: User = { name: name, uid: user.uid, plan: 0, picURL: "" };
          try {
            await setDoc(doc(db, "users", user.uid), data);
          } catch (e) {
            console.error("Error adding document: ", e);
          }

          navigate("/", { state: name });
        })
        .catch((error) => {
          // alert(error.message);
          setErrorLog(error.message);
          console.error(error);
        });
    } else if (mode == "SignIn") {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log(userCredential);
          navigate("/");
        })
        .catch((error) => {
          // alert(error.message);
          setErrorLog(error.message);
          console.error(error);
        });
    }
  };

  return (
    <div
      className="sign"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%", // 親要素の幅を指定
        height: "84vh", // 親要素の高さを指定
      }}
    >
      <div
        className="Sign form"
        style={{
          backgroundColor: "#e6ffe6",
          width: "70vw",
          height: "60vh",
          // border: "solid 3px",
          borderRadius: "25px",
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
        }}
      >
        <span style={{ fontSize: "2rem", fontStyle: "bold", marginTop: "2vh" }}>
          {mode}
        </span>
        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {mode == "SignUp" && (
              <div>
                <input
                  name="name"
                  type="name"
                  placeholder="Name"
                  autoComplete="on"
                  onChange={(e) => setName(e.target.value)}
                  style={{
                    width: "50vw",
                    height: "6vh",
                    fontSize: "1.5rem",
                    marginTop: "5vh",
                    border: "none",
                    outline: "none",
                    borderBottom: " 5px solid #00552e",
                  }}
                />
              </div>
            )}
            <div>
              <input
                name="email"
                type="email"
                placeholder="email"
                autoComplete="on"
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: "50vw",
                  height: "6vh",
                  fontSize: "1.5rem",
                  marginTop: "5vh",
                  border: "none",
                  outline: "none",
                  borderBottom: " 5px solid #00552e",
                }}
              />
            </div>
            <div>
              <input
                name="password"
                autoComplete="on"
                type="password"
                placeholder="PassWord"
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: "50vw",
                  height: "6vh",
                  fontSize: "1.5rem",
                  marginTop: "5vh",
                  border: "none",
                  outline: "none",
                  borderBottom: " 5px solid #00552e",
                }}
              />
            </div>
          </div>
          <div>
            <div className="error" style={{ marginTop: "4vh", color: "red" }}>
              {errorLog}
            </div>
            <button style={{ marginTop: "4vh" }}>登録</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

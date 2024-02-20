import React, { useEffect, useRef, useState } from "react";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";
import { useAuthContext } from "../../auth/authProvider";

import acount from "../../img/header/acount-def.png";

function ImgUp() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onButtonClick = () => {
    // ボタンがクリックされたときにinputをクリックする
    fileInputRef.current && fileInputRef.current.click();
  };

  const [profileImage, setProfileImage] = useState(acount);
  const { user } = useAuthContext();
  const storage = getStorage();
  const profilePicRef = ref(storage, "profile/" + user?.uid);
  useEffect(() => {
    getDownloadURL(profilePicRef)
      .then((url) => {
        // ダウンロードURLが取得できたら、それをステートに格納
        setProfileImage(url);
      })
      .catch((error) => {
        console.error("Error getting download URL:", error);
      });
  });
  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    if (user) {
      // React.ChangeEvent<HTMLInputElement>よりファイルを取得
      const fileObject = e.target.files[0];
      // オブジェクトURLを生成し、useState()を更新
      setProfileImage(window.URL.createObjectURL(fileObject));
      deleteObject(profilePicRef)
        .then(() => {
          // File deleted successfully
        })
        .catch((error) => {
          // Uh-oh, an error occurred!
          console.log(error);
        });

      uploadBytes(profilePicRef, fileObject);
    }
  };

  return (
    <div
      style={{ display: "flex", textAlign: "center", flexDirection: "column" }}
    >
      <img
        src={profileImage}
        alt="acountImage"
        style={{
          width: 100 + "px",
          height: 100 + "px",
          borderRadius: "50%",
          margin: "auto",
        }}
      ></img>

      <button onClick={onButtonClick}>画像を選択</button>
      <input
        type="file"
        accept="image/*"
        onChange={onFileInputChange}
        className="pl-4"
        style={{ display: "none" }} // inputを非表示にする
        ref={fileInputRef} // refを設定する
      />
    </div>
  );
}

export default ImgUp;

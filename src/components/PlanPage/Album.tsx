import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { DayPlanContext } from "./day";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";
import { useAuthContext } from "../../auth/authProvider";
import noImg from "../../img/home/no_image_square.jpg";
import plus from "../../img/plan/ExPlus.png";

function Album(props: { aryNum: number; subNum: number }) {
  const { aryNum, subNum } = props;
  const { user } = useAuthContext();
  const context = useContext(DayPlanContext);
  if (!context) {
    throw new Error("DayPlanContext is not provided");
  }
  const [dayPlans, setDayPlans] = context;
  const storage = getStorage();
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [plusImg, setPlusImg] = useState(noImg);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onButtonClick = () => {
    // ボタンがクリックされたときにinputをクリックする
    fileInputRef.current && fileInputRef.current.click();
  };

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (user) {
      if (!e.target.files) return;
      const profilePicRef = ref(
        storage,
        "Album/" +
          String(aryNum) +
          "/" +
          String(subNum) +
          "/" +
          dayPlans[aryNum].expectedData[subNum].album.length
      );
      // React.ChangeEvent<HTMLInputElement>よりファイルを取得
      const fileObject = e.target.files[0];
      // オブジェクトURLを生成し、useState()を更新
      setImageUrls((prevImageUrls) => [
        ...prevImageUrls,
        window.URL.createObjectURL(fileObject),
      ]);
      uploadBytes(profilePicRef, fileObject)
        .then(() => {
          // File deleted successfully
          const newDayPlans = JSON.parse(JSON.stringify(dayPlans)); // dayPlansの深いコピーを作成
          const newAlbumPath =
            "Album/" +
            String(aryNum) +
            "/" +
            String(subNum) +
            "/" +
            newDayPlans[aryNum].expectedData[subNum].album.length;

          newDayPlans[aryNum].expectedData[subNum].album.push(newAlbumPath);
          setDayPlans(newDayPlans); // 更新されたdayPlansをセット
          console.log(dayPlans);
        })
        .catch((error) => {
          // Uh-oh, an error occurred!
          console.log(error);
        });
    }
  };

  useEffect(() => {
    const fetchUserData = async (adr: string) => {
      const profilePicRef = ref(storage, adr);
      try {
        const url = await getDownloadURL(profilePicRef);
        return url;
      } catch (error) {
        console.error("Error getting download URL:", error);
        return noImg;
      }
    };

    const fetchNewImages = async () => {
      const newImages = dayPlans[aryNum].expectedData[subNum].album.filter(
        (data) => !imageUrls.includes(data)
      );
      const urls = await Promise.all(newImages.map(fetchUserData));
      setImageUrls((prevUrls) => [...prevUrls, ...urls]);
    };

    fetchNewImages();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        gap: "1em",
        height: "30vw",
        width: "90vw",
        overflowY: "auto",
        border: "solid 3px",
        boxSizing: "border-box",
      }}
    >
      {imageUrls.map((url, index) => (
        <img
          src={url}
          alt=""
          key={index}
          style={{ width: "25vw", height: "25vw" }}
        />
      ))}
      <img
        src={plus}
        alt=""
        onClick={onButtonClick}
        style={{ height: "25vw", width: "25vw" }}
      ></img>
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

export default Album;

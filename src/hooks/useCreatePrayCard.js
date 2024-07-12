import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { insertPrayCards } from "../apis/pray_card";

const useCreatePrayCard = (member) => {
  const navigate = useNavigate();
  const [prayerText, setPrayerText] = useState("");

  const handleButtonClick = () => {
    if (prayerText.trim() === "") {
      alert("기도제목을 작성해주셔야 그룹원들을 위해 기도할 수 있어요");
    } else {
      const data = insertPrayCards(member.group_id, prayerText);
      window.location.reload();
    }
  };

  return {
    prayerText,
    setPrayerText,
    handleButtonClick,
  };
};

export default useCreatePrayCard;

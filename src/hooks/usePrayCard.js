import { useState } from "react";
import { supabase } from "../supaClient";

const usePrayCard = (currentMember, prayCard, prayData) => {
  const checkPrayDataForToday = (prayData, userId) => {
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    return prayData.some((pray) => {
      const prayDate = new Date(pray.created_at);
      return (
        pray.user_id === userId &&
        prayDate >= startOfDay &&
        prayDate <= endOfDay
      );
    });
  };
  const [prayerText, setPrayerText] = useState(
    prayCard ? prayCard.content : ""
  );
  const [isEditing, setIsEditing] = useState(false);
  const [userInput, setUserInput] = useState(
    prayCard ? prayCard.content : "아직 기도제목이 없어요"
  );
  const [hasPrayed, setHasPrayed] = useState(
    checkPrayDataForToday(prayData, currentMember.user_id)
  );

  const handleCreatePrayCard = async (groupId) => {
    if (prayerText.trim() === "") {
      alert("기도제목을 작성해주셔야 그룹원들을 위해 기도할 수 있어요");
    } else {
      await supabase.from("pray_card").insert({
        group_id: groupId,
        content: prayerText,
      });
      window.location.reload();
    }
  };

  const handleEditClick = () => {
    if (userInput === "아직 기도제목이 없어요") {
      setUserInput("");
    }
    setIsEditing(true);
  };

  const handleSaveClick = async (groupId, prayCard) => {
    if (!prayCard) {
      await supabase.from("pray_card").insert({
        group_id: groupId,
        content: userInput,
      });
    } else {
      const { data, error } = await supabase
        .from("pray_card")
        .update({ content: userInput, updated_at: new Date() })
        .eq("id", prayCard.id)
        .select();
      if (error) console.error(error);
    }
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setUserInput(e.target.value);
  };

  const handlePrayClick = async (prayCard) => {
    if (!prayCard) {
      console.error("기도카드가 없습니다.");
      return null;
    }
    if (hasPrayed) {
      console.log("당일 기도 진행완료.");
      return null;
    }
    await supabase.from("pray").insert({
      pray_card_id: prayCard.id,
    });
    setHasPrayed(true);
  };

  return {
    prayerText,
    setPrayerText,
    handleCreatePrayCard,
    isEditing,
    userInput,
    hasPrayed,
    handleEditClick,
    handleSaveClick,
    handleChange,
    handlePrayClick,
  };
};

export default usePrayCard;

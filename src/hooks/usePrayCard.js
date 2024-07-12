import { useState } from "react";
import { supabase } from "../supaClient";

const usePrayCard = (member, lastestPrayCard) => {
  const [prayerText, setPrayerText] = useState(
    lastestPrayCard ? lastestPrayCard.content : ""
  );
  const [isEditing, setIsEditing] = useState(false);
  const [userInput, setUserInput] = useState(
    lastestPrayCard ? lastestPrayCard.content : "아직 기도제목이 없어요"
  );
  const [hasPrayed, setHasPrayed] = useState(false);

  const handleCreatePrayCard = async () => {
    if (prayerText.trim() === "") {
      alert("기도제목을 작성해주셔야 그룹원들을 위해 기도할 수 있어요");
    } else {
      await supabase.from("pray_card").insert({
        group_id: member.group_id,
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
      console.error("prayCard is not defined");
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

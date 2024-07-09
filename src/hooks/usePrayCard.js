import { useState } from "react";
import { supabase } from "../supaClient";

const usePrayCard = (lastestPrayCard) => {
  const [isEditing, setIsEditing] = useState(false);
  const [userInput, setUserInput] = useState(
    lastestPrayCard ? lastestPrayCard.content : "아직 기도제목이 없어요"
  );
  const [hasPrayed, setHasPrayed] = useState(false);

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
      setIsEditing(false);
      return;
    }
    await supabase
      .from("pray_card")
      .update({ content: userInput })
      .eq("id", prayCard.id);

    setIsEditing(false);
  };

  const handleChange = (e) => {
    setUserInput(e.target.value);
  };

  const handlePrayClick = async (prayCardId) => {
    await supabase.from("pray").insert({
      pray_card_id: prayCardId,
    });
    setHasPrayed(true);
  };

  async function fetchPray(prayCardId) {
    const { data, error } = await supabase
      .from("pray")
      .select("*")
      .eq("pray_card_id", prayCardId)
      .is("deleted_at", null);

    if (error) {
      console.error("Error fetching members:", error);
      return [];
    }
    return data;
  }

  return {
    isEditing,
    userInput,
    hasPrayed,
    handleEditClick,
    handleSaveClick,
    handleChange,
    handlePrayClick,
    fetchPray,
  };
};

export default usePrayCard;

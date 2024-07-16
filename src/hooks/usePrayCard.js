import { useState } from "react";
import { supabase } from "../supaClient";
import { useCallback } from "react";

const usePrayCard = (prayCard) => {
  const [prayerText, setPrayerText] = useState(
    prayCard ? prayCard.content : ""
  );
  const [isEditing, setIsEditing] = useState(false);
  const [userInput, setUserInput] = useState(
    prayCard ? prayCard.content : "아직 기도제목이 없어요"
  );
  const [prayData, setPrayData] = useState(null);
  const [hasPrayed, setHasPrayed] = useState(false);

  const fetchPrayData = useCallback(async (prayCard) => {
    if (!prayCard) {
      return [];
    }
    const { data, error } = await supabase
      .from("pray")
      .select(`*, profiles (id, full_name, avatar_url)`)
      .eq("pray_card_id", prayCard.id)
      .is("deleted_at", null);

    if (error) {
      console.error("Failed to fetch pray data:", error);
      return [];
    }

    setPrayData(data);
    return data;
  }, []);

  const checkPrayDataForToday = useCallback((userId, prayData) => {
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    const hasPrayedToday = prayData.some((pray) => {
      const prayDate = new Date(pray.created_at);
      return (
        pray.user_id === userId &&
        prayDate >= startOfDay &&
        prayDate <= endOfDay
      );
    });
    setHasPrayed(hasPrayedToday);
  }, []);

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

  const handlePrayClick = async (prayCard, prayType) => {
    if (!prayCard) {
      console.error("기도카드가 없습니다.");
      return null;
    }
    if (hasPrayed) {
      return null;
    }
    const { data, error } = await supabase.from("pray").insert({
      pray_card_id: prayCard.id,
      pray_type: prayType,
    });
    if (error) {
      console.error("Failed to insert pray data:", error);
      return null;
    }

    const { data: fetchData, error: fetchError } = await supabase
      .from("pray")
      .select(`*, profiles (id, full_name, avatar_url)`)
      .eq("pray_card_id", prayCard.id)
      .is("deleted_at", null);

    if (fetchError) {
      console.error("Failed to fetch pray data:", error);
      return [];
    }
    setPrayData(fetchData);
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
    prayData,
    fetchPrayData,
    checkPrayDataForToday,
  };
};

export default usePrayCard;

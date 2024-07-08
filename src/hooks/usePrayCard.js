import { useState } from "react";
import { supabase } from "../supaClient";

const usePrayCard = (initialPrayer, memberId) => {
  const [isEditing, setIsEditing] = useState(false);
  const [prayerDetails, setPrayerDetails] = useState(initialPrayer);
  const [hasPrayed, setHasPrayed] = useState(false);

  const handleCreateClick = async (groupId, content) => {
    await supabase.from("pray_card").insert({
      group_id: groupId,
      content: content,
    });
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    const { data } = await supabase
      .from("member")
      .update({ pray_summary: prayerDetails })
      .eq("id", memberId);
    console.log(data);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setPrayerDetails(e.target.value);
  };

  const handlePrayClick = () => {
    setHasPrayed(true);
  };

  return {
    isEditing,
    prayerDetails,
    hasPrayed,
    handleCreateClick,
    handleEditClick,
    handleSaveClick,
    handleChange,
    handlePrayClick,
  };
};

export default usePrayCard;

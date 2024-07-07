import { useState } from "react";
import { supabase } from "../supaClient";

const usePrayCard = (initialPrayer, memberId) => {
  const [isEditing, setIsEditing] = useState(false);
  const [prayerDetails, setPrayerDetails] = useState(initialPrayer);
  const [hasPrayed, setHasPrayed] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    const { data } = await supabase
      .from("test")
      .update({ prayer: prayerDetails })
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
    handleEditClick,
    handleSaveClick,
    handleChange,
    handlePrayClick,
  };
};

export default usePrayCard;

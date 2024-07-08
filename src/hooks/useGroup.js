import { useState, useEffect } from "react";
import { supabase } from "../supaClient";

const useGroup = (paramsGroupId) => {
  const [groupName, setGroupName] = useState("");

  useEffect(() => {
    if (paramsGroupId) {
      fetchGroupName(paramsGroupId);
    }
  }, [paramsGroupId]);

  const fetchGroupName = async (paramsGroupId) => {
    const { data, error } = await supabase
      .from("group")
      .select("name")
      .eq("id", paramsGroupId)
      .is("deleted_at", null);

    if (error) {
      console.error("Error fetching Group Name:", error);
      return;
    }

    if (data && data.length > 0) {
      setGroupName(data[0].name);
    }
  };

  return { groupName };
};

export default useGroup;

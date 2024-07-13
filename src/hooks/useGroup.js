import { useState } from "react";
import { useCallback } from "react";
import { supabase } from "../supaClient";

const useGroup = () => {
  const [groupList, setGroupList] = useState(null);
  const [targetGroup, setTargetGroup] = useState(null);

  const fetchGroupListbyUserId = useCallback(async (userId) => {
    const { data, error } = await supabase
      .from("member")
      .select(`group (*)`)
      .eq("user_id", userId)
      .is("deleted_at", null);

    if (error) {
      console.error("Error fetching group ID:", error);
      return null;
    }

    setGroupList(data);
    return data;
  }, []);

  const getTargetGroup = useCallback(async (groupId) => {
    const { data, error } = await supabase
      .from("group")
      .select("*")
      .eq("id", groupId)
      .is("deleted_at", null)
      .single();

    if (error) {
      console.error("Error get group ID:", error);
      return null;
    }

    setTargetGroup(data);
    return data;
  }, []);

  return { fetchGroupListbyUserId, getTargetGroup, groupList, targetGroup };
};

export default useGroup;

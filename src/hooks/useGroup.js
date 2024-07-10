import { useState, useEffect } from "react";
import { supabase } from "../supaClient";
import { useNavigate } from "react-router-dom";

const useGroup = (paramsGroupId) => {
  const navigate = useNavigate();

  const [groupName, setGroupName] = useState("");

  const fetchGroupId = async (userId) => {
    const { data, error } = await supabase
      .from("member")
      .select("group_id")
      .eq("user_id", userId)
      .is("deleted_at", null);

    if (error) {
      console.error("Error fetching group ID:", error);
      return null;
    }

    return data[0].group_id;
  };

  useEffect(() => {
    if (paramsGroupId) {
      fetchGroupName(paramsGroupId);
    } else {
      supabase.auth.getSession().then(async ({ data: { session } }) => {
        if (session) {
          const userId = session.user.id;
          console.log(userId);
          const fetchedGroupId = await fetchGroupId(userId);
          console.log(fetchGroupId);
          if (fetchedGroupId) {
            navigate(`/group/${fetchedGroupId}`);
          } else {
            navigate(`/group-create`);
          }
        } else {
          navigate(`/Login`);
        }
      });
    }
  }, [paramsGroupId, navigate]);

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

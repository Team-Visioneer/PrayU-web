import { useState, useEffect } from "react";
import { supabase } from "../supaClient";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const navigate = useNavigate();
  const [groupId, setGroupId] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchGroupId = async (userId) => {
    const { data, error } = await supabase
      .from("member")
      .select("group_id")
      .eq("user_id", userId)
      .is("deleted_at", null)
      .single();

    if (error) {
      console.error("Error fetching group ID:", error);
      return null;
    }

    return data.group_id;
  };

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session) {
        const userId = session.user.id;
        const fetchedGroupId = await fetchGroupId(userId);
        if (fetchedGroupId) {
          setGroupId(fetchedGroupId);
          navigate(`/group/${fetchedGroupId}`);
        }
      }
      setLoading(false);
    });
  }, [navigate]);

  return { groupId, loading };
};

export default useLogin;

import { useState, useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "../supaClient";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [groupId, setGroupId] = useState("");

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
    });
  }, [navigate]);

  return (
    <div className="flex flex-col justify-center items-center">
      <h3 className="text-center text-5xl mt-10">안녕하세요, PrayU입니다.</h3>
      <div className="justify-center mt-24 max-w-[300px]">
        <Auth
          redirectTo={`http://localhost:5173/group/${groupId}`}
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          onlyThirdPartyProviders
          providers={["kakao"]}
        />
      </div>
    </div>
  );
};

export default Login;

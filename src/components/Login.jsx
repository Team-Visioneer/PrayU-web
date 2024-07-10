import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "../supaClient";
import { ClipLoader } from "react-spinners";
import useLogin from "../hooks/useLogin";
import { useParams } from "react-router-dom";

const Login = () => {
  const { paramsGroupId } = useParams();
  const { groupId, loading } = useLogin(paramsGroupId);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={50} color={"#123abc"} loading={loading} />
      </div>
    );
  }

  const redirectUrl = paramsGroupId
    ? `${import.meta.env.VITE_BASE_URL}/group/${paramsGroupId}`
    : `${import.meta.env.VITE_BASE_URL}/group/${groupId}`;

  return (
    <div className="flex flex-col justify-center items-center">
      <h3 className="text-center text-5xl mt-10">안녕하세요, PrayU입니다.</h3>
      <div className="justify-center mt-24 max-w-[300px]">
        <Auth
          redirectTo={redirectUrl}
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

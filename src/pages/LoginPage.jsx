import { useLocation, useNavigate } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";
import { supabase } from "../supaClient";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import useAuth from "../hooks/useAuth";

const LoginPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  if (user) {
    navigate("/group", { replace: true });
  }

  const location = useLocation();
  const from = location.state?.from?.pathname || "/group";

  const redirectUrl = `${import.meta.env.VITE_BASE_URL}${from}`;
  return (
    <div>
      <h3 className="text-center text-5xl mt-10">안녕하세요, PrayU입니다.</h3>
      <Auth
        redirectTo={redirectUrl}
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        onlyThirdPartyProviders
        providers={["kakao"]}
      />
    </div>
  );
};

export default LoginPage;
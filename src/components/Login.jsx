import { useState, useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "../supaClient";

// TODO: 세션 상태 삭제하기
const Login = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log(session);
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!session) {
    return (
      <div className="flex flex-col justify-center items-center">
        <h3 className="text-center text-5xl mt-10">안녕하세요, PrayU입니다.</h3>
        <div className="justify-center mt-24 max-w-[300px]">
          <Auth
            redirectTo="http://localhost:5173/group"
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            onlyThirdPartyProviders
            providers={["kakao"]}
          />
        </div>
      </div>
    );
  } else {
    return <div className="text-white">Logged in!</div>;
  }
};

export default Login;

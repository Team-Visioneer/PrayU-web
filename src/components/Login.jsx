import { createClient } from "@supabase/supabase-js";
import { useState, useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

const supabase = createClient(
  import.meta.env.VITE_SUPA_PROJECT_URL,
  import.meta.env.VITE_SUPA_ANON_KEY
);

const Login = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
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
      <Auth
        redirectTo="http://localhost:5173/group"
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        onlyThirdPartyProviders
        providers={["kakao"]}
      />
    );
  } else {
    return <div className="text-white">Logged in!</div>;
  }
};

export default Login;

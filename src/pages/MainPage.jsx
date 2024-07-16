import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";
import { supabase } from "../supaClient";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/ImgCarousel";
import useAuth from "../hooks/useAuth";

const MainPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (user) {
    navigate("/group", { replace: true });
  }

  const from = location.state?.from?.pathname || "/group";
  const redirectUrl = `${import.meta.env.VITE_BASE_URL}${from}`;
  return (
    <div className="flex flex-col text-center items-center gap-2">
      <div className="flex flex-col gap-2 mt-20 ">
        <div className="text-lg font-bold">
          우리만의 기도제목 기록공간, PrayU
        </div>
        <div className="text-sm text-gray-500">
          매일 기도하고 매일 반응하는 우리 공동체
        </div>
      </div>

      <Carousel opts={{ align: "start" }} className="w-full aspect-square">
        <CarouselContent className="flex gap-4 full aspect-square">
          {/* 파란색 배경*/}
          <CarouselItem className="w-full aspect-square p-6">
            <div className="flex justify-center items-center w-full aspect-square bg-gray-300">
              1
            </div>
          </CarouselItem>
          <CarouselItem className="w-full aspect-square p-6">
            <div className="flex justify-center items-center w-full aspect-square bg-gray-300">
              2
            </div>
          </CarouselItem>
          <CarouselItem className="w-full aspect-square  p-6">
            <div className="flex justify-center items-center w-full aspect-square bg-gray-300">
              3
            </div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>

      <Auth
        redirectTo={redirectUrl}
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        onlyThirdPartyProviders={true}
        providers={["kakao"]}
      />
    </div>
  );
};

export default MainPage;

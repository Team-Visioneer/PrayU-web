import { useState, useEffect } from "react";
import { supabase } from "../supaClient";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/memberDrawer";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Profile from "./Profile";
import PrayCalender from "./ui/PrayCalender";

const OtherPrayDrawer = ({ currentMember, member }) => {
  const [hasPrayed, setHasPrayed] = useState(false);
  const [dates, setDates] = useState([]);
  const prayTypeToEmoji = {
    pray: "🙏",
    good: "👍",
    like: "❤️",
  };

  const generateDates = (createdAt, prayDatas) => {
    const today = new Date(createdAt);
    const dateList = [];

    for (let i = 0; i < 7; i++) {
      const newDate = new Date(today);
      newDate.setDate(today.getDate() + i);
      const formattedDate = newDate.toISOString().split("T")[0];

      const prayData = prayDatas.find((entry) => {
        const prayDate = new Date(entry.created_at).toISOString().split("T")[0];
        return prayDate === formattedDate;
      });

      const emoji = prayData ? prayTypeToEmoji[prayData.pray_type] : "";
      dateList.push({ date: formattedDate, emoji });
    }

    return dateList;
  };

  const checkPrayDataForToday = (prayData, userId) => {
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    return prayData.some((pray) => {
      const prayDate = new Date(pray.created_at);
      return (
        pray.user_id === userId &&
        prayDate >= startOfDay &&
        prayDate <= endOfDay
      );
    });
  };

  const handlePrayClick = async (prayCard, prayType) => {
    if (!prayCard) {
      console.error("기도카드가 없습니다.");
      return null;
    }
    if (hasPrayed) {
      console.error("당일 기도 진행완료.");
      return null;
    }
    const { data, error } = await supabase.from("pray").insert({
      pray_card_id: prayCard.id,
      pray_type: prayType,
    });

    if (error) {
      console.error(error);
      return;
    }

    setHasPrayed(true);

    const today = new Date().toISOString().split("T")[0];
    setDates((prevDates) =>
      prevDates.map((date) =>
        date.date === today
          ? { ...date, emoji: prayTypeToEmoji[prayType] }
          : date
      )
    );
  };

  useEffect(() => {
    const fetchMyPrayData = async () => {
      if (member.prayCards[0]) {
        const { data, error } = await supabase
          .from("pray")
          .select(`*, profiles (id, full_name, avatar_url)`)
          .eq("pray_card_id", member.prayCards[0].id)
          .eq("user_id", currentMember.profiles.id)
          .is("deleted_at", null);

        if (error) {
          console.error("Error fetching pray:", error);
          return [];
        }

        const hasPrayedToday = checkPrayDataForToday(
          data,
          currentMember.profiles.id
        );
        setHasPrayed(hasPrayedToday);

        const generatedDates = generateDates(
          member.prayCards[0].created_at,
          data
        );
        setDates(generatedDates);
      }
    };

    fetchMyPrayData();
  }, [member.prayCards, currentMember.profiles.id, member.created_at]);

  return (
    <div className="w-full flex justify-center">
      <Drawer>
        <DrawerTrigger className="w-full">
          <Profile key={member.id} member={member} />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerDescription className="text-white flex flex-col justify-center">
              <Card className="flex-col bg-white w-[360px] h-[450px] flex justify-center items-center rounded-2xl border-2 border-blue-100">
                <Card className="bg-cardInsideBlue text-black w-[300px] h-[300px] rounded-2xl mb-6">
                  <CardHeader>
                    <CardTitle>
                      <div>
                        <img
                          src={member.profiles.avatar_url}
                          alt={`${member.profiles.full_name}'s avatar`}
                          className="w-5 h-5 rounded-full mr-4"
                        />
                        {member.profiles.full_name}
                      </div>
                    </CardTitle>
                    <CardDescription>이번주 기도제목</CardDescription>
                  </CardHeader>
                  <CardContent className="text-2xl">
                    {member.prayCards[0]?.content}
                  </CardContent>
                </Card>
                <PrayCalender dates={dates} />
              </Card>

              <Card className="flex flex-col items-center justify-center w-[360px] h-[150px] mt-5 bg-white text-black border-2 border-blue-100 rounded-2xl">
                <CardTitle className="text-xl">기도하기</CardTitle>
                <div className="flex justify-center space-x-4 mt-2">
                  <button
                    onClick={() => handlePrayClick(member.prayCards[0], "pray")}
                    className={`w-[90px] py-2 px-4 flex flex-col items-center rounded-2xl ${
                      hasPrayed
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-purple-100 text-black"
                    }`}
                    disabled={hasPrayed}
                  >
                    <span className="text-2xl">🙏</span>
                    <span>기도해요</span>
                  </button>
                  <button
                    onClick={() => handlePrayClick(member.prayCards[0], "good")}
                    className={`w-[90px] py-2 px-4 flex flex-col items-center rounded-2xl ${
                      hasPrayed
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-purple-100 text-black"
                    }`}
                    disabled={hasPrayed}
                  >
                    <span className="text-2xl">👍</span>
                    <span>응원해요</span>
                  </button>
                  <button
                    onClick={() => handlePrayClick(member.prayCards[0], "like")}
                    className={`w-[90px] py-2 px-4 flex flex-col items-center rounded-2xl ${
                      hasPrayed
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-purple-100 text-black"
                    }`}
                    disabled={hasPrayed}
                  >
                    <span className="text-2xl">❤️</span>
                    <span>좋아요</span>
                  </button>
                </div>
              </Card>
            </DrawerDescription>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default OtherPrayDrawer;

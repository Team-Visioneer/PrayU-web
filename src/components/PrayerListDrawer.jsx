import { Card, CardTitle } from "@/components/ui/card";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/memberDrawer";
import PrayerListDailyTabs from "./PrayerListDailyTabs";
import { useParams } from "react-router-dom";
import { supabase } from "../supaClient";
import { useEffect, useState } from "react";

const PrayerListDrawer = ({ currentMember }) => {
  const { groupId } = useParams();
  const [counts, setCounts] = useState({ pray: 0, good: 0, like: 0 });

  useEffect(() => {
    const getPrayCounts = async (currentMember, groupId) => {
      try {
        const prayCard = currentMember.prayCards.find(
          (card) => card.group_id === groupId
        );

        if (!prayCard) {
          console.log("No prayCard found for the given groupId");
          return { pray: 0, good: 0, like: 0 };
        }

        const prayCardId = prayCard.id;

        const getCount = async (type) => {
          const { count, error } = await supabase
            .from("pray")
            .select("*", { count: "exact" })
            .eq("pray_card_id", prayCardId)
            .eq("pray_type", type);

          if (error) throw error;
          return count;
        };

        const [prayCount, goodCount, likeCount] = await Promise.all([
          getCount("pray"),
          getCount("good"),
          getCount("like"),
        ]);

        setCounts({ pray: prayCount, good: goodCount, like: likeCount });
      } catch (error) {
        console.error("Error fetching pray counts:", error);
        setCounts({ pray: 0, good: 0, like: 0 });
      }
    };

    getPrayCounts(currentMember, groupId);
  }, []);

  return (
    <div>
      <Drawer>
        <DrawerTrigger className="w-full">
          <div className="flex">
            <Card className="flex flex-col items-center justify-center w-full h-[150px] mt-5 bg-white text-black border-2 border-blue-100 rounded-2xl">
              <CardTitle className="text-xl">
                내가 받은 기도:{counts.pray + counts.good + counts.like}
              </CardTitle>
              <div className="flex justify-center space-x-4 mt-2">
                <button
                  className={`w-[80px] py-2 px-4 flex flex-col items-center rounded-2xl bg-purple-100 text-black`}
                >
                  <span className="text-2xl">🙏</span>
                  <span>{counts.pray}</span>
                </button>
                <button
                  className={`w-[80px] py-2 px-4 flex flex-col items-center rounded-2xl bg-purple-100 text-black`}
                >
                  <span className="text-2xl">👍</span>
                  <span>{counts.good}</span>
                </button>
                <button
                  className={`w-[80px] py-2 px-4 flex flex-col items-center rounded-2xl bg-purple-100 text-black`}
                >
                  <span className="text-2xl">❤️</span>
                  <span>{counts.like}</span>
                </button>
              </div>
            </Card>
          </div>
        </DrawerTrigger>
        <DrawerContent className="h-[400px]">
          <DrawerHeader>
            <DrawerTitle>요일별 리스트</DrawerTitle>
          </DrawerHeader>
          <PrayerListDailyTabs />
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default PrayerListDrawer;

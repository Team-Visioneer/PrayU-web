import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supaClient";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/ImgCarousel";

const CreateGroup = () => {
  const [groupName, setGroupName] = useState("");
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  const handleCreateGroup = async () => {
    if (groupName.trim() === "") {
      alert("그룹 이름을 입력해주세요.");
      return;
    }

    const { data, error } = await supabase
      .from("group")
      .insert([{ user_id: userId, name: groupName, intro: "intro" }])
      .select();
    if (error) {
      console.error("Error creating group:", error);
      alert("그룹 생성에 실패했습니다.");
    } else {
      const groupId = data[0].id;
      const { data_member, error } = await supabase
        .from("member")
        .insert([{ user_id: userId, group_id: groupId, pray_summary: "" }]);
      if (error) {
        console.error("Error create member:", error);
      } else {
        navigate(`/group/${groupId}`);
      }
    }
  };

  return (
    <div className="flex flex-col gap-2 p-6">
      <div className="flex flex-col gap-2 mt-16 ">
        <div className="text-lg font-bold">PrayU 그룹 생성</div>
      </div>

      <Carousel opts={{ align: "start" }} className="w-full aspect-square">
        <CarouselContent className="flex gap-4 full aspect-square">
          {/* 파란색 배경*/}
          <CarouselItem className="w-full aspect-square">
            <div className="flex justify-center items-center w-full aspect-square bg-gray-300">
              1
            </div>
          </CarouselItem>
          <CarouselItem className="w-full aspect-square">
            <div className="flex justify-center items-center w-full aspect-square bg-gray-300">
              2
            </div>
          </CarouselItem>
          <CarouselItem className="w-full aspect-square">
            <div className="flex justify-center items-center w-full aspect-square bg-gray-300">
              3
            </div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>

      <div className="text-sm font-bold">그룹명</div>
      <div className="flex flex-col items-center gap-4 w-full ">
        <input
          type="text"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          placeholder="그룹 이름을 입력하세요"
          className="w-full border rounded py-2 px-4"
        />
        <button
          onClick={handleCreateGroup}
          className="w-full  bg-black hover:bg-gray-600 text-sm text-white p-2 rounded"
        >
          그룹 생성하기
        </button>
        <div className="text-xs text-gray-500">
          기존 그룹에 참여하고 싶은 경우 그룹장에게 초대링크를 요청해 주세요
        </div>
      </div>
    </div>
  );
};

export default CreateGroup;

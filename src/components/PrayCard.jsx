import { useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { AiOutlineEdit, AiOutlineSave, AiOutlineClose } from "react-icons/ai";
import PrayerList from "./PrayerList";
import usePrayCard from "../hooks/usePrayCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/memberDrawer";
import { Separator } from "@/components/ui/separator"; // Ensure you have this component

const PrayCard = ({
  isOpen,
  onClose,
  groupId,
  selectedMember,
  currentMember,
  prayCard,
}) => {
  const {
    isEditing,
    userInput,
    hasPrayed,
    handleEditClick,
    handleSaveClick,
    handleChange,
    handlePrayClick,
    prayData,
    fetchPrayData,
    checkPrayDataForToday,
  } = usePrayCard(prayCard);

  useEffect(() => {
    fetchPrayData(prayCard);
  }, [fetchPrayData, prayCard]);

  useEffect(() => {
    if (prayData) {
      checkPrayDataForToday(currentMember.user_id, prayData);
    }
  }, [checkPrayDataForToday, currentMember.user_id, prayData]);

  if (!isOpen) return null;
  if (!prayData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={50} color={"#123abc"} loading={true} />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-cardOutsideBlue p-8 rounded shadow-md w-full h-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-600 hover:text-gray-900"
        >
          <AiOutlineClose size={24} />
        </button>
        <div className="flex items-center">
          {selectedMember.profiles.avatar_url && (
            <img
              src={selectedMember.profiles.avatar_url}
              alt={`${selectedMember.profiles.full_name}'s avatar`}
              className="w-10 h-10 rounded-full mr-4"
            />
          )}
          <h2 className="text-xl font-bold">나의 기도제목</h2>
        </div>
        <div className="flex flex-col items-center w-full h-[500px] bg-white rounded-2xl mt-10 border-2 border-blue-100">
          {isEditing && selectedMember.user_id == currentMember.user_id ? (
            <textarea
              value={userInput}
              onChange={handleChange}
              className="w-5/6 h-[400px] p-2 border rounded-2xl mt-10 mb-2"
            />
          ) : (
            <div className="border w-5/6 h-[400px] rounded-2xl flex justify-center items-center bg-white mb-2 mt-10">
              {userInput}
            </div>
          )}
          <div>
            {selectedMember.user_id == currentMember.user_id &&
              (isEditing ? (
                <AiOutlineSave
                  onClick={() => handleSaveClick(groupId, prayCard)}
                  className="text-blue-500 cursor-pointer mb-2"
                  size={24}
                />
              ) : (
                <AiOutlineEdit
                  onClick={handleEditClick}
                  className="text-blue-500 cursor-pointer mb-2"
                  size={24}
                />
              ))}
          </div>
        </div>
        <Drawer>
          <DrawerTrigger className="w-full">
            <div className="flex">
              <Card className="flex flex-col items-center justify-center w-full h-[150px] mt-5 bg-white text-black border-2 border-blue-100 rounded-2xl">
                <CardTitle className="text-xl">내가 받은 기도</CardTitle>
                <div className="flex justify-center space-x-4 mt-2">
                  <button
                    className={`w-[80px] py-2 px-4 flex flex-col items-center rounded-2xl ${
                      hasPrayed
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-purple-100 text-black"
                    }`}
                    disabled={hasPrayed}
                  >
                    <span className="text-2xl">🙏</span>
                    <span>+7</span>
                  </button>
                  <button
                    className={`w-[80px] py-2 px-4 flex flex-col items-center rounded-2xl ${
                      hasPrayed
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-purple-100 text-black"
                    }`}
                    disabled={hasPrayed}
                  >
                    <span className="text-2xl">👍</span>
                    <span>+3</span>
                  </button>
                  <button
                    className={`w-[80px] py-2 px-4 flex flex-col items-center rounded-2xl ${
                      hasPrayed
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-purple-100 text-black"
                    }`}
                    disabled={hasPrayed}
                  >
                    <span className="text-2xl">❤️</span>
                    <span>+5</span>
                  </button>
                </div>
              </Card>
            </div>
          </DrawerTrigger>
          <DrawerContent className="h-[400px]">
            <DrawerHeader>
              <DrawerTitle>요일별 리스트</DrawerTitle>
            </DrawerHeader>
            <div className="px-4 flex">
              <div className="flex flex-col items-center">
                <h3 className="text-lg font-semibold">1일</h3>
                <Separator className="my-2" />
              </div>
              <div className="flex flex-col items-center">
                <h3 className="text-lg font-semibold">2일</h3>
                <Separator className="my-2" />
              </div>
              <div className="flex flex-col items-center">
                <h3 className="text-lg font-semibold">3일</h3>
                <Separator className="my-2" />
              </div>
              <div className="flex flex-col items-center">
                <h3 className="text-lg font-semibold">4일</h3>
                <Separator className="my-2" />
              </div>
              <div className="flex flex-col items-center">
                <h3 className="text-lg font-semibold">5일</h3>
                <Separator className="my-2" />
              </div>
              <div className="flex flex-col items-center">
                <h3 className="text-lg font-semibold">6일</h3>
                <Separator className="my-2" />
              </div>
              <div className="flex flex-col items-center">
                <h3 className="text-lg font-semibold">7일</h3>
                <Separator className="my-2" />
              </div>
            </div>
          </DrawerContent>
        </Drawer>

        {/*<div className="mt-5 mb-5">
          <PrayerList
            selectedMember={selectedMember}
            currentMember={currentMember}
            prayData={prayData}
          />
        </div>*/}

        {/* 
        <button
          onClick={() => handlePrayClick(prayCard)}
          className={`px-4 py-2 rounded w-full mt-4 ${
            hasPrayed ? "bg-gray-500 text-white" : "bg-green-500 text-white"
          }`}
          disabled={hasPrayed}
        >
          {hasPrayed ? "기도했습니다!" : "기도하기"}
        </button> 
        */}
      </div>
    </div>
  );
};

export default PrayCard;

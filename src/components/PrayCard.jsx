import { AiOutlineEdit, AiOutlineSave, AiOutlineClose } from "react-icons/ai";
import usePrayCard from "../hooks/usePrayCard";
import PrayerListDrawer from "./PrayerListDrawer";
import PrayerList from "./PrayerList";
import { useEffect } from "react";

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
    handleEditClick,
    handleSaveClick,
    handleChange,
    prayData,
    fetchPrayData,
  } = usePrayCard(currentMember.prayCards[0]);

  useEffect(() => {
    fetchPrayData(prayCard);
  }, [fetchPrayData, prayCard]);

  if (!isOpen) return null;
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
        <PrayerListDrawer currentMember={currentMember} />
        {/*<div className="mt-5 mb-5">
          <PrayerList
            selectedMember={selectedMember}
            currentMember={currentMember}
            prayData={prayData}
          />
        </div> */}

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

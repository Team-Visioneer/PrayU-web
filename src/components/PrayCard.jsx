import PrayerList from "./PrayerList";
import { AiOutlineEdit, AiOutlineSave, AiOutlineClose } from "react-icons/ai";
import usePrayCard from "../hooks/usePrayCard";

const PrayCard = ({
  isOpen,
  onClose,
  groupId,
  members,
  selectedMember,
  currentMember,
  prayCard,
  prayData,
}) => {
  const {
    isEditing,
    userInput,
    hasPrayed,
    setHasPrayed,
    handleEditClick,
    handleSaveClick,
    handleChange,
    handlePrayClick,
  } = usePrayCard(prayCard /*groupId, currentMember*/);
  console.log(">>prayCard", prayCard);
  console.log(">>prayData", prayData);

  //PrayData에 현재 유저가 오늘 이미 기도했는지 확인
  function checkPrayDataForToday(prayData, userId) {
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
  }
  // const hasPrayedToday = checkPrayDataForToday(prayData, currentMember.user_id);
  setHasPrayed(checkPrayDataForToday(prayData, currentMember.user_id));

  //   if (hasPrayedToday) {

  // setHasPrayed(true)
  //     console.log(" 이미 기도했다");
  //   } else {

  //     console.log("아직 안했다");
  //   }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-600 hover:text-gray-900"
        >
          <AiOutlineClose size={24} />
        </button>
        <div className="flex items-center mb-4">
          {selectedMember.avatar_url && (
            <img
              src={selectedMember.avatar_url}
              alt={`${selectedMember.full_name}'s avatar`}
              className="w-10 h-10 rounded-full mr-4"
            />
          )}
          <h2 className="text-xl font-bold">
            {selectedMember.full_name}의 기도제목
          </h2>
        </div>
        <div className="flex justify-between items-center mb-4">
          {isEditing && selectedMember.isCurrentUser ? (
            <textarea
              value={userInput}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          ) : (
            <p>{userInput}</p>
          )}
          {selectedMember.isCurrentUser &&
            (isEditing ? (
              <AiOutlineSave
                onClick={() => handleSaveClick(groupId, prayCard)}
                className="text-blue-500 cursor-pointer ml-2"
                size={24}
              />
            ) : (
              <AiOutlineEdit
                onClick={handleEditClick}
                className="text-blue-500 cursor-pointer ml-2"
                size={24}
              />
            ))}
        </div>
        <div className="mt-5 mb-5">
          <PrayerList
            members={members}
            selectedMember={selectedMember}
            currentMember={currentMember}
            prayData={prayData}
          />
        </div>
        <button
          onClick={() =>
            handlePrayClick(
              currentMember,
              prayCard,
              hasPrayed /* hasPrayedToday*/
            )
          }
          className={`px-4 py-2 rounded w-full mt-4 ${
            hasPrayed ? "bg-gray-500 text-white" : "bg-green-500 text-white"
          }`}
          disabled={hasPrayed}
        >
          {hasPrayed ? "기도했습니다!" : "기도하기"}
        </button>
      </div>
    </div>
  );
};

export default PrayCard;

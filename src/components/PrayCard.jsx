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
    handleEditClick,
    handleSaveClick,
    handleChange,
    handlePrayClick,
  } = usePrayCard(currentMember, prayCard, prayData);

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
          {selectedMember.profiles.avatar_url && (
            <img
              src={selectedMember.profiles.avatar_url}
              alt={`${selectedMember.profiles.full_name}'s avatar`}
              className="w-10 h-10 rounded-full mr-4"
            />
          )}
          <h2 className="text-xl font-bold">
            {selectedMember.profiles.full_name}의 기도제목
          </h2>
        </div>
        <div className="flex justify-between items-center mb-4">
          {isEditing && selectedMember.user_id == currentMember.user_id ? (
            <textarea
              value={userInput}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          ) : (
            <p>{userInput}</p>
          )}
          {selectedMember.user_id == currentMember.user_id &&
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
          onClick={() => handlePrayClick(prayCard)}
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

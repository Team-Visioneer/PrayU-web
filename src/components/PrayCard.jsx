import PrayerList from "./PrayerList";
import { AiOutlineEdit, AiOutlineSave, AiOutlineClose } from "react-icons/ai";
import usePrayCard from "../hooks/usePrayCard";

const PrayCard = ({ isOpen, onClose, member, groupId }) => {
  const lastestPrayCard = member.prayCards.at(-1);
  const {
    isEditing,
    userInput,
    hasPrayed,
    handleEditClick,
    handleSaveClick,
    handleChange,
    handlePrayClick,
  } = usePrayCard(lastestPrayCard);

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
          {member.avatar_url && (
            <img
              src={member.avatar_url}
              alt={`${member.full_name}'s avatar`}
              className="w-10 h-10 rounded-full mr-4"
            />
          )}
          <h2 className="text-xl font-bold">{member.full_name}의 기도제목</h2>
        </div>
        <div className="flex justify-between items-center mb-4">
          {isEditing && member.isCurrentUser ? (
            <textarea
              value={userInput}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          ) : (
            <p>{userInput}</p>
          )}
          {member.isCurrentUser &&
            (isEditing ? (
              <AiOutlineSave
                onClick={() => handleSaveClick(groupId, lastestPrayCard)}
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
        {member.isCurrentUser && (
          <div className="mt-5 mb-5">
            <PrayerList />
          </div>
        )}
        <button
          onClick={handlePrayClick}
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

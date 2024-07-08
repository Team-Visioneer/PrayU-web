import Profile from "./Profile";
import PrayCard from "./PrayCard";
import useMember from "../hooks/useMember";
import { useParams } from "react-router-dom";
import useGroup from "../hooks/useGroup";
import { ClipLoader } from "react-spinners"; // react-spinners에서 ClipLoader 가져오기

const Group = () => {
  const { groupId } = useParams();
  const { groupName } = useGroup(groupId);
  const {
    members,
    session,
    isModalOpen,
    openModal,
    closeModal,
    handleLogout,
    selectedMember,
    loading, // useMember 훅에서 로딩 상태 가져오기
  } = useMember();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={50} color={"#123abc"} loading={true} />
      </div>
    );
  }

  if (!session) {
    return <div className="">Login Please</div>;
  }

  const currentUser = members.find((member) => member.isCurrentUser);
  const otherMembers = members.filter((member) => !member.isCurrentUser);

  return (
    <div>
      <h3 className="text-center mt-10 text-3xl">{groupName} Group</h3>
      <div className="mt-10">
        <h1 className="">My</h1>
        {currentUser ? (
          <Profile
            onClick={() => openModal(currentUser)}
            name={currentUser.full_name}
            avatar_url={currentUser.avatar_url}
          />
        ) : (
          <div className="">No current user found</div>
        )}
      </div>
      <div className="mt-10">
        <h1 className="">Members: {otherMembers.length}</h1>
        <ul className="">
          {otherMembers.map((member) => (
            <Profile
              key={member.id}
              name={member.full_name}
              onClick={() => openModal(member)}
              avatar_url={member.avatar_url}
            />
          ))}
        </ul>
        <button onClick={handleLogout} className="bg-red-400 p-5">
          Logout
        </button>
      </div>
      {selectedMember && (
        <PrayCard
          isOpen={isModalOpen}
          onClose={closeModal}
          member={selectedMember}
          groupId="56e7b16b-7ba3-41b7-a850-fd4d0ce8d41e"
        />
      )}
    </div>
  );
};

export default Group;

import Profile from "./Profile";
import PrayCard from "./PrayCard";
import useMember from "../hooks/useMember";
import { useParams } from "react-router-dom";
import useGroup from "../hooks/useGroup";
import { ClipLoader } from "react-spinners";
//import useAuth from "../hooks/useAuth";

const Group = () => {
  //const { user } = useAuth();

  const { groupId } = useParams();
  const { groupName } = useGroup(groupId);
  const {
    members,
    prayCard,
    prayData,
    isModalOpen,
    openModal,
    closeModal,
    handleLogout,
    selectedMember,
    loading,
  } = useMember(groupId);

  const currentMember = members.find((member) => member.isCurrentUser);
  const otherMembers = members.filter((member) => !member.isCurrentUser);

  if (loading || !currentMember) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={50} color={"#123abc"} loading={true} />
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-center mt-10 text-3xl">Group: {groupName}</h3>
      <div className="mt-10">
        <h1 className="">My</h1>
        {currentMember ? (
          <Profile
            member={currentMember}
            onClick={() => openModal(currentMember, currentMember.prayCards[0])}
          />
        ) : (
          <div className="text-red-500">No current user found</div>
        )}
      </div>
      <div className="mt-10">
        <h1 className="">Members: {otherMembers.length}</h1>
        <ul className="">
          {otherMembers.map((member) => (
            <Profile
              key={member.id}
              member={member}
              onClick={() => openModal(member, member.prayCards[0])}
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
          groupId={groupId}
          members={members}
          selectedMember={selectedMember}
          currentMember={currentMember}
          prayCard={prayCard}
          prayData={prayData}
        />
      )}
    </div>
  );
};

export default Group;

import Profile from "../components/Profile";
import PrayCard from "../components/PrayCard";

const OtherProfiles = ({
  otherMembers,
  openModal,
  handleLogout,
  selectedMember,
  isModalOpen,
  closeModal,
  groupId,
  members,
  currentMember,
  prayCard,
  prayData,
}) => {
  return (
    <div>
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

export default OtherProfiles;

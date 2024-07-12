import useMember from "../hooks/useMember";
import { ClipLoader } from "react-spinners";
import MyProfile from "../components/MyProfile";
import OtherProfiles from "../components/OtherProfiles";
import CreatePrayCard from "./CreatePrayCard";

const Members = ({ groupId }) => {
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

  if (currentMember.prayCards[0]?.content) {
    return (
      <div>
        <MyProfile member={currentMember} openFunction={openModal} />
        <OtherProfiles
          otherMembers={otherMembers}
          openModal={openModal}
          handleLogout={handleLogout}
          selectedMember={selectedMember}
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          groupId={groupId}
          members={members}
          currentMember={currentMember}
          prayCard={prayCard}
          prayData={prayData}
        />
      </div>
    );
  } else {
    return <CreatePrayCard member={currentMember} />;
  }
};

export default Members;

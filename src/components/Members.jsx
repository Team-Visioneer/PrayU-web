import useMember from "../hooks/useMember";
import { ClipLoader } from "react-spinners";
import MyProfile from "../components/MyProfile";
import OtherProfiles from "../components/OtherProfiles";
import CreatePrayCard from "./CreatePrayCard";
import PrayDrawer from "./PrayDrawer";
import { useState } from "react";
import PrayCard from "../components/PrayCard";

const Members = ({ groupId }) => {
  const [prayDone, setPrayDone] = useState(false);
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

  const renderModal = () =>
    selectedMember && (
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
    );

  const renderContent = () => {
    if (currentMember.prayCards[0]?.content) {
      return (
        <>
          <MyProfile member={currentMember} openModal={openModal} />
          {prayDone ? (
            <OtherProfiles
              otherMembers={otherMembers}
              openModal={openModal}
              handleLogout={handleLogout}
            />
          ) : (
            <PrayDrawer otherMembers={otherMembers} setPrayDone={setPrayDone} />
          )}
          {renderModal()}
        </>
      );
    } else {
      return <CreatePrayCard member={currentMember} />;
    }
  };

  return <div>{renderContent()}</div>;
};

export default Members;

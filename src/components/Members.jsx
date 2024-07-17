import useMember from "../hooks/useMember";
import { ClipLoader } from "react-spinners";
import MyProfile from "../components/MyProfile";
import OtherProfiles from "../components/OtherProfiles";
import PrayDrawer from "./PrayDrawer";
import { useEffect, useState } from "react";
import PrayCard from "../components/PrayCard";
import PrayCardCreateForm from "./PrayCardCreateForm";

const Members = ({ currentUserId, groupId }) => {
  const [prayDone, setPrayDone] = useState(false);
  const {
    loading,
    members,
    currentMember,
    otherMembers,
    isModalOpen,
    openModal,
    closeModal,
    handleLogout,
    selectedMember,
    fetchMemberByGroupId,
    fetchGroupPrayCards,
  } = useMember();

  useEffect(() => {
    fetchMemberByGroupId(groupId);
  }, [fetchMemberByGroupId, groupId]);

  useEffect(() => {
    if (members) {
      fetchGroupPrayCards(currentUserId, groupId, members);
    }
  }, [fetchGroupPrayCards, currentUserId, groupId, members]);

  if (loading) {
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
        currentMember={currentMember}
        selectedMember={selectedMember}
        prayCard={selectedMember.prayCards[0]}
      />
    );

  const renderContent = () => {
    if (currentMember?.prayCards[0]?.content) {
      return (
        <>
          <MyProfile member={currentMember} openModal={openModal} />
          <div className="text-lg font-bold">
            Member({otherMembers.length + 1})
          </div>
          {prayDone ? (
            <OtherProfiles
              currentMember={currentMember}
              otherMembers={otherMembers}
              handleLogout={handleLogout}
            />
          ) : (
            <PrayDrawer otherMembers={otherMembers} setPrayDone={setPrayDone} />
          )}
          {renderModal()}
        </>
      );
    } else {
      return <PrayCardCreateForm member={currentMember} />;
    }
  };

  return <div>{renderContent()}</div>;
};

export default Members;

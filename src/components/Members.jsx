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
    restructedMembers,
    prayData,
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
      const userIds = members.map((member) => member.user_id);
      fetchGroupPrayCards(currentUserId, groupId, userIds, members);
    }
  }, [fetchGroupPrayCards, currentUserId, groupId, members]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={50} color={"#123abc"} loading={true} />
      </div>
    );
  }

  console.log("members", restructedMembers);
  const currentMember = restructedMembers.find(
    (member) => member.user_id === currentUserId
  );
  const otherMembers = restructedMembers.filter(
    (member) => member.user_id !== currentUserId
  );

  const renderModal = () =>
    selectedMember && (
      <PrayCard
        isOpen={isModalOpen}
        onClose={closeModal}
        groupId={groupId}
        members={restructedMembers}
        currentMember={currentMember}
        selectedMember={selectedMember}
        prayCard={selectedMember.prayCards[0]}
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
      return <PrayCardCreateForm member={currentMember} />;
    }
  };

  return <div>{renderContent()}</div>;
};

export default Members;

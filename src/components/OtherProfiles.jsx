import OtherPrayDrawer from "./OtherPrayDrawer";

const OtherProfiles = ({ currentMember, otherMembers }) => {
  return (
    <div>
      {otherMembers.map((member) => (
        <OtherPrayDrawer
          key={member.id}
          currentMember={currentMember}
          member={member}
        />
      ))}
    </div>
  );
};

export default OtherProfiles;

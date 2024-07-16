import OtherPrayDrawer from "./OtherPrayDrawer";

const OtherProfiles = ({ currentMember, otherMembers }) => {
  return (
    <div>
      <div className="mt-10">
        <h1 className="">Members: {otherMembers.length}</h1>
        <ul className="">
          {otherMembers.map((member) => (
            <OtherPrayDrawer
              key={member.id}
              currentMember={currentMember}
              member={member}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OtherProfiles;

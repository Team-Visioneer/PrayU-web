import Profile from "../components/Profile";
import MemberPrayDrawer from "./MemberPrayDrawer";

const OtherProfiles = ({ currentMember, otherMembers }) => {
  return (
    <div>
      <div className="mt-10">
        <h1 className="">Members: {otherMembers.length}</h1>
        <ul className="">
          {otherMembers.map((member) => (
            <MemberPrayDrawer
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

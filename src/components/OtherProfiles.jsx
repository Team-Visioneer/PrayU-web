import Profile from "../components/Profile";
import MemberPrayDrawer from "./MemberPrayDrawer";

const OtherProfiles = ({ otherMembers, openModal, handleLogout }) => {
  console.log(otherMembers);
  return (
    <div>
      <div className="mt-10">
        <h1 className="">Members: {otherMembers.length}</h1>
        <ul className="">
          {otherMembers.map((member) => (
            <MemberPrayDrawer
              key={member.id}
              member={member}
              openModal={() => openModal(member, member.prayCards[0])}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OtherProfiles;

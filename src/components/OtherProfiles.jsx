import Profile from "../components/Profile";

const OtherProfiles = ({ otherMembers, openModal, handleLogout }) => {
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
    </div>
  );
};

export default OtherProfiles;

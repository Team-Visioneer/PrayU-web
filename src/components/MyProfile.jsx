import Profile from "../components/Profile";

const MyProfile = ({ member, openFunction }) => {
  return (
    <div className="mt-10">
      <h1 className="">My</h1>
      {member ? (
        <Profile
          member={member}
          onClick={() => openFunction(member, member.prayCards[0])}
        />
      ) : (
        <div className="text-red-500">No current user found</div>
      )}
    </div>
  );
};

export default MyProfile;

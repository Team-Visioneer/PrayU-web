import Profile from "../components/Profile";

const MyProfile = ({ member, openModal }) => {
  return (
    <div className="mt-10 flex-col flex justify-center">
      <h1 className="">My</h1>
      {member ? (
        <div className="">
          <Profile
            member={member}
            onClick={() => openModal(member, member.prayCards[0])}
          />
        </div>
      ) : (
        <div className="text-red-500">No current user found</div>
      )}
    </div>
  );
};

export default MyProfile;

import Profile from "../components/Profile";

const MyProfile = ({ member, openModal }) => {
  return (
    <div className="mt-10 flex-col flex justify-center">
      <h1 className="">My</h1>
      {member ? (
        <Profile member={member} onClick={() => openModal(member)} />
      ) : (
        <div className="text-red-500">No current user found</div>
      )}
    </div>
  );
};

export default MyProfile;

import Profile from "../components/Profile";

const MyProfile = ({ member, openModal }) => {
  return (
    <div className="mt-10 flex-col flex justify-center gap-2">
      <div className="text-lg font-bold">내 기도제목</div>
      {member ? (
        <Profile member={member} onClick={() => openModal(member)} />
      ) : (
        <div className="text-red-500">No current user found</div>
      )}
    </div>
  );
};

export default MyProfile;

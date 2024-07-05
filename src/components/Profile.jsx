const Profile = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer bg-gray-800 p-4 rounded mb-2"
    >
      <h2 className="text-white">Profile</h2>
    </div>
  );
};

export default Profile;

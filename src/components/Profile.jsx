const Profile = ({ onClick, name, avatar_url }) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer bg-gray-800 p-4 rounded mb-2 flex items-center"
    >
      {avatar_url && (
        <img
          src={avatar_url}
          alt={`${name}'s avatar`}
          className="w-5 h-5 rounded-full mr-4"
        />
      )}
      <h2 className="text-white">{name}</h2>
    </div>
  );
};

export default Profile;

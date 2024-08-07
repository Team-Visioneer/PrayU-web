import { formatDateString } from "../utils";

const Profile = ({ member, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="flex flex-col gap-2 cursor-pointer bg-gray-800 p-4 rounded mb-2 "
    >
      <div className="flex items-center">
        <img
          src={member.profiles.avatar_url}
          alt={`${member.profiles.full_name}'s avatar`}
          className="w-5 h-5 rounded-full mr-4"
        />
        <h3 className="text-white">{member.profiles.full_name}</h3>
      </div>

      <div className="text-left text-sm text-gray-300">
        {member.prayCards[0]?.content || "아직 기도제목이 없어요"}
      </div>
      <div className="text-gray-500 text-left text-sm">
        {formatDateString(member.prayCards[0]?.updated_at) || "-"}
      </div>
    </div>
  );
};

export default Profile;

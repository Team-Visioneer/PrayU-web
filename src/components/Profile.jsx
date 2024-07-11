import { formatDateString } from "../utils";

const Profile = ({ member, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="flex flex-col gap-2 cursor-pointer bg-gray-800 p-4 rounded mb-2"
    >
      <div className="flex items-center">
        <img
          src={member.avatar_url}
          alt={`${member.name}'s avatar`}
          className="w-5 h-5 rounded-full mr-4"
        />
        <h3 className="text-white">{member.name}</h3>
      </div>

      <div className="text-white">
        {member.prayCards[0]?.content || "아직 기도제목이 없어요"}
      </div>
      <div className="text-gray-500">
        {formatDateString(member.prayCards[0]?.updated_at) || "-"}
      </div>
    </div>
  );
};

export default Profile;

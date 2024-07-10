import { getDayOfWeek } from "../utils";

const PrayerList = ({ members, selectedMember, currentMember, prayData }) => {
  const prayDataWithProfile = prayData.map((pray) => ({
    ...pray,
    member: members.find((member) => member.user_id === pray.user_id),
  }));

  return (
    <div className="flex bg-gray-500 text-white p-5 mt-10  gap-4">
      {selectedMember.isCurrentUser
        ? prayDataWithProfile.map((pray) => (
            <div
              key={pray.id}
              className="flex flex-col justify-center items-center gap-1"
            >
              <img
                src={pray.member.avatar_url}
                alt="avatar"
                className="w-10 h-10 rounded-full"
              />
              <div className="text-white text-xs">{pray.member.full_name}</div>
            </div>
          ))
        : prayDataWithProfile
            .filter((pray) => pray.user_id === currentMember.user_id)
            .map((pray) => (
              <div key={pray.id} className="text-white text-xs">
                <div>{getDayOfWeek(pray.created_at)}</div>
                <div>기도 완료</div>
              </div>
            ))}
    </div>
  );
};

export default PrayerList;

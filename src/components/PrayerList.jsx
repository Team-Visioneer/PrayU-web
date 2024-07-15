import { getDayOfWeek } from "../utils";

const PrayerList = ({ selectedMember, currentMember, prayData }) => {
  return (
    <div className="flex bg-gray-500 text-white p-5 mt-10  gap-4">
      {selectedMember.user_id === currentMember.user_id
        ? prayData.map((pray) => (
            <div
              key={pray.id}
              className="flex flex-col justify-center items-center gap-1"
            >
              <img
                src={pray.profiles.avatar_url}
                alt="avatar"
                className="w-10 h-10 rounded-full"
              />
              <div className="text-white text-xs">
                {pray.profiles.full_name}
              </div>
            </div>
          ))
        : prayData
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

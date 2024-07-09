const PrayerList = ({ members, prayData }) => {
  return (
    <div className="bg-gray-500 text-white p-5 mt-10">
      {prayData.map((pray) => (
        <div key={pray.id} className="bg-gray-800 p-4 rounded mb-2">
          <h2 className="text-white">
            {members.find((member) => member.user_id === pray.user_id)
              ?.full_name || "Unknown"}
          </h2>
        </div>
      ))}
    </div>
  );
};

export default PrayerList;

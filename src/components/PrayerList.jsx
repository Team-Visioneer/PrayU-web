const PrayerList = ({ prayData }) => {
  return (
    <div className="bg-gray-500 text-white p-5 mt-10">
      {prayData.map((pray) => (
        <div key={pray.id} className="bg-gray-800 p-4 rounded mb-2">
          <h2 className="text-white">{pray.user_id}</h2>
        </div>
      ))}
    </div>
  );
};

export default PrayerList;

import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import usePrayCard from "../hooks/usePrayCard";

const PrayCardCreateForm = ({ member }) => {
  const { prayerText, setPrayerText, handleCreatePrayCard } =
    usePrayCard(member);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen py-8">
      <div className="mb-4 text-center">
        <div className="mt-10">
          <h1>아직 기도제목이 없어요!</h1>
          <h1>기도제목을 작성해주세요</h1>
        </div>

        <Button className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
          지난주 기도 불러오기
        </Button>
      </div>
      <div className="flex items-center justify-center w-full">
        <Textarea
          className="w-4/5 h-96"
          placeholder="여기에 기도제목을 작성해주세요..."
          value={prayerText}
          onChange={(e) => setPrayerText(e.target.value)}
        />
      </div>
      <div className="mt-4 flex flex-col items-center justify-center text-center">
        <Button
          className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          onClick={() => handleCreatePrayCard(member.group_id)}
        >
          저장하고 기도하러 가기
        </Button>
      </div>
    </div>
  );
};

export default PrayCardCreateForm;

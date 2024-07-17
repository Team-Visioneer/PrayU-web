import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import usePrayCard from "../hooks/usePrayCard";

const PrayCardCreateForm = ({ member }) => {
  const { prayerText, setPrayerText, handleCreatePrayCard } =
    usePrayCard(member);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen mt-4 gap-4">
      <div className="w-full flex flex-col">
        <div className="text-lg font-bold">기도제목 작성 </div>
        <div className="text-sm text-gray-500">
          기도제목을 작성하면 그룹에 참여할 수 있어요
        </div>
      </div>
      <div className="flex items-center justify-center w-full">
        <Textarea
          className="h-48"
          placeholder="여기에 기도제목을 작성해주세요..."
          value={prayerText}
          onChange={(e) => setPrayerText(e.target.value)}
        />
      </div>
      <div className="mt-4 flex flex-col items-center justify-center text-center">
        <Button
          className="w-full bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => handleCreatePrayCard(member?.group_id)}
        >
          그룹 참여하기
        </Button>
      </div>
    </div>
  );
};

export default PrayCardCreateForm;

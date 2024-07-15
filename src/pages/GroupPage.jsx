import { useParams } from "react-router-dom";
import useGroup from "../hooks/useGroup";
import useAuth from "../hooks/useAuth";
import Members from "../components/Members";
import { Button } from "../components/ui/button";
import { shareToKakaotalk } from "../utils";
import { useEffect } from "react";

const GroupPage = () => {
  const { user } = useAuth();
  const { groupId } = useParams();
  const { groupName } = useGroup(groupId);
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.js";
    script.async = true;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  return (
    <div>
      <h3 className="text-center mt-10 text-3xl">Group: {groupName}</h3>
      <Button
        variant="kakao"
        size="sm"
        onClick={() => {
          shareToKakaotalk();
        }}
      >
        그룹 링크 공유하기
      </Button>
      <Members groupId={groupId} />
    </div>
  );
};

export default GroupPage;

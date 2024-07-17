import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import useGroup from "../hooks/useGroup";
import useAuth from "../hooks/useAuth";
import Members from "../components/Members";
import { Button } from "../components/ui/button";
import { shareToKakaotalk } from "../utils";

const GroupPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const { groupId: targetGroupId } = useParams();
  const { fetchGroupListbyUserId, getTargetGroup, groupList, targetGroup } =
    useGroup();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.js";
    script.async = true;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  useEffect(() => {
    fetchGroupListbyUserId(user.id);
    if (targetGroupId) getTargetGroup(targetGroupId);
  }, [fetchGroupListbyUserId, user.id, getTargetGroup, targetGroupId]);

  useEffect(() => {
    if (!targetGroupId && groupList) {
      if (groupList.length === 0) {
        navigate("/group/new");
        return;
      } else {
        navigate(`/group/${groupList[0].group.id}`);
        return;
      }
    }
  }, [groupList, navigate, targetGroupId]);

  if (!groupList || (targetGroupId && !targetGroup)) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={50} color={"#123abc"} loading={true} />
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-2 p-6">
      <div className="flex flex-col gap-2 mt-16 ">
        <div className="text-lg font-bold">{targetGroup?.name} 그룹</div>
      </div>
      <Button
        className=""
        variant="kakao"
        size="sm"
        onClick={() => {
          shareToKakaotalk(targetGroup?.id);
        }}
      >
        그룹 링크 공유하기
      </Button>
      <Members currentUserId={user.id} groupId={targetGroup?.id} />
    </div>
  );
};

export default GroupPage;

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
    <div>
      <h3 className="text-center mt-10 text-3xl">Group: {targetGroup?.name}</h3>
      <Button
        variant="kakao"
        size="sm"
        onClick={() => {
          shareToKakaotalk();
        }}
      >
        그룹 링크 공유하기
      </Button>
      {targetGroup && (
        <Members currentUserId={user.id} groupId={targetGroup.id} />
      )}
    </div>
  );
};

export default GroupPage;

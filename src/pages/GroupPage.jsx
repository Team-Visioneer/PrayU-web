import { useParams } from "react-router-dom";
import useGroup from "../hooks/useGroup";
import useAuth from "../hooks/useAuth";
import Members from "../components/Members";

const GroupPage = () => {
  const { user } = useAuth();
  const { groupId } = useParams();
  const { groupName } = useGroup(groupId);

  return (
    <div>
      <h3 className="text-center mt-10 text-3xl">Group: {groupName}</h3>
      <Members groupId={groupId} />
    </div>
  );
};

export default GroupPage;

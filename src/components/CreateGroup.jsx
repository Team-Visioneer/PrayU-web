import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supaClient";

const CreateGroup = () => {
  const [groupName, setGroupName] = useState("");
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  const handleCreateGroup = async () => {
    if (groupName.trim() === "") {
      alert("그룹 이름을 입력해주세요.");
      return;
    }

    const { data, error } = await supabase
      .from("group")
      .insert([{ user_id: userId, name: groupName, intro: "intro" }])
      .select();
    if (error) {
      console.error("Error creating group:", error);
      alert("그룹 생성에 실패했습니다.");
    } else {
      const groupId = data[0].id;
      const { data_member, error } = await supabase
        .from("member")
        .insert([{ user_id: userId, group_id: groupId, pray_summary: "" }]);
      if (error) {
        console.error("Error create member:", error);
      } else {
        console.log(data_member);
        // TODO: 여기서 group이 아니라 기도제목 작성페이지로 이동시켜야함.
        // navigate("/CreatePrayCard.jsx");
        navigate(`/group/${groupId}`);
      }
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session) {
        setUserId(session.user.id);
      }
    });
  }, []);

  return (
    <div>
      <h3 className="text-center text-5xl mt-10">그룹 생성하기</h3>
      <h1 className="text-center mt-10">아직 그룹이 없어요.</h1>
      <h1 className="text-center">첫 그룹을 생성해주세요!</h1>
      <div className="flex justify-center mt-10">
        <input
          type="text"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          placeholder="그룹 이름을 입력하세요"
          className="border rounded py-2 px-4"
        />
      </div>
      <div className="flex justify-center mt-5">
        <button
          onClick={handleCreateGroup}
          className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          그룹 생성하기
        </button>
      </div>
    </div>
  );
};

export default CreateGroup;

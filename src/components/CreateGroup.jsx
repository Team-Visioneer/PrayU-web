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
      .insert([{ user_id: userId, name: groupName, intro: "intro" }]); // TODO: intro를 넣는 것도 만들어?
    if (error) {
      console.error("Error creating group:", error);
      alert("그룹 생성에 실패했습니다.");
    } else {
      console.log("Group created:", data);
      // TODO: Group id 받아서 경로에 넣기
      navigate(`/`);
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

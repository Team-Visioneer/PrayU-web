import { supabase } from "../supaClient";
import { createMember } from "./member";

export async function fetchGroupsByUserId(userId) {
  // Fetch the groups where the user is a member
  const { data: memberData, error: memberError } = await supabase
    .from("member")
    .select("group_id")
    .eq("user_id", userId)
    .is("deleted_at", null);

  if (memberError) {
    console.error("Error fetching member data:", memberError);
    return [];
  }

  if (memberData.length === 0) {
    return [];
  }

  const groupIds = memberData.map((member) => member.group_id);

  // Fetch group details for the group IDs
  const { data: groupData, error: groupError } = await supabase
    .from("group")
    .select("*")
    .in("id", groupIds)
    .is("deleted_at", null);

  if (groupError) {
    console.error("Error fetching group data:", groupError);
    return [];
  }

  return groupData;
}

export async function createGroup(userId, groupName, groupIntro) {
  // 그룹 생성
  const { data: groupData, error: groupError } = await supabase
    .from("group")
    .insert([
      {
        user_id: userId,
        name: groupName,
        intro: groupIntro,
      },
    ])
    .select();

  if (groupError) {
    console.error("Error creating group:", groupError);
    return null;
  }

  const groupId = groupData[0].id;

  // 그룹 생성자가 자동으로 그룹의 멤버가 되도록 추가
  const memberData = createMember(userId, groupId);

  memberData
    .then((data) => {
      console.log("member created", data);
    })
    .catch((error) => {
      console.error("Error creating member:", error);
    });

  console.log("group created>>", groupData[0]);
  return groupData[0];
}

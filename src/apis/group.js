import { supabase } from "../supaClient";

export async function fetchGroupsByUserId(userId) {
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

  const groupData = await fetchGroupByGroupsId(groupIds);

  if (groupData.length === 0) {
    console.error("Error fetching group data:", groupData);
    return [];
  }

  return groupData;
}

export async function fetchGroupByGroupsId(groupIds) {
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

  return groupData[0];
}

export async function fetchGroupId(userId) {
  const { data, error } = await supabase
    .from("member")
    .select("group_id")
    .eq("user_id", userId)
    .is("deleted_at", null);

  if (error) {
    console.error("Error fetching group ID:", error);
    return null;
  }

  return data[0].group_id;
}

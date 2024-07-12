import { supabase } from "../supaClient";

export async function fetchGroupPrayCards(groupId, userIds) {
  const { data, error } = await supabase
    .from("pray_card")
    .select("*")
    .in("user_id", userIds)
    .eq("group_id", groupId)
    .is("deleted_at", null)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching pray cards:", error);
    return [];
  }

  return data;
}

export async function insertPrayCards(groupId, userInput) {
  const { data, error } = await supabase
    .from("pray_card")
    .insert({
      group_id: groupId,
      content: userInput,
    })
    .select();
  if (error) {
    console.error("Error Create Pray Cards:", error);
  }
  console.log(data);
  return data;
}

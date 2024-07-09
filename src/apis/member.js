import { supabase } from "../supaClient";
import { fetchProfiles } from "./profiles";
import { fetchPrayCards } from "./pray_card";

export function createMember(userId, groupId) {
  return supabase
    .from("member")
    .insert([
      {
        user_id: userId,
        group_id: groupId,
      },
    ])
    .select();
}

export async function fetchMembers(group_id) {
  const { data, error } = await supabase
    .from("member")
    .select("*")
    .eq("group_id", group_id)
    .is("deleted_at", null);

  if (error) {
    console.error("Error fetching members:", error);
    return [];
  }

  return data;
}

export async function fetchMemberByGroupId(group_id, currentUserId) {
  const members = await fetchMembers(group_id);
  const user_ids = members.map((member) => member.user_id);
  const profiles = await fetchProfiles(user_ids);
  const prayCards = await fetchPrayCards(user_ids);
  const userIdPrayCardHash = prayCards.reduce((acc, prayCard) => {
    const userId = prayCard.user_id;
    if (!acc[userId]) {
      acc[userId] = [];
    }
    acc[userId].push(prayCard);
    return acc;
  }, {});

  const membersWithProfiles = members.map((member) => ({
    ...member,
    full_name:
      profiles.find((profile) => profile.id === member.user_id)?.full_name ||
      "Unknown",
    avatar_url:
      profiles.find((profile) => profile.id === member.user_id)?.avatar_url ||
      "",
    isCurrentUser: member.user_id === currentUserId,
    prayCards: userIdPrayCardHash[member.user_id] || [],
  }));

  return membersWithProfiles;
}

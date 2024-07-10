import { supabase } from "../supaClient";
import { fetchProfiles } from "./profiles";
import { fetchPrayCards } from "./pray_card";

export async function createMember(userId, groupId) {
  const { data, error } = await supabase
    .from("member")
    .insert([
      {
        user_id: userId,
        group_id: groupId,
      },
    ])
    .select();

  if (error) {
    console.error("Error creating member:", error);
    return null;
  }

  return data;
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

export async function fetchMemberByGroupId(
  group_id,
  currentUserId,
  lastInsertTimeRef
) {
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

  const currentUserInMembers = members.some(
    (member) => member.user_id === currentUserId
  );

  if (!currentUserInMembers) {
    const now = Date.now();
    if (now - lastInsertTimeRef.current < 10000) {
      console.log("Insert prevented due to time limit");
      return;
    }
    lastInsertTimeRef.current = now;

    console.log("Current user not in members, adding to member table");

    const { error } = await supabase
      .from("member")
      .insert([{ user_id: currentUserId, group_id }]);

    if (error) {
      console.error("Error adding current user to members:", error);
      return;
    }
  }

  if (members.length === 0) {
    console.log("No members found for the group");
    return;
  }
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

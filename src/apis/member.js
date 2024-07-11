import { supabase } from "../supaClient";
import { fetchProfiles } from "./profiles";
import { fetchGroupPrayCards } from "./pray_card";

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
  groupId,
  currentUserId,
  lastInsertTimeRef
) {
  let members = await fetchMembers(groupId);
  const userIds = members.map((member) => member.user_id);
  const profiles = await fetchProfiles(userIds);
  const prayCards = await fetchGroupPrayCards(groupId, userIds);
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
      return;
    }
    lastInsertTimeRef.current = now;

    const { data, error } = await supabase
      .from("member")
      .insert([{ user_id: currentUserId, groupId }])
      .select();

    if (error) {
      console.error("Error adding current user to members:", error);
      return;
    }

    members = await fetchMembers(data[0].group_id);
    return members;
  }

  if (members.length === 0) {
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

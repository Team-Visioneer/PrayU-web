import { useState } from "react";
import { supabase } from "../supaClient";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

const useMember = () => {
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState(null);
  const [restructedMembers, setRestructedMembers] = useState(null);
  const [prayData, setPrayData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  const navigate = useNavigate();

  const fetchMemberByGroupId = useCallback(async (groupId) => {
    const { data, error } = await supabase
      .from("member")
      .select(`*, profiles (id, full_name, avatar_url)`)
      .eq("group_id", groupId);

    if (error) {
      console.error("Failed to fetch members:", error);
      return [];
    }

    setMembers(data);
    return data;
  }, []);

  // TODO: 유저별 최근 기도카드 하나씩만 가져오는 함수로 변경
  const fetchGroupPrayCards = useCallback(
    async (currentUserId, groupId, userIds, members) => {
      if (!userIds.includes(currentUserId)) {
        const { error } = await supabase.from("member").insert([
          {
            group_id: groupId,
            user_id: currentUserId,
          },
        ]);

        if (error) {
          console.error("Failed to create member:", error);
          return null;
        }
      }

      const { data, error } = await supabase
        .from("pray_card")
        .select("*")
        .eq("group_id", groupId)
        .in("user_id", userIds);

      if (error) {
        console.error("Error fetching pray cards:", error);
        return [];
      }

      const userIdPrayCardsHash = data.reduce((hash, prayCard) => {
        const userId = prayCard.user_id;
        if (!hash[userId]) {
          hash[userId] = [];
        }
        hash[userId].push(prayCard);
        return hash;
      }, {});

      const membersWithPrayCards = members.map((member) => ({
        ...member,
        prayCards: userIdPrayCardsHash[member.user_id] || [],
      }));
      setRestructedMembers(membersWithPrayCards);

      setLoading(false);
      return data;
    },
    []
  );

  const openModal = async (member, prayCard) => {
    if (!prayCard) {
      return [];
    }
    const { data, error } = await supabase
      .from("pray")
      .select(`*, profiles (id, full_name, avatar_url)`)
      .eq("pray_card_id", prayCard.id)
      .is("deleted_at", null);

    if (error) {
      console.error("Error fetching pray:", error);
      return [];
    }

    setPrayData(data);
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedMember(null);
    setIsModalOpen(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return {
    loading,
    members,
    restructedMembers,
    prayData,
    isModalOpen,
    openModal,
    closeModal,
    handleLogout,
    selectedMember,
    fetchMemberByGroupId,
    fetchGroupPrayCards,
  };
};

export default useMember;

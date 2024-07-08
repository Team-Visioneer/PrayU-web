import { useState, useEffect } from "react";
import { supabase } from "../supaClient";
import { useNavigate } from "react-router-dom";

const useMember = () => {
  const [members, setMembers] = useState([]);
  const [session, setSession] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchSession();
  }, []);

  const fetchSession = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    setSession(session);
    if (session) {
      fetchMemberByGroupId(
        "56e7b16b-7ba3-41b7-a850-fd4d0ce8d41e",
        session.user.id
      );
    }
  };

  async function fetchMembers(group_id) {
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

  async function fetchPrayCards(user_ids) {
    const { data, error } = await supabase
      .from("pray_card")
      .select("*")
      .in("user_id", user_ids)
      .is("deleted_at", null)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching pray cards:", error);
      return [];
    }

    return data;
  }

  async function fetchProfiles(user_ids) {
    const { data, error } = await supabase
      .from("profiles")
      .select("id, full_name, avatar_url")
      .in("id", user_ids);

    if (error) {
      console.error("Error fetching profiles:", error);
      return [];
    }

    return data;
  }

  async function fetchMemberByGroupId(group_id, currentUserId) {
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

    setMembers(membersWithProfiles);
  }

  const openModal = (member) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedMember(null);
    setIsModalOpen(false);
    //window.location.reload();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
    //window.location.reload();
  };

  return {
    members,
    session,
    isModalOpen,
    openModal,
    closeModal,
    handleLogout,
    selectedMember,
  };
};

export default useMember;

import { useState, useEffect, useCallback } from "react";
import { supabase } from "../supaClient";
import { useNavigate } from "react-router-dom";
import { fetchMemberByGroupId } from "../apis/member";

const useMember = (groupId) => {
  const [members, setMembers] = useState([]);
  const [prayCard, setPrayCard] = useState(null);
  const [prayData, setPrayData] = useState([]);
  const [session, setSession] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchSession = useCallback(async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    setSession(session);
    if (session) {
      const data = await fetchMemberByGroupId(groupId, session.user.id);
      setMembers(data);
    }
    setLoading(false);
  }, [groupId]);

  useEffect(() => {
    fetchSession();
  }, [fetchSession]);

  const fetchPrayData = async (prayCardId) => {
    const { data, error } = await supabase
      .from("pray")
      .select("*")
      .eq("pray_card_id", prayCardId)
      .is("deleted_at", null);

    if (error) {
      console.error("Error fetching pray:", error);
      return [];
    }

    return data;
  };

  const openModal = async (member, prayCard) => {
    const prayData = await fetchPrayData(prayCard.id);
    setPrayCard(prayCard);
    setPrayData(prayData);
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
    members,
    prayCard,
    prayData,
    session,
    isModalOpen,
    openModal,
    closeModal,
    handleLogout,
    selectedMember,
    loading,
  };
};

export default useMember;

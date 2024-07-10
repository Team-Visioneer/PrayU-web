import { useState, useEffect, useCallback } from "react";
import { supabase } from "../supaClient";
import { useNavigate } from "react-router-dom";
import { fetchMemberByGroupId } from "../apis/member";
import { fetchPrayData } from "../apis/pray";

const useMember = (groupId) => {
  const [members, setMembers] = useState([]);
  const [prayCard, setPrayCard] = useState(null);
  const [prayData, setPrayData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchSession = useCallback(async () => {
    console.log("fetchSession called");
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();
    if (session) {
      const data = await fetchMemberByGroupId(groupId, session.user.id);
      setMembers(data);
      console.log("Session found:", session);
      await fetchMemberByGroupId(groupId, session.user.id);
    } else {
      console.log("No session found");
      return navigate(`/Login/${groupId}`);
    }
    if (error) {
      console.log(error);
    }
    setLoading(false);
  }, [groupId]);

  useEffect(() => {
    fetchSession();
  }, [fetchSession, groupId]);

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
    isModalOpen,
    openModal,
    closeModal,
    handleLogout,
    selectedMember,
    loading,
  };
};

export default useMember;

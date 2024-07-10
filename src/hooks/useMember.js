import { useState, useEffect, useCallback, useRef } from "react";
import { supabase } from "../supaClient";
import { useNavigate } from "react-router-dom";
import { fetchMemberByGroupId } from "../apis/member";
import { fetchPrayData } from "../apis/pray";
import { fetchGroupId } from "../apis/group";

const useMember = (groupId) => {
  const [members, setMembers] = useState([]);
  const [prayCard, setPrayCard] = useState(null);
  const [prayData, setPrayData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const lastInsertTimeRef = useRef(0);

  const navigate = useNavigate();

  const fetchSession = useCallback(async () => {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();
    if (session) {
      if (groupId) {
        const members = await fetchMemberByGroupId(
          groupId,
          session.user.id,
          lastInsertTimeRef
        );
        console.log("members");
        console.log(members);
        setMembers(members);
      } else {
        const _groupId = await fetchGroupId(session.user.id);
        console.log(_groupId);
        return navigate(`/Group/${_groupId}`);
      }
    } else {
      console.log("No session found");
      return navigate(`/Login/${groupId}`);
    }
    if (error) {
      console.log(error);
    }
    setLoading(false);
  }, [groupId, members]);

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

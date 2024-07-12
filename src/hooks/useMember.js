import { useState, useEffect, useRef } from "react";
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

  const fetchSession = async (retry = true) => {
    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (error) {
        console.error("Error fetching session:", error);
        setLoading(false);
        return;
      }

      if (session) {
        if (groupId) {
          let members = await fetchMemberByGroupId(
            groupId,
            session.user.id,
            lastInsertTimeRef
          );

          if (!members || members.length === 0) {
            if (retry) {
              await fetchSession(false);
            } else {
              console.error("Failed to fetch members after retry.");
            }
          } else {
            setMembers(members);
          }
        } else {
          const _groupId = await fetchGroupId(session.user.id);
          return navigate(`/group/${_groupId}`);
        }
      } else {
        return navigate(`/login/${groupId}`);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSession();
  }, [groupId]);

  const openModal = async (member, prayCard) => {
    const prayData = await fetchPrayData(prayCard);
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

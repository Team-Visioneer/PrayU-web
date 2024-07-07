import { useState, useEffect } from "react";
import { supabase } from "../supaClient";

const useMember = () => {
  const [members, setMembers] = useState([]);
  const [session, setSession] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    fetchMember();
  }, []);

  async function fetchMember() {
    const { data } = await supabase.from("groups").select();
    setMembers(data);
  }

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  return {
    members,
    session,
    isModalOpen,
    openModal,
    closeModal,
    handleLogout,
  };
};

export default useMember;

import { useState, useEffect } from "react";
import Profile from "./Profile";
import PrayCard from "./PrayCard";
import { supabase } from "../supaClient";

const Group = () => {
  const [groups, setGroups] = useState([]);
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log(session);
      setSession(session);
    });
    getCountries();
  }, []);

  async function getCountries() {
    const { data } = await supabase.from("groups").select();
    setGroups(data);
  }
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  if (!session) {
    return <div className="text-white">Login Pease</div>;
  }

  return (
    <div>
      <h3 className="text-center text-white">Visioneer Group</h3>
      <div>
        <h1 className="text-white">My</h1>
        <Profile onClick={openModal} name="ME" />
      </div>
      <div className="mt-10">
        <h1 className="text-white">Members:{groups.length}</h1>
        <ul className="text-white">
          {groups.map((groups) => (
            <Profile key={groups.name} name={groups.name} onClick={openModal} />
          ))}
        </ul>
        <button onClick={handleLogout} className="bg-red-400 p-5">
          Logout
        </button>
      </div>
      <PrayCard isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default Group;

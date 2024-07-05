import { useState, useEffect } from "react";
import Profile from "./Profile";
import PrayCard from "./PrayCard";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPA_PROJECT_URL,
  import.meta.env.VITE_SUPA_ANON_KEY
);

const Group = () => {
  // Supabase test
  const [groups, setGroups] = useState([]);
  const [session, setSession] = useState(null);

  useEffect(() => {
    getCountries();

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    console.log(session);
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  //   useEffect(() => {
  //     getCountries();
  //   }, []);

  async function getCountries() {
    //console.log(supabase);
    const { data } = await supabase.from("groups").select();
    setGroups(data);
  }
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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
      </div>

      <PrayCard isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default Group;

import { useState } from "react";
import Profile from "./Profile";
import PrayCard from "./PrayCard";
const Group = () => {
  const memberNumber = 5;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <h3 className="text-center text-white">Visioneer Group</h3>
      <div>
        <h1 className="text-white">My</h1>
        <Profile onClick={openModal} />
      </div>
      <div className="mt-10">
        <h1 className="text-white">Members:{memberNumber}</h1>

        <Profile />
        <Profile />
        <Profile />
        <Profile />
        <Profile />
      </div>

      <PrayCard isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default Group;

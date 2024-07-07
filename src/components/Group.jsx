import Profile from "./Profile";
import PrayCard from "./PrayCard";
import useMember from "../hooks/useMember";

const Group = () => {
  const { members, session, isModalOpen, openModal, closeModal, handleLogout } =
    useMember();

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
        <h1 className="text-white">Members:{members.length}</h1>
        <ul className="text-white">
          {members.map((member) => (
            <Profile key={member.name} name={member.name} onClick={openModal} />
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

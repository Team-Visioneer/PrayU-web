import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();

  return (
    <>
      <div>
        <h3 className="text-center text-5xl mt-10">안녕하세요, PrayU입니다.</h3>
        <div className="flex justify-center">
          <button
            onClick={() => navigate("/Login")}
            className="mt-24 bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            지금 시작하기
          </button>
        </div>
        <h3 className="text-center text-white">안녕하세요, PrayU입니다.</h3>
      </div>
    </>
  );
};

export default Main;

import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  return (
    <>
      <div>
        <button
          onClick={() => navigate("/group")}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          로그인하기
        </button>
      </div>
    </>
  );
};

export default Login;

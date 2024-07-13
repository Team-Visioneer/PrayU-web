import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import ClipLoader from "react-spinners/ClipLoader";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={50} color={"#123abc"} loading={true} />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" state={{ from: location }} />; // 로그인되지 않은 경우 리다이렉트
  }

  return children; // 로그인된 경우 자식 컴포넌트 렌더링
};

export default PrivateRoute;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/AuthProvider";
import PrivateRoute from "./components/PrivateRoute";
import MainPage from "./pages/MainPage";
import GroupPage from "./pages/GroupPage";
import NotFound from "./components/NotFound";
import CreateGroup from "./components/CreateGroup";

const App = () => {
  return (
    <div className="w-screen h-screen">
      <div className="mx-auto max-w-[480px] ">
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<MainPage />}></Route>
              <Route
                path="/group/:groupId"
                element={
                  <PrivateRoute>
                    <GroupPage />
                  </PrivateRoute>
                }
              ></Route>
              <Route
                path="/group"
                element={
                  <PrivateRoute>
                    <GroupPage />
                  </PrivateRoute>
                }
              ></Route>
              <Route
                path="/group/new"
                element={
                  <PrivateRoute>
                    <CreateGroup />
                  </PrivateRoute>
                }
              ></Route>
              <Route path="*" element={<NotFound />}></Route>
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default App;

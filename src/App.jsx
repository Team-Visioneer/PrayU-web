import CreateGroup from "./components/CreateGroup";
import Group from "./components/Group";
import Login from "./components/Login";
import Main from "./components/Main";
import NotFound from "./components/NotFound";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/AuthProvider";
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <div className="App h-screen">
      <div className="mx-auto max-w-[600px] ">
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Main />}></Route>
              <Route path="/login/" element={<LoginPage />}></Route>
              <Route path="/login/:paramsGroupId" element={<Login />}></Route>
              <Route
                path="/group/:groupId"
                element={
                  <PrivateRoute>
                    <Group />
                  </PrivateRoute>
                }
              ></Route>
              <Route path="/group/" element={<Group />}></Route>
              <Route path="/group-create" element={<CreateGroup />}></Route>
              <Route path="*" element={<NotFound />}></Route>
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default App;

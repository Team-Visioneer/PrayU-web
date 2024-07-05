import Group from "./components/Group";
import Login from "./components/Login";
import Main from "./components/Main";
import NotFound from "./components/NotFound";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div className="App bg-red-50 h-screen">
      <div className="mx-auto max-w-[600px] bg-black mt-20">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />}></Route>
            <Route path="/login/" element={<Login />}></Route>
            <Route path="/group/" element={<Group />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default App;

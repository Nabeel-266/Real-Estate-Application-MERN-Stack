import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Import Pages & Components
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Team from "./pages/Team";
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import VerifyAccount from "./components/VerifyAccount";

const App = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);

  return (
    <div className="app relative overflow-hidden">
      <Router>
        <Header setIsOpenSidebar={setIsOpenSidebar} />
        <Sidebar
          isOpenSidebar={isOpenSidebar}
          setIsOpenSidebar={setIsOpenSidebar}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/account/" element={<Auth />}>
            <Route path="sign-in" element={<Signin />} />
            <Route path="sign-up" element={<Signup />} />
            <Route path="verification" element={<VerifyAccount />} />
          </Route>
          <Route path="/explore" element={<Explore />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/team" element={<Team />} />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="*"
            element={<h1 className="mt-[7rem]">Page not found</h1>}
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;

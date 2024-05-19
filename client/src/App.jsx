import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import Pages & Components
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Team from "./pages/Team";
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";
import Header from "./components/Header";
import Overlay from "./components/Overlay";
import Sidebar from "./components/Sidebar";

const App = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  return (
    <div className="app relative overflow-hidden">
      <Router>
        <Header setIsOpenSidebar={setIsOpenSidebar} />
        <Overlay
          isOpenSidebar={isOpenSidebar}
          setIsOpenSidebar={setIsOpenSidebar}
        />
        <Sidebar
          isOpenSidebar={isOpenSidebar}
          setIsOpenSidebar={setIsOpenSidebar}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<Auth />} />
          <Route path="/sign-up" element={<Auth />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/team" element={<Team />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;

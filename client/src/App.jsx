import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import Pages & Components
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";
import Team from "./pages/Team";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { useState } from "react";
import Overlay from "./components/Overlay";

const App = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  return (
    <div className="app relative">
      <Router>
        <Overlay isOpenSidebar={isOpenSidebar} />
        <Header setIsOpenSidebar={setIsOpenSidebar} />
        <Sidebar
          isOpenSidebar={isOpenSidebar}
          setIsOpenSidebar={setIsOpenSidebar}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/register" element={<Auth />} />
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

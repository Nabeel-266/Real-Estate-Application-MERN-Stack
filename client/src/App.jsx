import { useCallback, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkToken } from "./api/authAPIs";

// Import Protected Route Components
import {
  UnAuthProtectedRoute,
  VerifiedProtectedRoute,
} from "./secure/Protected_Route";

// Import Pages & Components
import { ToastContainer } from "react-toastify";
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
  const dispatch = useDispatch();
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);

  const memoizedCheckToken = useCallback(
    () => checkToken(dispatch),
    [dispatch]
  );

  useEffect(() => {
    memoizedCheckToken();
  }, [memoizedCheckToken]);

  return (
    <div className="app bg-white relative overflow-hidden">
      <Router>
        <Header setIsOpenSidebar={setIsOpenSidebar} />
        <Sidebar
          isOpenSidebar={isOpenSidebar}
          setIsOpenSidebar={setIsOpenSidebar}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/explore"
            element={
              <UnAuthProtectedRoute>
                <Explore />
              </UnAuthProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <UnAuthProtectedRoute>
                <Profile />
              </UnAuthProtectedRoute>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/team" element={<Team />} />

          <Route element={<Auth />}>
            <Route path="/account/sign-in" element={<Signin />} />
            <Route path="/account/sign-up" element={<Signup />} />
          </Route>

          <Route
            path="/account/verification"
            element={
              <VerifiedProtectedRoute>
                <VerifyAccount />
              </VerifiedProtectedRoute>
            }
          />

          <Route
            path="*"
            element={<h1 className="mt-[7rem]">Page not found</h1>}
          />
        </Routes>
      </Router>

      <ToastContainer />
    </div>
  );
};

export default App;

import { useCallback, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkToken } from "./api/authAPIs";

// Import Protected Route Components
import {
  AuthProtectedRoute,
  UnAuthProtectedRoute,
} from "./secure/Protected_Route";

// Import Pages & Components
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AddProperty from "./pages/AddProperty";
import ProfileDemo from "./pages/ProfileDemo";
import Auth from "./pages/Auth";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Signin from "./components/Authentication/Signin";
import Signup from "./components/Authentication/Signup";
import VerifyAccount from "./components/Authentication/VerifyAccount";
import User from "./pages/User";
import Profile from "./components/User/Profile";
import Account from "./components/User/Account";
import MyProperties from "./components/User/MyProperties";
import ForgotPassword from "./components/Authentication/ForgotPassword";
import NotFound from "./pages/NotFound";

const AppRoutes = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);

  // Check Header is shown or not?
  const routeLocation = location.pathname;
  const isHeaderShow =
    routeLocation !== "/account/sign-in" &&
    routeLocation !== "/account/sign-up" &&
    routeLocation !== "/account/verification" &&
    routeLocation !== "/account/forgot-password";

  // Check User Token Authorization
  const memoizedCheckToken = useCallback(
    () => checkToken(dispatch),
    [dispatch]
  );

  useEffect(() => {
    memoizedCheckToken();
  }, [memoizedCheckToken]);

  return (
    <div className="app bg-white relative overflow-hidden">
      {isHeaderShow && (
        <>
          <Header setIsOpenSidebar={setIsOpenSidebar} />
          <Sidebar
            isOpenSidebar={isOpenSidebar}
            setIsOpenSidebar={setIsOpenSidebar}
          />
        </>
      )}

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          element={
            <AuthProtectedRoute>
              <Auth />
            </AuthProtectedRoute>
          }
        >
          <Route path="/account/sign-in" element={<Signin />} />
          <Route path="/account/sign-up" element={<Signup />} />
          <Route path="/account/verification" element={<VerifyAccount />} />
          <Route path="/account/forgot-password" element={<ForgotPassword />} />
        </Route>

        <Route
          path="/user/"
          element={
            <UnAuthProtectedRoute>
              <User />
            </UnAuthProtectedRoute>
          }
        >
          <Route path="profile" element={<Profile />} />
          <Route path="account" element={<Account />} />
          <Route path="properties" element={<MyProperties />} />
        </Route>

        <Route path="/explore" element={<Explore />} />

        <Route
          path="/add-property"
          element={
            <UnAuthProtectedRoute>
              <AddProperty />
            </UnAuthProtectedRoute>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

const App = () => {
  return (
    <>
      <Router>
        <AppRoutes />
      </Router>

      <ToastContainer />
    </>
  );
};

export default App;

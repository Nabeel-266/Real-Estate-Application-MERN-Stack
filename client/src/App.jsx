import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { checkToken } from "./api/authAPIs";
import { ToastContainer } from "react-toastify";

// Import Protected Route Components
import {
  AuthProtectedRoute,
  UnAuthProtectedRoute,
} from "./secure/Protected_Route";

// Import Pages & Components
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AddProperty from "./pages/AddProperty";
import ProfileDemo from "./pages/ProfileDemo";
import Auth from "./pages/Auth";
import Signup from "./components/Authentication/Signup";
import Signin from "./components/Authentication/Signin";
import VerifyAccount from "./components/Authentication/VerifyAccount";
import ForgotPassword from "./components/Authentication/ForgotPassword";
import User from "./pages/User";
import Profile from "./components/User/Profile";
import Account from "./components/User/Account";
import MyProperties from "./components/User/MyProperties";
import NotFound from "./pages/NotFound";
import Property from "./pages/Property";
// For Admin Pages
import Admin from "./pages/Admin/Admin";
import Dashboard from "./pages/Admin/Panels/Dashboard";
import Properties from "./pages/Admin/Panels/Properties";
import Clients from "./pages/Admin/Panels/Clients";
import Agents from "./pages/Admin/Panels/Agents";
import Contacts from "./pages/Admin/Panels/Contacts";
import Reports from "./pages/Admin/Panels/Reports";
import Settings from "./pages/Admin/Panels/Settings";
import Listing from "./pages/Admin/Panels/Listing";
import AgentDetails from "./pages/Admin/Overviews/AgentDetails";

const ClientLayout = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);

  return (
    <>
      <Header setIsOpenSidebar={setIsOpenSidebar} />
      <Sidebar
        isOpenSidebar={isOpenSidebar}
        setIsOpenSidebar={setIsOpenSidebar}
      />
      <Outlet />
    </>
  );
};

// Routes Configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: <ClientLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/explore",
        element: <Explore />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/add-property",
        element: (
          <UnAuthProtectedRoute>
            <AddProperty />
          </UnAuthProtectedRoute>
        ),
      },
      {
        path: "/property/:propertyId",
        element: (
          <UnAuthProtectedRoute>
            <Property />
          </UnAuthProtectedRoute>
        ),
      },
      {
        element: (
          <UnAuthProtectedRoute>
            <User />
          </UnAuthProtectedRoute>
        ),
        children: [
          {
            path: "/user/profile",
            element: <Profile />,
          },
          {
            path: "/user/account",
            element: <Account />,
          },
          {
            path: "/user/property",
            element: <MyProperties />,
          },
        ],
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    element: (
      <AuthProtectedRoute>
        <Auth />
      </AuthProtectedRoute>
    ),
    children: [
      {
        path: "/account/sign-in",
        element: <Signin />,
      },
      {
        path: "/account/sign-up",
        element: <Signup />,
      },
      {
        path: "/account/verification",
        element: <VerifyAccount />,
      },
      {
        path: "/account/forgot-password",
        element: <ForgotPassword />,
      },
    ],
  },
  {
    // path: "/",
    element: <Admin />,
    children: [
      {
        path: "/admin/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/admin/agents",
        element: <Agents />,
      },
      {
        path: "/admin/properties",
        element: <Properties />,
      },
      {
        path: "/admin/clients",
        element: <Clients />,
      },
      {
        path: "/admin/listing",
        element: <Listing />,
      },
      {
        path: "/admin/contacts",
        element: <Contacts />,
      },
      {
        path: "/admin/reports",
        element: <Reports />,
      },
      {
        path: "/admin/settings",
        element: <Settings />,
      },
      {
        path: "/admin/agent/:agentId",
        element: <AgentDetails />,
      },
    ],
  },
]);

function App() {
  const dispatch = useDispatch();

  const memoizedCheckToken = useCallback(
    () => checkToken(dispatch),
    [dispatch]
  );

  useEffect(() => {
    memoizedCheckToken();
  }, [memoizedCheckToken]);

  return (
    <div className="app bg-white relative overflow-hidden">
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
}

export default App;

// const AppRoutes = () => {
//   const location = useLocation();
//   const dispatch = useDispatch();
//   const [isOpenSidebar, setIsOpenSidebar] = useState(false);

//   // Check Header is shown or not?
//   const routeLocation = location.pathname;
//   const isHeaderShow =
//     routeLocation !== "/account/sign-in" &&
//     routeLocation !== "/account/sign-up" &&
//     routeLocation !== "/account/verification" &&
//     routeLocation !== "/account/forgot-password";

//   // Check User Token Authorization
//   const memoizedCheckToken = useCallback(
//     () => checkToken(dispatch),
//     [dispatch]
//   );

//   useEffect(() => {
//     memoizedCheckToken();
//   }, [memoizedCheckToken]);

//   return (
//     <div className="app bg-white relative overflow-hidden">
//       {isHeaderShow && (
//         <>
//           <Header setIsOpenSidebar={setIsOpenSidebar} />
//           <Sidebar
//             isOpenSidebar={isOpenSidebar}
//             setIsOpenSidebar={setIsOpenSidebar}
//           />
//         </>
//       )}

//       <Routes>
//         <Route path="/" element={<Home />} />

//         <Route
//           element={
//             <AuthProtectedRoute>
//               <Auth />
//             </AuthProtectedRoute>
//           }
//         >
//           <Route path="/account/sign-in" element={<Signin />} />
//           <Route path="/account/sign-up" element={<Signup />} />
//           <Route path="/account/verification" element={<VerifyAccount />} />
//           <Route path="/account/forgot-password" element={<ForgotPassword />} />
//         </Route>

//         <Route
//           path="/user/"
//           element={
//             <UnAuthProtectedRoute>
//               <User />
//             </UnAuthProtectedRoute>
//           }
//         >
//           <Route path="profile" element={<Profile />} />
//           <Route path="account" element={<Account />} />
//           <Route path="property" element={<MyProperties />} />
//         </Route>

//         <Route path="/explore" element={<Explore />} />

//         <Route
//           path="/add-property"
//           element={
//             <UnAuthProtectedRoute>
//               <AddProperty />
//             </UnAuthProtectedRoute>
//           }
//         />
//         <Route path="/about" element={<About />} />
//         <Route path="/contact" element={<Contact />} />

//         <Route path="*" element={<NotFound />} />
//       </Routes>
//     </div>
//   );
// };

// const App = () => {
//   return (
//     <>
//       <Router>
//         <AppRoutes />
//       </Router>

//       <ToastContainer />
//     </>
//   );
// };

// export default App;

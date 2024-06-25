import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Import Components
import Signin from "../components/Signin";
import Signup from "../components/Signup";
import { AuthProtectedRoute } from "../secure/Protected_Route";
// import VerifyAccount from "../components/VerifyAccount";

const Auth = () => {
  const [isUserCredentialsGiven, setIsUserCredentialsGiven] = useState("");

  return (
    // bg-theme-blue
    <div className="authCont w-dvw h-dvh before:content-[''] before:absolute before:z-[-1] before:bottom-0 before:left-0 before:right-0 before:h-[100%] before:bg-gradient-to-b to-[#08283540] from-transparent scrollbar">
      <div className="authWrapper w-full h-full relative overflow-hidden">
        <AuthProtectedRoute>
          <Signin />
          <Signup />
        </AuthProtectedRoute>
      </div>
    </div>
  );
};

export default Auth;

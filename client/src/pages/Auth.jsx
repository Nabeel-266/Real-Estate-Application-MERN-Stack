import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Import Components
import Signin from "../components/Signin";
import Signup from "../components/Signup";
import VerifyAccount from "../components/VerifyAccount";

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const routeLocation = location.pathname
    .split("/")
    .filter((str) => str !== "");

  useEffect(() => {
    if (routeLocation[0] === "account" && routeLocation.length === 1) {
      navigate("/account/sign-in");
    }
  }, []);

  return (
    // bg-[#082835]
    <div className="authCont w-dvw h-dvh before:content-[''] before:absolute before:z-[-1] before:bottom-0 before:left-0 before:right-0 before:h-[100%] before:bg-gradient-to-b to-[#08283590] from-[#08283505] scrollbar">
      <div className="authWrapper w-full h-full relative overflow-hidden">
        <Signin />
        <Signup />
        <VerifyAccount />
      </div>
    </div>
  );
};

export default Auth;

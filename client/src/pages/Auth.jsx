// Import Components
import ForgotPassword from "../components/Authentication/ForgotPassword";
import Signin from "../components/Authentication/Signin";
import Signup from "../components/Authentication/Signup";
import VerifyAccount from "../components/Authentication/VerifyAccount";
import { VerifyProtectedRoute } from "../secure/Protected_Route";

const Auth = () => {
  return (
    <div className="authCont w-dvw h-dvh">
      <div className="authWrapper w-full h-full relative z-[1] overflow-hidden bg-auth-page-image bg-cover bg-no-repeat bg-center before:content-[''] before:absolute before:w-full before:h-full before:top-0 before:left-0 before:backdrop-blur-[0.3rem]">
        <Signup />
        <Signin />
        <ForgotPassword />
        <VerifyProtectedRoute>
          <VerifyAccount />
        </VerifyProtectedRoute>
      </div>
    </div>
  );
};

export default Auth;

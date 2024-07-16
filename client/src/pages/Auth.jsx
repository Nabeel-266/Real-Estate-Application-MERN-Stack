// Import Components
import Signin from "../components/Authentication/Signin";
import Signup from "../components/Authentication/Signup";
import VerifyAccount from "../components/Authentication/VerifyAccount";
import {
  AuthProtectedRoute,
  VerifyProtectedRoute,
} from "../secure/Protected_Route";

const Auth = () => {
  // before:bg-gradient-to-b to-[#082835] from-transparent
  return (
    <div className="authCont w-dvw h-dvh">
      <div className="authWrapper w-full h-full relative overflow-hidden bg-auth-page-image bg-cover bg-no-repeat">
        <AuthProtectedRoute>
          <Signin />
          <Signup />
          <VerifyProtectedRoute>
            <VerifyAccount />
          </VerifyProtectedRoute>
        </AuthProtectedRoute>
      </div>
    </div>
  );
};

export default Auth;

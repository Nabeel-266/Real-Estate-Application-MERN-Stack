// Import Components
import Signin from "../components/Signin";
import Signup from "../components/Signup";

const Auth = () => {
  return (
    // bg-[#082835]
    <div className="authCont w-dvw h-dvh overflow-auto before:content-[''] before:absolute before:z-[-1] before:bottom-0 before:left-0 before:right-0 before:h-[100%] before:bg-gradient-to-b to-[#08283590] from-[#08283505]">
      <div className="authWrapper w-full relative z-[1] min-h-full flex pt-[6rem]">
        <Signin />
        <Signup />
      </div>
    </div>
  );
};

export default Auth;

import { useDispatch } from "react-redux";
import {
  auth,
  GoogleAuthProvider,
  signInWithPopup,
} from "../../Firebase/config.js";
import { googleAuth } from "../../api/authAPIs.js";

// Import Asset
import GoogleIcon from "../../assets/google.png";

const GoogleOAuthBtn = () => {
  const dispatch = useDispatch();

  const googleOAuthHandler = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const { displayName, email, phoneNumber, photoURL } = result.user;

      // Username Modification
      const username = displayName
        .split(" ")
        .filter((str) => str !== "")
        .map(
          (str) =>
            str.trim().charAt(0).toLocaleUpperCase() +
            str.trim().slice(1).toLocaleLowerCase()
        )
        .join(" ");

      const userCredentials = {
        username,
        email,
        ...(phoneNumber && { mobileNumber: phoneNumber }),
        ...(photoURL && { profilePicture: photoURL }),
      };

      // Call User Google Auth API Function
      await googleAuth(userCredentials, dispatch);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("Google Authentication Error" + errorMessage);
    }
  };

  return (
    <button
      type="button"
      onClick={googleOAuthHandler}
      className={`w-full flex items-center justify-center gap-[1rem] py-[0.8rem] text-[2.1rem] font-semibold text-white bg-cyan-950 active:scale-[0.98] cursor-pointer rounded-full transition-all`}
    >
      <img src={GoogleIcon} alt="GoogleIcon" className="size-[2.5rem]" />
      Continue with Google
    </button>
  );
};

export default GoogleOAuthBtn;

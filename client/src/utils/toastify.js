import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const toastify = (type, message, position, theme, autoClose) => {
  // alert("toastify working");
  return toast[type](message, {
    position,
    autoClose,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme,
    transition: Bounce,
    className: "toast-message",
  });
};

export default toastify;

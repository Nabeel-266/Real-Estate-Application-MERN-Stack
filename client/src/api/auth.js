import axios from "axios";
import { SIGNUP } from "../constants/apisRoute";

// For SIGNUP
export const registerUser = async (formData) => {
  const { username, email, password, confirmPassword } = formData;

  const userFullname = username?.trim();

  const firstname =
    userFullname?.split(" ")[0].charAt(0).toLocaleUpperCase() +
    userFullname?.split(" ")[0].slice(1).toLocaleLowerCase();

  const lastname =
    userFullname?.split(" ")[1].charAt(0).toLocaleUpperCase() +
    userFullname?.split(" ")[1].slice(1).toLocaleLowerCase();

  const userCredentials = {
    username: `${firstname} ${lastname}`,
    email: email.trim(),
    password,
    confirmPassword,
  };

  const response = await axios.post(`${SIGNUP}`, userCredentials);
  return response.data;
};

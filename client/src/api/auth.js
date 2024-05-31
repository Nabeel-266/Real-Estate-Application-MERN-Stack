import axios from "axios";
import { SIGNUP } from "../constants/apisRoute";

// For SIGNUP
export const registerUser = async (formData) => {
  const response = await axios.post(`${SIGNUP}`, formData);
  return response.data;
};

import { v4 as uuidv4 } from "uuid";

// Generate a unique alphanumeric code of a given length
export const generateCode = (length) => {
  return uuidv4().slice(0, length);
};

// Generate a secure random alphanumeric password of a given length
export const generatePassword = (length) => {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
  return Array.from(
    { length },
    () => charset[Math.floor(Math.random() * charset.length)]
  ).join("");
};

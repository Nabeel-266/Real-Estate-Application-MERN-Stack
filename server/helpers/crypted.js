import pkg from "bcryptjs";
const { compareSync, hashSync, genSaltSync } = pkg;

//* --> Hash Code <--
export const encrypted = (value, count) => {
  const salt = genSaltSync(count);
  return hashSync(value, salt);
};

//* --> Compare Code <--
export const compare = (value, encryptedValue) => {
  return compareSync(value, encryptedValue);
};

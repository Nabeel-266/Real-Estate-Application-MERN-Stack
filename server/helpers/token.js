import pkg from "jsonwebtoken";
const { sign, verify } = pkg;
import dotenv from "dotenv";
dotenv.config();

import { StatusCodes } from "http-status-codes";
import resMessages from "../constants/responsesMessages.js";
import { sendError } from "../utils/responses.js";

export const generateToken = ({ data }) => {
  return sign({ result: data }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_TOKEN_EXPIRY,
  });
};

export const verifyToken = (token) => {
  return verify(token, process.env.JWT_SECRET_KEY);
};

export const validateToken = ({ token, key }) => {
  return verify(token, key);
};

export const tokenValidation = async (req, res, next) => {
  console.log(req.cookies?.token, "==> Request Cookies");
  console.log(req.body, "==> Request Body");

  // Get Token
  const token = req.cookies?.token;

  // If Token Not Found
  if (!token) {
    return res.status(StatusCodes.UNAUTHORIZED).send(
      sendError({
        statusCode: StatusCodes.UNAUTHORIZED,
        message: resMessages.UN_ACCESS_TOKEN,
      })
    );
  }

  // Verify Token
  const verifyToken = verify(token, process.env.JWT_SECRET_KEY);
  console.log(verifyToken, "====>>verifyToken");

  // If Error between Verify Token
  if (verifyToken.error)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(
      sendError({
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        message: "Failed to authenticate token.",
      })
    );

  // Req.User is eual to Verify Token Result
  req.user = verifyToken.result;
  next();
};

// export const checkToken = async (req, res, next) => {
//     let token;
//     const { authorization } = req.headers;
//     if (authorization && authorization.startsWith('Bearer')) {
//         try {
//             // Get Token from header
//             token = authorization.split(' ')[1];
//             // Verify Token
//             const { result } = verify(token, process.env.JWT_SECRET_KEY);
//             // Get User from Token
//             req.user = result;
//             next();
//         } catch (error) {
//             res.status(401).send({ status: 'failed', message: 'Unauthorized User' });
//         }
//     }
//     if (!token) {
//         console.log('no login user');
//         next();
//     }
// };

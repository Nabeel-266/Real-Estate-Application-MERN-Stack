import pkg from "jsonwebtoken";
const { sign, verify } = pkg;
import dotenv from "dotenv";
dotenv.config();

import { StatusCodes } from "http-status-codes";
import { sendError } from "../utils/responses.js";
import resMessages from "../constants/responsesMessages.js";

export const generateToken = ({ userId }) => {
  return sign({ result: userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_TOKEN_EXPIRY,
  });
};

export const generateTokenForLink = ({ userId }) => {
  return sign({ result: userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_LINK_TOKEN_EXPIRY,
  });
};

export const verifyToken = (token) => {
  return verify(token, process.env.JWT_SECRET_KEY);
};

// export const validateToken = ({ token, key }) => {
//   return verify(token, key);
// };

export const validateToken = async (req, res, next) => {
  console.log(req.cookies?.token, "==> Request Cookies");

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

  try {
    // Decoded Token
    const decoded = verifyToken(token);
    console.log(decoded, "====>> Decoded Token INFO");

    // Check Token Expiry
    const currentTime = Math.floor(Date.now() / 1000); // current time in seconds
    if (decoded.exp && decoded.exp < currentTime) {
      return res.status(StatusCodes.UNAUTHORIZED).send(
        sendError({
          statusCode: StatusCodes.UNAUTHORIZED,
          message: resMessages.TOKEN_EXPIRED,
        })
      );
    }

    // Req.User is equal to Verify Token Result ID
    req.user = decoded.result;
    req.tokenExp = decoded.exp;
    next();
  } catch (error) {
    // If Token is invalid
    return res.status(StatusCodes.UNAUTHORIZED).send(
      sendError({
        statusCode: StatusCodes.UNAUTHORIZED,
        message: resMessages.INVALID_TOKEN,
      })
    );
  }
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

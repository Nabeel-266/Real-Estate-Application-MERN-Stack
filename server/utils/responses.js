export const sendSuccess = ({ message, data, token, count = null }) => {
  if (token) {
    return {
      status: "Success",
      message,
      result: data,
      token,
    };
  } else if (count) {
    return {
      status: "Success",
      message,
      result: data,
      count,
    };
  } else {
    return {
      status: "Success",
      message,
      result: data,
    };
  }
};

export const sendError = ({ statusCode, message }) => {
  console.log(statusCode, message);

  return {
    statusCode,
    status: "Failed",
    message,
    result: null,
  };
};

// export const sendSuccess = ({ status, message, data, token, count = null }) => {
//   if (token) {
//     return {
//       status,
//       message,
//       token,
//       data,
//     };
//   } else if (count) {
//     return {
//       status,
//       message,
//       data,
//       count,
//     };
//   } else {
//     return {
//       status,
//       message,
//       data,
//     };
//   }
// };

// export const sendError = ({ status, message, error }) => {
//   console.log(status, message, error);
//   if (process.env.NODE_ENV === "production") {
//     return {
//       status,
//       message,
//       data: null,
//       errorCode: error,
//     };
//   }
//   return {
//     status,
//     message,
//     data: null,
//     stackTrace: error,
//   };
// };

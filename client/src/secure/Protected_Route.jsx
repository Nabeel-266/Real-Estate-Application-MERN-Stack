import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import toastify from "../utils/toastify";

export const AuthProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state?.user?.currentUser);
  if (user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export const UnAuthProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state?.user?.currentUser);
  if (!user) {
    toastify(
      "info",
      `Welcome to NAB Estate! Please LOGIN to your account`,
      "top-right",
      "dark",
      10000
    );
    return <Navigate to="/account/sign-in" replace />;
  }

  return <>{children}</>;
};

export const UnVerifiedProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state?.user?.currentUser);
  if (!user) {
    toastify(
      "info",
      `Welcome to NAB Estate! If you explore our properties, so please SIGNIN to your account`,
      "top-right",
      "dark",
      10000
    );
    return <Navigate to="/account/sign-in" replace />;
  }
  if (!user.isVerified) {
    toastify(
      "info",
      `Dear ${user.username}, Please! verify your account first`,
      "top-right",
      "dark",
      10000
    );
    return <Navigate to="/account/verification" replace />;
  }
  return <>{children}</>;
};

export const VerifyProtectedRoute = ({ children }) => {
  const userDoc = JSON.parse(localStorage.getItem("user_Doc"));
  const { currentUser } = useSelector((state) => state?.user);
  console.log(userDoc);

  if (!userDoc) {
    return <Navigate to="/account/sign-up" replace />;
  }

  if (currentUser) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

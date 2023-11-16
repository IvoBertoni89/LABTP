import { authenticateUser, getUserInfo } from "../api/login.api";
import { useState } from "react";

export const useLogin = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async ({ email, password }) => {
    setIsLoading(true);
    try {
      const authenticationToken = await authenticateUser({ email, password });
      localStorage.setItem("bearerToken", authenticationToken);
      setUser({ email });
      const response = await getUserInfo(authenticationToken, email);
      localStorage.setItem("user", JSON.stringify(response));
    } catch (error) {
      console.error("Error authenticating user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { user, isLoading, login };
};
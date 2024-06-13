/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "../libs/api";
import { LoadingProgress } from "../components/Loading";
import Cookies from "js-cookie";
export const INITIAL_USER = {
  _id: "",
  username: "",
  email: "",
  bio: "",
  profileImage: "",
  coverImage: "",
};

const AuthContext = createContext({
  user: INITIAL_USER,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
});
export default function AuthProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(INITIAL_USER);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuth = async () => {
    setIsLoading(true);
    try {
      const { data } = await getCurrentUser();
      if (data) {
        const { _id, username, email, profileImage, coverImage, bio } =
          data.payload.user;
        setUser({
          _id,
          username,
          email,
          bio,
          profileImage,
          coverImage,
        });
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const userCookie = Cookies.get("user");
    const _user = userCookie ? JSON.parse(userCookie) : null;
    const _token = Cookies.get("token");

    if (_token && _user) {
      setUser(_user);
      setIsAuthenticated(true);
      return;
    }
    checkAuth();
  }, []);

  const value = { user, isAuthenticated, setUser, setIsAuthenticated };

  return (
    <AuthContext.Provider value={value}>
      {isLoading ? <LoadingProgress /> : children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be wrapped under AuthProvider");
  }
  return context;
};

import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken"),
  );
  const [refreshToken, setRefreshToken] = useState(
    localStorage.getItem("refreshToken"),
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const login = async (email, password) => {
    try {
      setLoading(true);
      setErrorMessage("");

      const response = await axios.post(`${apiUrl}/api/v1/auth/login`, {
        email,
        password,
      });

      setAccessToken(response.data.accessToken);
      setRefreshToken(response.data.refreshToken);
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
    } catch (error) {
      console.error(error);
      setErrorMessage(error?.response?.data?.message || "Server Error");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setAccessToken(null);
    setRefreshToken(null);
    setUser(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/v1/users/profile`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        setUser(response?.data);
        localStorage.setItem("user", JSON.stringify(response?.data));
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, [apiUrl, accessToken]);

  useEffect(() => {
    const interval = setInterval(() => {
      const getRefreshToken = async () => {
        try {
          const response = await axios.post(
            `${apiUrl}/api/v1/auth/refreshToken`,
            {
              refreshToken,
            },
          );
          setAccessToken(response.data.accessToken);
          setRefreshToken(response.data.refreshToken);
          localStorage.setItem("accessToken", response.data.accessToken);
          localStorage.setItem("refreshToken", response.data.refreshToken);
        } catch (error) {
          console.error(error);
          setAccessToken(null);
          setRefreshToken(null);
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("user");
        }
      };

      getRefreshToken();
    }, 5 * 60 * 1000); // Refresh every 5 minutes

    return () => clearInterval(interval);
  }, [apiUrl, refreshToken]);

  const contextValue = {
    user,
    accessToken,
    login,
    logout,
    loading,
    errorMessage,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};

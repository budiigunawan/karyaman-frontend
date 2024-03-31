import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${apiUrl}/api/v1/auth/login`, {
        email,
        password,
      });
      setAccessToken(response.accessToken);
      setRefreshToken(response.refreshToken);
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    setAccessToken(null);
    setRefreshToken(null);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/v1/users/profile`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setUser(response.data);
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
          setAccessToken(response.accessToken);
          setRefreshToken(response.refreshToken);
        } catch (error) {
          console.error(error);
          setUser(null);
        }
      };

      getRefreshToken();
    }, 60 * 60 * 1000); // Refresh every 60 minutes

    return () => clearInterval(interval);
  }, [apiUrl, refreshToken]);

  const contextValue = {
    accessToken,
    user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};

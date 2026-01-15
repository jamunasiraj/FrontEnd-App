import { createContext, useState } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => sessionStorage.getItem("tfl_token"));
  const [user, setUser] = useState(() => {
    const storedUser = sessionStorage.getItem("tfl_user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    sessionStorage.setItem("tfl_token", authToken);
    sessionStorage.setItem("tfl_user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    sessionStorage.removeItem("tfl_token");
    sessionStorage.removeItem("tfl_user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isAuthenticated: !!user,
        isBusiness: user?.role === "BUSINESS",
        isConsumer: user?.role === "CONSUMER",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

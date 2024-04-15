import React, { createContext, useContext, useState } from "react";

// Creating the context
const UserContext = createContext(null);

// Exporting the context provider
export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState("");

  return (
    <UserContext.Provider value={{ username, setUsername }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook to use the context
export const useUser = () => useContext(UserContext);

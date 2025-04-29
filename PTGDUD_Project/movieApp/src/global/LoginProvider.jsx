import { useState } from "react";
import { LoginContext } from "./LoginContext";
export const LoginProvider = ({ children }) => {
  const [user, setUser] = useState({});
  return (
    <LoginContext.Provider value={{ user, setUser }}>
      {children}
    </LoginContext.Provider>
  );
};

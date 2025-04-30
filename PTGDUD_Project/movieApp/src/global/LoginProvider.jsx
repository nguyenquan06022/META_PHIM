import { useState, useEffect } from "react";
import { LoginContext } from "./LoginContext";
import axios from "axios";

export const LoginProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Gọi API để lấy user hiện tại từ server
    axios
      .get("http://localhost:3000/getCurrentUser", { withCredentials: true })
      .then((res) => {
        setUser(res.data.user);
      })
      .catch((err) => {
        console.log(
          "Không lấy được thông tin người dùng:",
          err.response?.data?.message || err.message
        );
        setUser(null); // Không có user
      });
  }, []);

  return (
    <LoginContext.Provider value={{ user, setUser }}>
      {children}
    </LoginContext.Provider>
  );
};

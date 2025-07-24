import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const UserContext = createContext<any>(null);

export const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch the authenticated user when app loads
    const fetchUser = async () => {
      try {
        const res = await axios.get("https://anansesem.onrender.com/api/v1/profile", {
          withCredentials: true, 
        });
        setUser(res.data.user); 
      } catch (err) {
        console.log("User not logged in:",);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

// import { createContext, useContext, useEffect, useState } from "react";
// import axios from "axios";

// const UserContext = createContext<any>(null);

// export const UserProvider = ({ children }: any) => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     // Fetch the authenticated user when app loads
//     const fetchUser = async () => {
//       try {
//         const res = await axios.get("http://192.168.100.25:3001/api/profiles/", {
//           withCredentials: true, // Ensure cookies/session are sent
//         });
//         setUser(res.data.user); // assumes { user: { name, email, ... } }
//       } catch (err) {
//         console.log("User not logged in:",);
//       }
//     };

//     fetchUser();
//   }, []);

//   return (
//     <UserContext.Provider value={{ user, setUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useUser = () => useContext(UserContext);

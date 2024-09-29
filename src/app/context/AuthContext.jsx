"use client";

import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // next/navigation for route management

// Create the AuthContext
export const AuthContext = createContext();


// AuthProvider component to wrap the app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);  // To store user data
  const [token, setToken] = useState(null);  // To store JWT token
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetch the user and token from sessionStorage on initial load
  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("user"));
    const storedToken = sessionStorage.getItem("jwt");

    if (storedUser && storedToken) {
      setUser(storedUser);
      setToken(storedToken);
    }

    setLoading(false); // Set loading to false once the user data is fetched
  }, []);

  // Login function
  const login = (userData, tokenData) => {
    sessionStorage.setItem("user", JSON.stringify(userData));
    sessionStorage.setItem("jwt", tokenData);
    setUser(userData);
    setToken(tokenData);
    console.log("userData", userData, "token", token);

    // Trigger a redirect to home or profile page after login
    router.push("/");
  };

  // Logout function
  const logout = () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("jwt");
    setUser(null);
    setToken(null);

    // Redirect to login page after logging out
    router.push("/sign-in");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};









// "use client";

// import { createContext, useState, useEffect } from "react";
// import { useRouter } from "next/navigation"; 

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

//   useEffect(() => {
//     const storedUser = JSON.parse(sessionStorage.getItem("user"));
//     const storedToken = sessionStorage.getItem("jwt");

//     if (storedUser && storedToken) {
//       setUser(storedUser);
//       setToken(storedToken);
//     }
//     setLoading(false);
//   }, []);

//   const login = (userData, tokenData) => {
//     sessionStorage.setItem("user", JSON.stringify(userData));
//     sessionStorage.setItem("jwt", tokenData);
//     setUser(userData);
//     setToken(tokenData);

//     // Trigger a custom login event for components to listen for
//     const loginEvent = new Event("loginSuccess");
//     window.dispatchEvent(loginEvent);

//     router.push("/");
//   };

//   const logout = () => {
//     sessionStorage.removeItem("user");
//     sessionStorage.removeItem("jwt");
//     setUser(null);
//     setToken(null);

//     // Optionally, trigger a logout event if needed
//     router.push("/sign-in");
//   };

//   return (
//     <AuthContext.Provider value={{ user, token, login, logout, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };



/////////////////////////////////////////////////////////////////////////
// src/app/context/AuthContext.jsx

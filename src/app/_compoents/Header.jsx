"use client";

import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AuthContext, useAuthContext } from "../_context/AuthContext";
import GlobalAPI from "../_utils/GlobalAPI"; // Import the API functions
import { useRouter } from 'next/navigation'; 



export default function Header() {

  const router = useRouter();


  const {token, setToken} = useAuthContext();
  // const { user, logout, token, loading } = useContext(AuthContext);
  
  const [hasCompany, setHasCompany] = useState(false);
  
  const user = JSON.parse(sessionStorage.getItem("user"));
  // console.log("user", user, "token", token);
  useEffect(() => {
    // Check if the logged-in user has a registered company

    const checkCompany = async () => {
      // debugger
      if (user && token) {
        try {
          const response = await GlobalAPI.getUserCompany(user.id, token);
          // console.log("COMPANY-------->", company.id);
          const companyResponse = response.company.id;
          
          setHasCompany(!!companyResponse); // Set true if company exists, false otherwise
          
        } catch (error) {
          console.error("Error checking company:", error);
        }
      }
    };
    checkCompany();
  }, [token]);
  
  const logout = () => {
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("jwt");
        // setUser(null);
        setToken(null);
    
        // Redirect to login page after logging out
        router.push("/sign-in");
      };
    
  
  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  return (

    <header>
      <div className="container flex items-center justify-between my-4 mx-auto">
        <Link href={"/"} className="font-bold text-lg">
          Job Board
        </Link>
        <nav className="flex gap-4 px-2 py-3 rounded-md">
          {!token ? (
            <Link href={"/sign-in"}>
              <Button>Login</Button>
            </Link>
          ) : (
            <>
              <h1>Welcome, {user.username ? user.username : "User"}!</h1>
              <Link href="/update-profile">
                <Button>Update Profile</Button>
              </Link>

              <Link href="/applied-jobs">
                <Button>Applied Jobs</Button>
              </Link>

              {/* Conditionally display the Add Job button */}
              {hasCompany ? (
                <>
                <Link href="/add-job">
                  <Button>Add Job</Button>
                </Link>
                <Link href="/added-jobs">
                  <Button>Added Jobs</Button>
                </Link>
                </>
              ) : (
                <Link href="/register-company">
                  <Button>Register Company</Button>
                </Link>
              )}
              <Button onClick={logout}>Logout</Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}



/////////////////////////////////////////////////////////////////////////////////////
// "use client";

// import { useContext, useEffect, useState } from "react";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { AuthContext, useAuthContext } from "../_context/AuthContext";
// import GlobalAPI from "../_utils/GlobalAPI"; // Import the API functions
// import { useRouter } from 'next/navigation'; 



// export default function Header() {

//   const router = useRouter();


//   const {token, setToken} = useAuthContext();
//   // const { user, logout, token, loading } = useContext(AuthContext);
  
//   const [hasCompany, setHasCompany] = useState(false);
//   // console.log("user", user, "token", token);
  
//   const user = JSON.parse(sessionStorage.getItem("user"));
//   useEffect(() => {
//     // Check if the logged-in user has a registered company

//     const checkCompany = async () => {

//       if (user && token) {
//         try {
//           const company = await GlobalAPI.getUserCompany(user.id, token);
//           console.log("COMPANY-------->", company);
          
//           setHasCompany(!!company); // Set true if company exists, false otherwise
          
//         } catch (error) {
//           console.error("Error checking company:", error);
//         }
//       }
//     };
//     checkCompany();
//   }, [token]);
  
//   const logout = () => {
//         sessionStorage.removeItem("user");
//         sessionStorage.removeItem("jwt");
//         // setUser(null);
//         setToken(null);
    
//         // Redirect to login page after logging out
//         router.push("/sign-in");
//       };
    
  
//   // if (loading) {
//   //   return <div>Loading...</div>;
//   // }

//   return (

//     <header>
//       <div className="container flex items-center justify-between my-4 mx-auto">
//         <Link href={"/"} className="font-bold text-lg">
//           Job Board
//         </Link>
//         <nav className="flex gap-4 px-2 py-3 rounded-md">
//           {!token ? (
//             <Link href={"/sign-in"}>
//               <Button>Login</Button>
//             </Link>
//           ) : (
//             <>
//               <h1>Welcome, {user.username ? user.username : "User"}!</h1>
//               <Link href="/update-profile">
//                 <Button>Update Profile</Button>
//               </Link>

//               <Link href="/applied-jobs">
//                 <Button>Applied Jobs</Button>
//               </Link>

//               {/* Conditionally display the Add Job button */}
//               {hasCompany ? (
//                 <>
//                 <Link href="/add-job">
//                   <Button>Add Job</Button>
//                 </Link>
//                 <Link>
//                   <Button>Added Jobs</Button>
//                 </Link>
//                 </>
//               ) : (
//                 <Link href="/register-company">
//                   <Button>Register Company</Button>
//                 </Link>
//               )}

//               <Button onClick={logout}>Logout</Button>
//             </>
//           )}
//         </nav>
//       </div>
//     </header>
//   );
// }




////////////////////////////////////////////////////////////////////////////////////////////////////
// "use client";

// import { useContext } from "react";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { AuthContext } from "../context/AuthContext";

// export default function Header() {
//   const { user, logout, loading } = useContext(AuthContext);

//   // Display nothing if the app is loading (you can customize this)
//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <header>
//       <div className="container flex items-center justify-between my-4 mx-auto">
//         <Link href={"/"} className="font-bold text-lg">
//           Job Board
//         </Link>
//         <nav className="flex gap-4 px-2 py-3 rounded-md">
//           {!user ? (
//             <Link href={"/sign-in"}>
//               <Button>Login</Button>
//             </Link>
//           ) : (
//             <>
//               <h1>Welcome, {user.username ? user.username : "User"}!</h1>
//               <Link href="/update-profile">
//                 <Button>Update Profile</Button>
//               </Link>

//               <Link href="/applied-jobs">
//                 <Button>Applied Jobs</Button>
//               </Link>

//               <Button onClick={logout}>Logout</Button>
//             </>
//           )}
//         </nav>
//       </div>
//     </header>
//   );
// }






//////////////////////////////////////////////////////////////////////////////////////
// "use client";

// import { useContext, useState, useEffect } from "react";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { AuthContext } from "../context/AuthContext";

// export default function Header() {
//   const { user, logout, loading } = useContext(AuthContext);
//   const [updated, setUpdated] = useState(false);  // Extra state to force re-render


//   useEffect(() => {
//     // Listen for the custom login success event and re-render
//     const handleLoginSuccess = () => {
//       // Trigger a re-render by updating the state indirectly
//       setUpdated(!updated);  // Toggle state to trigger re-render
//       console.log("Login success detected, updating UI...");
//     };

//     window.addEventListener("loginSuccess", handleLoginSuccess);

//     // Cleanup listener on component unmount
//     return () => {
//       window.removeEventListener("loginSuccess", handleLoginSuccess);
//     };
//   }, [updated]);

//   if (loading) {
//     return null; // Prevent rendering until loading is complete
//   }

//   return (
//     <header>
//       <div className="container flex items-center justify-between my-4 mx-auto">
//         <Link href={"/"} className="font-bold text-lg">
//           Job Board
//         </Link>
//         <nav className="flex gap-4 px-2 py-3 rounded-md">
//           {!user ? (
//             <Link href={"/sign-in"}>
//               <Button>Login</Button>
//             </Link>
//           ) : (
//             <>
//               <h1>Welcome, {user.username ? user.username : "User"}!</h1>
//               <Link href="/update-profile">
//                 <Button>Update Profile</Button>
//               </Link>
//               <Button onClick={logout}>Logout</Button>
//             </>
//           )}
//         </nav>
//       </div>
//     </header>
//   );
// }



/////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////
// "use client";
// import { useContext } from "react";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { AuthContext} from "../context/AuthContext"; // Import the AuthContext

// export default function Header() {
//   const { isLogin, userName, handleLogout } = useContext(AuthContext); // Access the context values

//   return (
//     <header>
//       <div className="container flex items-center justify-between my-4 mx-auto">
//         <Link href={"/"} className="font-bold text-lg">
//           Job Board
//         </Link>
//         <nav className="flex gap-4 px-2 py-3 rounded-md">
//           {!isLogin ? (
//             <Link href={"/sign-in"}>
//               <Button>Login</Button>
//             </Link>
//           ) : (
//             <>
//               <h1>Welcome, {userName ? userName : "User"}!</h1>
//               <Link href="/update-profile">
//                 <Button>Update Profile</Button>
//               </Link>
//               <Button onClick={handleLogout}>Logout</Button>
//             </>
//           )}
//         </nav>
//       </div>
//     </header>
//   );
// }




///////////////////////////////////////////////////////////////////////

// "use client";
// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";


// export default function Header() {
//   const [isLogin, setIsLogin] = useState(false);
//   const [userName, setUserName] = useState("");

//   useEffect(() => {
//     const token = sessionStorage.getItem("jwt");
//     const user = JSON.parse(sessionStorage.getItem("user"));
//     setIsLogin(token !== null);
//     if (user) {
//       setUserName(user.username);
//     }

//     // Listen for the custom login success event
//     const handleLoginSuccess = () => {
//       const updatedToken = sessionStorage.getItem("jwt");
//       const updatedUser = JSON.parse(sessionStorage.getItem("user"));
//       setIsLogin(updatedToken !== null);
//       if (updatedUser) {
//         setUserName(updatedUser.username);
//       }
//     };

//     window.addEventListener("loginSuccess", handleLoginSuccess);

//     // Cleanup listener on component unmount
//     return () => {
//       window.removeEventListener("loginSuccess", handleLoginSuccess);
//     };
//   }, []);

//   const handleLogout = () => {
//     sessionStorage.removeItem("jwt");
//     sessionStorage.removeItem("user");
//     setIsLogin(false);
//     window.location.reload();
//   };

//   return (
//     <header>
//       <div className="container flex items-center justify-between my-4 mx-auto">
//         <Link href={"/"} className="font-bold text-lg">
//           Job Board
//         </Link>
//         <nav className="flex gap-4 px-2 py-3 rounded-md">
//           {!isLogin ? (
//             <Link href={"/sign-in"}>
//               <Button>Login</Button>
//             </Link>
//           ) : (
//             <>
//               <h1>Welcome, {userName ? userName : "User"}!</h1>
//               <Link href="/update-profile">
//                 <Button>Update Profile</Button>
//               </Link>
//               <Button onClick={handleLogout}>Logout</Button>
//             </>
//           )}
//         </nav>
//       </div>
//     </header>
//   );
// }

















// /////////////////////////////////////////////////////////////////
// // "use client"
// // import { useEffect, useState } from "react";
// // import Link from "next/link";
// // import { Button } from "@/components/ui/button";
// // import { CircleUserRound } from "lucide-react";

// // export default function Header() {
// //   const [isLogin, setIsLogin] = useState(false);

// //   useEffect(() => {
// //     if (typeof window !== "undefined") {
// //       // Check session storage only on the client side
// //       const token = sessionStorage.getItem("jwt");
// //       setIsLogin(token);
// //     }
// //   }, []);

// //   return (
// //     <header>
// //       <div className="container flex items-center justify-between my-4 mx-auto">
// //         <Link href={"/"} className="font-bold text-lg">
// //           Job Board
// //         </Link>
// //         <nav className="flex gap-4 *:px-2 *:py-3 *:rounded-md">
// //           {!isLogin ? <Link href={"/sign-in"}>
// //               <Button>Login</Button>
// //             </Link>
// //             // :<CircleUserRound/>
// //             : <h1>Welcome</h1>
// //           }
// //         </nav>
// //       </div>
// //     </header>
// //   );
// // }

// ////////////////////////////////////////////////////////////////////////

// // import Link from "next/link"
// // import { Button } from "@/components/ui/button"


// // export default function Header(){

// //     const isLogin = sessionStorage.getItem('jwt')?true:false;

// //     return(
// //         <header>
// //             <div className="container flex items-center justify-between my-4 mx-auto">
// //                 <Link href={'/'} className="font-bold text-lg">Job Board</Link>
// //                 <nav className="flex gap-4 *:px-2 *:py-3 *:rounded-md">
// //                     {!isLogin &&<Link href={'/sign-in'}>
// //                         <Button>Login</Button>
// //                     </Link>}
// //                     {/* <Link>
// //                         <Button>Post a Job</Button>
// //                     </Link>  */}
                    
// //                     {/* <Link className="bg-blue-600 text-white" href={'/new-listing'}>Post a Job</Link> */}
// //                 </nav>
// //             </div> 
// //         </header>

// //     ); 
// // }
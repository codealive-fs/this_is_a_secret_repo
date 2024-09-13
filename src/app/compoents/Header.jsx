"use client"
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CircleUserRound } from "lucide-react";

export default function Header() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Check session storage only on the client side
      const token = sessionStorage.getItem("jwt");
      setIsLogin(!!token);
    }
  }, []);

  return (
    <header>
      <div className="container flex items-center justify-between my-4 mx-auto">
        <Link href={"/"} className="font-bold text-lg">
          Job Board
        </Link>
        <nav className="flex gap-4 *:px-2 *:py-3 *:rounded-md">
          {!isLogin ? <Link href={"/sign-in"}>
              <Button>Login</Button>
            </Link>
            // :<CircleUserRound/>
            : <Button>Me</Button>
          }
        </nav>
      </div>
    </header>
  );
}

// import Link from "next/link"
// import { Button } from "@/components/ui/button"


// export default function Header(){

//     const isLogin = sessionStorage.getItem('jwt')?true:false;

//     return(
//         <header>
//             <div className="container flex items-center justify-between my-4 mx-auto">
//                 <Link href={'/'} className="font-bold text-lg">Job Board</Link>
//                 <nav className="flex gap-4 *:px-2 *:py-3 *:rounded-md">
//                     {!isLogin &&<Link href={'/sign-in'}>
//                         <Button>Login</Button>
//                     </Link>}
//                     {/* <Link>
//                         <Button>Post a Job</Button>
//                     </Link>  */}
                    
//                     {/* <Link className="bg-blue-600 text-white" href={'/new-listing'}>Post a Job</Link> */}
//                 </nav>
//             </div> 
//         </header>

//     ); 
// }

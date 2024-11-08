"use client"
import React from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {useState, useEffect} from "react";
import { useRouter } from 'next/navigation' 
import { toast } from "sonner"
import GlobalApi from '@/app/_utils/GlobalApi';
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { useAuthContext } from '@/app/_context/AuthContext';
import Cookies from "js-cookie"; // Import js-cookie for handling cookies
import AuthLayout from '../layout';


function CreateAccount() {
    const [username, setUsername] = useState();
    const [fullName, setFullName] = useState();
    const [dateOfBirth, setdateOfBirth] = useState("");
    const [email, setEmail] = useState();
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState();
    const router = useRouter();
    const {setToken, setUser} = useAuthContext();
    
    useEffect(() => {
      const jwt = Cookies.get("jwt");
          if(jwt){
                 router.push('/')
              }
          }, [])

      // Handle file change for CV
    //  const onFileChange = (e) => {
    //    setCV(e.target.files[0]);  // Update the state with the selected CV file
    //  };


     const onCreateAccount = () => {
      GlobalApi.registerUser(fullName, username, email, dateOfBirth, password).then(resp => {
          Cookies.set("user", JSON.stringify(resp?.data?.user), { expires: 7 }); // Set user data in cookies for 7 days
          Cookies.set("jwt", resp?.data?.jwt, { expires: 7 }); // Set JWT token in cookies for 7 days
          setToken(resp?.data?.jwt);
          setUser(resp?.data?.user);
          toast("Account created Successfully!");
          router.push('/');        
      }, (e) => {
          toast("Error while creating your account!")
      })
  }
  return (
       <div className="flex items-center justify-center my-20">
          <Card className="w-[400px]">
            <CardHeader className="space-y-1">
              <div className="text-4xl font-bold mb-3">Job Board</div>
              <CardTitle className="text-2xl">Create an account</CardTitle>
              <CardDescription>
                Enter your info to create an account
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="fullName">
                  Full Name <span className="text-red-500">*</span>
                  </Label>
                <Input
                  id="fullName"
                  type="text"
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Full Name"
                  required
                  />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="username">
                  Username <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="username"
                  type="text"
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                  required
                  />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="m@example.com"
                  required
                  />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="dateOfBirth">
                  Date of Birth
                </Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value= {dateOfBirth}
                  onChange={(e) => setdateOfBirth(e.target.value)}
                  />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">
                  Password <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button onClick={onCreateAccount} className="w-full">
                Create account
              </Button>
              <p className="text-sm text-center">
                Already have an Account?{" "}
                <Link href="/sign-in" className="text-gray-600">
                  Click here to Sign In
                </Link>
              </p>
            </CardFooter>
          </Card>
      </div>
  )
}

export default CreateAccount;


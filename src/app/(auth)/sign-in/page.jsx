"use client"
import React, { useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {useState} from "react";
import { useRouter } from 'next/navigation' 
import GlobalApi from '@/app/_utils/GlobalApi';
import { toast } from "sonner"
import Link from "next/link"
import { Passero_One } from 'next/font/google';

function SignIn() {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const router = useRouter();

  useEffect(() => {
    const jwt = sessionStorage.getItem('jwt');
    if(jwt){
      router.push('/')
    }
  }, [])

  const onSignIn = () => {
    GlobalApi.signIn(email, password).then(resp => {
      console.log(resp);
      sessionStorage.setItem("user", JSON.stringify(resp?.data?.user))
      sessionStorage.setItem("jwt", resp?.data?.jwt);
      toast("Login Successfully!");
      
      // Dispatch custom event after successful login
      const event = new Event('loginSuccess');
      window.dispatchEvent(event);
      
      
      router.push('/');  
    }, (e)=>{
      toast("Error while Login In!");
      console.log(e);
    })
  }

  return (
  <div className='flex flex-col align-baseline items-center my-20 justify-center '>
      <div className=' flex items-center flex-col  bg-slate-100 border border-gray-200 p-10'>
              <h2 className='font-bold text-4xl mb-3'>Job Board</h2>
              <h2 className='text-bold text-2xl mb-2'>Sign In</h2>
              <h2 className='text-gray-500 text-sm'>Enter your Email and Password to Sign In</h2>
          <div className='flex flex-col w-full gap-5 mt-7'>
              <Input onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Email' />
              <Input onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Password' />
              <Button onClick={() => onSignIn()} >Sign In</Button>
              <p>Don't have an Account 
                <Link href={'/create-account'} className="text-blue-700">
                    Click here to Create an Account!
                </Link>

              </p>
          </div>
      </div>
</div>
)
}

export default SignIn;
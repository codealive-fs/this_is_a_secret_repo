"use client"
import React from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {useState, useEffect} from "react";
import { useRouter } from 'next/navigation' 
import { toast } from "sonner"
import GlobalApi from '@/app/_utils/GlobalApi';
import Link from "next/link"

function CreateAccount() {
    const [username, setUsername] = useState();
    const [fullName, setFullName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const router = useRouter();
    
    useEffect(() => {
        const jwt = localStorage.getItem('jwt');
            if(jwt){
                    router.push('/')
                }
            }, [])

    const onCreateAccount = () => {
        GlobalApi.registerUser(fullName, username, email, password).then(resp => {
 // Log data object if it exists
            console.log(resp?.data?.user);  // This may or may not exist based on API response
            console.log(resp?.data?.jwt);
            localStorage.setItem("user", JSON.stringify(resp?.data?.user))
            localStorage.setItem("jwt", resp?.data?.jwt);
            
            toast("Account created Successfully!");

            router.push('/');        
        }, (e) => {
            toast("Error while creating your account!")
        })
    }

  return (
    <div className='flex flex-col align-baseline items-center my-20 justify-center '>
        <div className=' flex items-center flex-col  bg-slate-100 border border-gray-200 p-10'>
                <h2 className='font-bold text-4xl mb-3'>Job Board</h2>
                <h2 className='text-bold text-2xl mb-2'>Create an Account</h2>
                <h2 className='text-gray-500 text-sm'>Enter your info to Create an account</h2>
            <div className='flex flex-col w-full gap-5 mt-7'>
                <Input onChange={(e) => setFullName(e.target.value)} type="text" placeholder="Full Name"/>
                <Input onChange={(e) => setUsername(e.target.value)} type="text" placeholder='Username' />
                <Input onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Email' /> 
                <Input onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Password' />
                <Button onClick={() => onCreateAccount()} >Submit</Button>
                <p>Already have an Account? 
                <Link href={'/sign-in'} className="text-blue-700">
                    Click here to Sign In
                </Link>
                </p>                    
            </div>
        </div>
</div>
  )
}

export default CreateAccount

//disabled={!(username || email || password)
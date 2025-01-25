"use client";

import React, { useState } from 'react'
import { LuEyeClosed } from "react-icons/lu";
import { RxEyeOpen } from "react-icons/rx";
import { useRouter } from 'next/navigation'


const Signup = () => {

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [email, setEmail] = useState<String>("");
    const [password, setPassword] = useState<String>("");
    const router = useRouter();

    const handleSubmit = (e : any) => {
        e.preventDefault();
        console.log(email,password)


        // Send to DB

        router.push("/dashboard")




    }
    return (
        <div className="flex items-center justify-center text-center h-[100vh] w-full">

            <div className="flex flex-col border border-slate-500 shadow shadow-slate-300 p-10">
                <div className="mb-10">
                    <p className="text-3xl text  ">Login</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
                        <input onChange={e => setEmail(e.target.value)} type="email" placeholder="Email id" className="bg-transparent outline-none text-white" required/>
                    </div> 

                    <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
                        <input onChange={e => setPassword(e.target.value)} type={showPassword ? "text" : "password"} placeholder="Password" className="bg-transparent outline-none text-white" required/>
                        <div className="flex cursor-pointer" onClick={() => setShowPassword((prev) => !prev)}>
                            {showPassword ? (
                                <LuEyeClosed />
                            ) : (
                                <RxEyeOpen />
                            )}
                        </div>
                    </div>     

                
                    <input type="submit" className="border border-slate-300 px-8 py-2 rounded-full cursor-pointer active:scale-95" value="Login" />
           
                </form>
            </div>
            
        </div>
    )
}

export default Signup
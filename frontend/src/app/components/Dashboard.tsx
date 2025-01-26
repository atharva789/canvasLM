"use client";
import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useRouter } from 'next/navigation'
import { access } from 'fs';

const Dashboard = () => {
    const [accessToken,setAccessToken] = useState<String | null>("");

    const [classes, setClasses] = useState([]);
    const router = useRouter();


    const getData = async() => {
        const params : URLSearchParams = new URLSearchParams(window.location.search);
        setAccessToken(params.get("q"));
        if (!accessToken) return;
        const response = await fetch("/api/GetClasses", {
            method:"POST",
            body: JSON.stringify({accessToken : accessToken })

        });

        const data = await response.json();
        setClasses(data);
    }   

    const handleClick = async (value) => {
       // Navigate to some webpage and display sht idk 
       console.log(value);
       router.push(`/dashboard/class_id?q=${value.id}&?q=${accessToken}&?q=${value.name}`)
    }

    useEffect(() => {
        getData();
    },[accessToken])


    if (classes.length === 0) return;
    const data = classes.filter((value) => value.name);
    return (
        <div className='p-[2rem] '>
            <div className="flex items-center justify-center mb-10">
                <p className="text-3xl ">Your Classes</p>
            </div>
            <div className="grid grid-cols-1    sm:grid-cols-3 gap-4">
                {data.map((value, index) => (

                    <div onClick={() => handleClick(value)} key={index} className="cursor-pointer flex items-center justify-center text-center border border-slate-300 shadow-md gap-2 p-4 rounded-md">
                            <div  className="flex flex-col ">
                                <p className="">{value.course_code}</p>
                                <p className="">{value.name}</p>
                            </div>
                    </div>
                    

                ))}
            </div>
        </div>
    )
}

export default Dashboard
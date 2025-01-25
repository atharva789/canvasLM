"use client";
import React, { useEffect, useState } from 'react'
import axios from "axios";

const Dashboard = () => {
    const accessToken = "5590~GxDyuHaneAhvu6NyyJucMaaJxQhCEZURRTwxZkatwtntFFeJE67yLWWxk8KQ8BhX";
    const [classes, setClasses] = useState([]);

    const getData = async() => {
        const response = await fetch("/api/GetClasses", {method:"GET"});

        const data = await response.json();
        setClasses(data);
    }

    const handleClick = async (value) => {
       // Navigate to some webpage and display sht idk 
       console.log(value);
    }

    useEffect(() => {
        getData();
    },[])


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
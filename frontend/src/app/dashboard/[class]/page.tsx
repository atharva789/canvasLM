"use client";
import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useRouter } from 'next/navigation'

const Class = () => {

    const router = useRouter(); 
    const [classId,setClassId] = useState<String | null>("0");
    const [accessToken,setAccessToken] = useState<String | null>("0");
    const [courseName, setCourseName] = useState<String | null>("");
    const [assignmets, setAssignments] = useState([]);

    const getData = async() => {
        const arr = window.location.search.split("&")
        const classWindowToken = arr[0]
        const accessWindowToken = arr[1]
        const accessNameToken = arr[2]
        const params : URLSearchParams = new URLSearchParams(classWindowToken);
        const accessTokenParam : URLSearchParams = new URLSearchParams(accessWindowToken);
        const accessNameParam : URLSearchParams = new URLSearchParams(accessNameToken);
        setCourseName(accessNameParam.get("q"))

        setClassId(params.get("q"))
        
        const response = await fetch("/api/GetAssignments", {
            method:"POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ course_id:classId, accessToken : accessTokenParam}),
        });

        const data = await response.json();
        console.log(data);
        setAssignments(data);

        // Save Data
        if (data.length ===0) return;
    }


    useEffect(() => {
        getData();
    },[classId])


    return (
      <div className="flex h-screen bg-gray-900 text-white">
        {/* Left Panel */}
        <div className="w-64 bg-gray-800 p-6 flex flex-col justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
            <div className="space-y-4">
              <button
                className="w-full py-2 text-left px-4 rounded-lg hover:bg-gray-700 focus:outline-none"
                
              >
                Calendar
              </button>
              <button
                className="w-full py-2 text-left px-4 rounded-lg hover:bg-gray-700 focus:outline-none"
              >
                Upload Notes
              </button>
              <button
                className="w-full py-2 text-left px-4 rounded-lg hover:bg-gray-700 focus:outline-none"
              >
                Study Guides
              </button>
            </div>
          </div>
          <div className="text-center mt-6 text-sm">
            <p>&copy; 2025 Canvas WingmanAI</p>
          </div>
        </div>
  
        {/* Main Panel */}
        <div className="flex-1 p-8">
          <div className="bg-gray-800 rounded-lg p-8">
            <h2 className="text-3xl font-bold mb-4">Welcome to {courseName}</h2>
            <p className="text-lg">
              Here's your personalized dashboard for the {courseName} class. Navigate through the left
              panel to view your calendar, upload notes, or access study guides.
            </p>
            <div className="mt-6">
              {/* You can add more UI elements here, like charts, widgets, etc. */}
              <div className="text-sm text-gray-400">
                <p>Upcoming Assignments:</p>
                {/* Add a dynamic list of lectures, or anything related */}

                <div className="grid grid-cols-1 gap-4 mt-10 ">
                  {assignmets.map((value, index) => ( // Filter by due Date
                    <div className="flex flex-col border border-slate-300 items-center justify-center">
                      <div className="flex">{value.name}</div>
                      <p className="">Points possible : {value.pointsPossible}</p>
                      <p className="">Due At : {value.dueAt}</p>

                    </div>
                  ))}
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Class;
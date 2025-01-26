"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

// Dynamically import the math rendering library (e.g., `react-mathjax2` or any LaTeX renderer)
//const MathJax = dynamic(() => import('react-mathjax2').then((mod) => mod.MathJax), { ssr: false });

const StudyGuide = () => {
  const router = useRouter();

  // States to hold the URL parameters
  const [classId, setClassId] = useState<String | null>('0');
  const [accessToken, setAccessToken] = useState<String | null>('0');
  const [courseName, setCourseName] = useState<String | null>('');
  const [assignments, setAssignments] = useState<any[]>([]); // Replace `any[]` with your data structure as necessary

  const [userQuery, setUserQuery] = useState('');
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    // Get query params from the URL
    const arr = window.location.search.split('&');
    const classWindowToken = arr[0];
    const accessWindowToken = arr[1];
    const accessNameToken = arr[2];

    const params: URLSearchParams = new URLSearchParams(classWindowToken);
    const accessTokenParam: URLSearchParams = new URLSearchParams(accessWindowToken);
    const accessNameParam: URLSearchParams = new URLSearchParams(accessNameToken);

    // Set state values based on URL parameters
    setCourseName(accessNameParam.get('q'));
    setAccessToken(accessTokenParam.get('q'));
    setClassId(params.get('q'));
  }, []); // Empty array ensures it runs once when the component is mounted

  useEffect(() => {
    // Fetch assignments or any other necessary data based on the params
    // If you want to fetch assignments after setting classId, accessToken, or courseName, you can implement it here
    if (classId && accessToken && courseName) {
      // Example of how to populate assignments or any other necessary state
      // Example: setAssignments(fetchAssignments(classId, accessToken));
    }
  }, [classId, accessToken, courseName]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white p-6">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-3xl font-semibold text-blue-400">
          Study Guide for {courseName} ({classId})
        </h1>
        <p className="text-gray-400">{`Access Token: ${accessToken}`}</p>
      </header>

      {/* Query Bar */}
      <div className="flex items-center mb-8">
        <input
          type="text"
          value={userQuery}
          onChange={(e) => setUserQuery(e.target.value)}
          placeholder="Enter your query..."
          className="border border-gray-600 bg-gray-800 p-2 rounded-lg w-full sm:w-1/2 lg:w-1/3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={() => {
            // Trigger an action like submitting the query
            setAnswer(`Your answer for: "${userQuery}"`);
          }}
          className="ml-4 bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Search
        </button>
      </div>

      {/* Answer Section (Rendering LaTeX or answer based on the query) */}
      <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-blue-400">Answer</h2>
        <div className="prose text-white">
          {/* MathJax for rendering LaTeX */}

          
        </div>
      </div>
    </div>
  );
};

export default StudyGuide;

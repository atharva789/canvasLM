import { NextResponse } from 'next/server';

export async function POST(req:Request) {
    
    const { accessToken } = await req.json();
    const data = await fetch("https://canvas.case.edu/api/v1/users/self/courses?per_page=2", {
    headers: {Authorization: `Bearer ${accessToken}`}})    

    const formattedResponse = [];


    const response = await data.json();
    for (let i = 0; i < response.length; i++) { // 
        formattedResponse.push({
            classId : response[i].id,
            className : response[i].name,
            modules : []
        })
        const res = await fetch("http://localhost:3000/api/GetModules", {
            method:"POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ course_id:response[i].id, accessToken : accessToken
            }),
        });


        //const {data, download_link} = await res.json();
        const {formattedRes} = await res.json();
        //console.log(formattedRes);
        formattedResponse[i].modules.push(formattedRes)
    }
    console.log(formattedResponse);
    
    return NextResponse.json({response,formattedResponse}); 
  
}
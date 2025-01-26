import { NextResponse } from 'next/server';

export async function POST(req:Request) {
    
    const { accessToken } = await req.json();

    const data = await fetch("https://canvas.case.edu/api/v1/users/self/courses?per_page=40", {
    headers: {Authorization: `Bearer ${accessToken}`,}})

    const response = await data.json();

    for (let i = 0; i < 0; i++) { // response.length

        const res = await fetch("http://localhost:3000/api/GetModules", {
            method:"POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ course_id:response[i].id, access_token : accessToken
            }),
        });

        //const {data, download_link} = await res.json();
        const {pdfArray} = await res.json();
        //console.log(pdfArray);
    }
    
    return NextResponse.json(response); 
  
}
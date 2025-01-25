import { NextResponse } from 'next/server';
const accessToken = "5590~GxDyuHaneAhvu6NyyJucMaaJxQhCEZURRTwxZkatwtntFFeJE67yLWWxk8KQ8BhX";

export async function GET(req:Request) {
    

    const data = await fetch("https://canvas.case.edu/api/v1/users/self/courses?per_page=40", {
    headers: {Authorization: `Bearer ${accessToken}`,}})

    const response = await data.json();

    for (let i = 0; i < response.length; i++) {

        const res = await fetch("http://localhost:3000/api/GetModules", {
            method:"POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ course_id:response[i].id}),
        });

        //const {data, download_link} = await res.json();
        const {pdfArray} = await res.json();
        //console.log(pdfArray);
    }
    
    return NextResponse.json(response); 
  
}
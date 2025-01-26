import { NextResponse } from 'next/server';
const accessToken = "5590~GxDyuHaneAhvu6NyyJucMaaJxQhCEZURRTwxZkatwtntFFeJE67yLWWxk8KQ8BhX";

export async function POST(req:Request) {
    
    const { course_id } = await req.json();
    ///api/v1/courses/45357/assignments/614184/submissions/self
    const courses = await fetch(`https://canvas.case.edu/api/v1/courses/${course_id}/assignments`, {
    headers: {Authorization: `Bearer ${accessToken}`,}})
    const data = [];
    const coursesData = await courses.json();
    
    

    for (let i = 0; i < coursesData.length; i++) {

        const assignments = await fetch(`https://canvas.case.edu/api/v1/courses/${course_id}/assignments/${coursesData[i].id}/submissions/self`, {
            headers: {Authorization: `Bearer ${accessToken}`,}})
        
        const assignmentsData = await assignments.json();
        data.push({
            name : coursesData[i].name,
            dueAt : coursesData[i].due_at,
            pointsPossible : coursesData[i].points_possible,
            submittedAt : assignmentsData.submitted_at,
            submission_url : assignmentsData.attachments ? assignmentsData.attachments[0].url : ""
        })

    }



    
    return NextResponse.json(data); 
  
}
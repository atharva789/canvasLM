import { NextResponse } from 'next/server';
const accessToken = "5590~GxDyuHaneAhvu6NyyJucMaaJxQhCEZURRTwxZkatwtntFFeJE67yLWWxk8KQ8BhX";

// Gets all the downloadable links from canvas for accessToken

export async function POST(req:Request) {

    const { course_id } = await req.json();
    const regex = /\bdownload\b/i;
    const pdfArray : String[] = []
    // https://canvas.case.edu/api/v1/courses/${course_id}/modules/324698/items/2107689/
    const modules = await fetch(`https://canvas.case.edu/api/v1/courses/${course_id}/modules`, {
        headers: {Authorization: `Bearer ${accessToken}`},
        method:"GET",
    })

    const moduleData = await modules.json();
    for (let i = 0; i < moduleData.length; i++) {

        const moduleItems = await fetch(`https://canvas.case.edu/api/v1/courses/${course_id}/modules/${moduleData[i].id}/items`, {
            headers: {Authorization: `Bearer ${accessToken}`},
            method:"GET",
        })
        
        const moduleItemsData = await moduleItems.json();
        
        
        for (let j = 0; j < moduleItemsData.length; j++) {

            const modulePdf = await fetch(`https://canvas.case.edu/api/v1/courses/${course_id}/modules/${moduleData[i].id}/items/${moduleItemsData[j].id}`, {
                headers: {Authorization: `Bearer ${accessToken}`},
                method:"GET",
            })

            const modulePdfData = await modulePdf.json();

            if (!modulePdfData.url) continue;

            const downloadPdf = await fetch(modulePdfData.url, {
                headers: {Authorization: `Bearer ${accessToken}`},
                method:"GET",
            })

            const downloadPdfData = await downloadPdf.json();

            if (regex.test(downloadPdfData.url)) {
                console.log(downloadPdfData.url);
                pdfArray.push(downloadPdfData.url)
            }
            


        }


    }
    
    

    return NextResponse.json({pdfArray});
  
}
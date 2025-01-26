import { NextResponse } from 'next/server';

// Gets all the downloadable links from canvas for accessToken

export async function POST(req:Request) {

    const { course_id,accessToken } = await req.json();
    const regex = /\bdownload\b/i;
    const pdfArray : String[] = []
    // https://canvas.case.edu/api/v1/courses/${course_id}/modules/324698/items/2107689/
    const modules = await fetch(`https://canvas.case.edu/api/v1/courses/${course_id}/modules`, {
        headers: {Authorization: `Bearer ${accessToken}`},
        method:"GET",
    })
    const formattedRes = []
    const moduleData = await modules.json();
    

    for (let i = 0; i < moduleData.length; i++) { //
        formattedRes.push({
            module : moduleData[i].name,
            downloads : []
        })
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
                formattedRes[i].downloads.push(downloadPdfData.url);
                //pdfArray.push(downloadPdfData.url);
            }

        }


    }
    
    

    return NextResponse.json({formattedRes});
  
}
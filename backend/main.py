from fastapi import FastAPI, HTTPException, Body
from routers import courses
import os
from dotenv import load_dotenv
from client import prisma
from pydantic import BaseModel
from typing import List, Optional

load_dotenv()

app = FastAPI()

app.include_router(courses.router)

@app.on_event("startup")
async def startup():
  await prisma.connect()

@app.on_event("shutdown")
async def shutdown():
  await prisma.disconnect()

@app.get("/")
def read_root():
  return {"Hello": "World"}

@app.post("/login/")
async def login(api_key: str = Body(..., embed=True)):
  try:
    # Create a new student record in the database
    new_student = await prisma.student.create(
      data={
        "apiKey": api_key,
      }
    )
    return {"message": "Student created successfully", "student": new_student}

  except Exception as e:
    raise HTTPException(status_code=400, detail=str(e))
  
class Data(BaseModel):
  class_name: str
  modules: List[Module] #list of type module
  
class Module(BaseModel):
  module_name: str
  file_name: List[File] #list of type file_name
  
class File(BaseModel):
  file_name: str
  url: str

@app.post("/parse-data/")
async def parse_data(student_id: int, data: List[ClassData]):
  try:
    # Verify if the student exists
    student = await prisma.student.find_unique(where={"id": student_id})
    if not student:
      raise HTTPException(status_code=404, detail="Student not found")

    for class_data in data:
      # Step 1: Create the Course
      course = await prisma.course.create(
          data={
              "id": class_data.classId,
              "name": class_data.className,
              "StudentID": student_id
          }
      )

      for module_data in class_data.modules:
        # Step 2: Create the Module
        module = await prisma.module.create(
            data={
                "name": module_data.module,
                "courseId": course.id,
            }
        )

        for download_url in module_data.downloads:
            # Step 3: Create the Resources
            resource = await prisma.resource.create(
                data={
                    "name": f"Resource for {module_data.module}",
                    "moduleId": module.id,
                    "file": download_url,
                }
            )

    return {"message": "Data processed and objects created successfully"}
    
  except Exception as e:
    raise HTTPException(status_code=400, detail=str(e))
from fastapi import FastAPI, HTTPException, Body
from prisma import Prisma
from routers import courses
from canvasapi import Canvas
import os
from dotenv import load_dotenv
from client import prisma
from pydantic import BaseModel

load_dotenv()

app = FastAPI()

app.include_router(courses.router)

class LoginRequest(BaseModel):
    api_key: str

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
    # Check if the student already exists
    student = await prisma.student.find_first(where={"apiKey": api_key})
    if student:
        return {"message": "Student already exists", "student": student}

    # Load and store courses
    await prisma.course.create(
      data={
        "id": course.id,
        "name": course.name,
        "StudentID": user.id
      }
    )

    # Create a new student record in the database
    new_student = await prisma.student.create(
      data={
        "apiKey": api_key,
      }
    )

    return {"message": "Student created successfully", "student": new_student}

  except Exception as e:
    raise HTTPException(status_code=400, detail=str(e))
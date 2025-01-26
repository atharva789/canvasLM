from fastapi import FastAPI
from prisma import Prisma
from routers import courses
from canvasapi import Canvas
import os
from dotenv import load_dotenv
from client import prisma

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
async def login(api_key: str):
  #create student with api_key
  canvas = Canvas(os.getenv("CANVAS_URL"), api_key)
  user = canvas.get_current_user()
  username, email = user.name, user.email
  
  #load courses
  courses = user.get_courses()
  for course in courses:
    await prisma.course.create(data={"api_key": api_key, "name": course.name, "id": course.id})
    
  return await prisma.student.create(data={"api_key": api_key, "name": username, "email": email})
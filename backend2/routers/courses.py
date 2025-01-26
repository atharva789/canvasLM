from fastapi import APIRouter, Depends, FastAPI

from client import prisma

router = APIRouter()

@router.get("/courses/")
async def read_courses():
  return await prisma.course.find_many()

@router.get("/courses/{course_id}")
async def read_course(course_id: int):
  return await prisma.course.find_unique(where={"id": course_id})

@router.get("/courses/{course_id}/assignments")
async def read_assignments(course_id: int):
  return await prisma.assignment.find_many(where={"course_id": course_id})

@router.get("/courses/{course_id}/assignments/{assignment_id}")
async def read_assignment(course_id: int, assignment_id: int):
  return await prisma.assignment.find_unique(where={"id": assignment_id})

@router.get("/courses/{course_id}/study_guides/")
async def read_study_guides(course_id: int):
  return await prisma.study_guide.find_many(where={"course_id": course_id})

@router.get("/courses/{course_id}/study_guides/{study_guide_id}")
async def read_study_guide(course_id: int, study_guide_id: int):
  return await prisma.study_guide.find_unique(where={"id": study_guide_id})

@router.get("/courses/{course_id}/study_guides/create/")
async def create_study_guide(course_id: int):
  #make packet with course_id
  return await prisma.study_guide.create(data={"course_id": course_id})
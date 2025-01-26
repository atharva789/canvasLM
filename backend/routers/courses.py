from fastapi import APIRouter, Depends, FastAPI

from client import prisma
from routers.agent import weaviate_client

prompt = """
<|system|>
You are a student in a course and you need to create a study guide for the course. The study guide should include all the important information from the course materials. You can use the course materials to help you answer the question.
The study guide should include all the important information from the course materials. All information should be explained with at least two detailed examples, and at the end of each major concept you should include some practice questions. The study guide should be well-organized and easy to read, and should be formatted in markdown. You can use the course materials to help you answer the question. Here is the question you need to answer.

<|user|>
---
Here is the question you need to answer.

Question: {}
<|assistant|>
"""

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

@router.post("/courses/{course_id}/study_guides/create/")
async def create_study_guide(course_id: int, query: str):
  #### RAG APP
  #make packet with course_id
  module_data = get_module_data(course_id)
  vectorize_module_pdf(module_data)
  
  prompt = prompt.format(query)
  
  #call openai api here
  response = client.query.generate(
      prompt=prompt,
      class_name="Material"
  )
  
  return await prisma.study_guide.create(data={"course_id": course_id})

@router.get("/courses/{course_id}/study_guides/")
async def view_study_guides(course_id: int):
  return await prisma.study_guide.find_many(where={"course_id": course_id})

@router.get("/courses/{course_id}/study_guides/{study_guide_id}/view/")
async def view_study_guide(course_id: int, study_guide_id: int):
  return await prisma.study_guide.find_unique(where={"id": study_guide_id})

def get_module_data(course_id):
  modules = prisma.module.find_many(where={"course_id": course_id})
  module_data = [(module.title, resource.name, resource.url) for module in modules for resource in module.resources]
  
  #load data from url to pdf
  data = []
  for module in module_data:
    module_data = {
      "moduleName": module[0],
      "fileName": module[1],
      "text": extract_text_from_pdf(module[2])
    }
    data.append(module_data)
  return data
  
def extract_text_from_pdf(pdf_path):
  doc = fitz.open(pdf_path)
  full_text = ""
  for page_num in range(len(doc)):
      page = doc[page_num]
      text = page.get_text()
      full_text += text + "\n"
  doc.close()
  return full_text

def vectorize_module_pdf(module_data):
  #create module_material data
  data = get_module_data(course_id)
  for module_data in data:
    weaviate_client.data_object.create(module_data, class_name="Material")

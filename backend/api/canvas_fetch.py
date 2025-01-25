import os
import django
from dotenv import load_dotenv
from canvasapi import Canvas

# # Set the settings module
# os.environ.setdefault("DJANGO_SETTINGS_MODULE", ".settings")

# # Initialize Django
# django.setup()

# # Corrected import statement for models
# from . import models

# Load environment variables
load_dotenv()

# Canvas API configuration
url = 'https://canvas.case.edu/'
api_key = os.getenv('CANVAS_API_KEY')

if not api_key:
    raise ValueError("Canvas API key not found. Please set CANVAS_API_KEY in your .env file.")

# Initialize Canvas object
canvas = Canvas(base_url=url, access_token=api_key)

# Get the current user
user = canvas.get_user('self')

def get_user():
    """Fetches the current user and maps it to the Student model."""
    student = models.Student()
    student.api_key = api_key
    user_profile = user.get_profile()
    student.canvas_sid = user_profile['id']
    student.name = user_profile['name']
    return student

def get_user_enrolled_courses():
    """Fetches the enrolled courses for the current user and maps them to Course model."""
    _courses = user.get_courses()
    courses = []
    for course in _courses:
        course_object = models.Course()
        course_object.code_id = getattr(course, 'course_code', None)
        course_object.course_pk = getattr(course, 'id', None)
        course_object.name = getattr(course, 'name', None)
        courses.append(course_object)
    return courses

def get_modules(course):
    """Fetches modules for a given course."""
    modules = course.get_modules()
    for module in modules:
        print(f"Module: {module.name}")
    return modules

# # Fetch and print user data
# student = get_user()
# print(f"Student Name: {student.name}, Canvas SID: {student.canvas_sid}")

# # Fetch and print courses
# courses = get_user_enrolled_courses()
# for course in courses:
#     print(f"Course Name: {course.name}, Course ID: {course.course_pk}")


user = canvas.get_user('self')

for course in user.get_courses():
    print(course)
    print("--------------")
    for module in course.get_modules():
        for moduleitem in module.get_module_items():
            print(moduleitem)
            

    
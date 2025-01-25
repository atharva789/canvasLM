from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Student(models.Model):
  user = models.OneToOneField(User, on_delete=models.CASCADE)
  api_key = models.CharField(max_length=100)  
  def __str__(self):
    return self.user.username
  
class Course(models.Model):
  name = models.CharField(max_length=100)
  code_id = models.CharField(max_length=10)
  course_pk = models.CharField(max_length=10, primary_key=True, unique=True)

  def __str__(self):
    return self.name
  
  
class StudentCourse(models.Model):
  student = models.ForeignKey(Student, on_delete=models.CASCADE)
  course = models.ForeignKey(Course, on_delete=models.CASCADE)
  
  def __str__(self):
    return self.student.user.username + " - " + self.course.name
  

  
  
class Module(models.Model):
  name = models.CharField(max_length=100)
  content = models.TextField()
  course = models.ForeignKey(Course, on_delete=models.CASCADE) #Foreign key to Course
  
  def __str__(self):
    return self.module.name
  
class Material(models.Model):
  name = models.CharField(max_length=100)
  file = models.FileField(upload_to='materials/')
  module = models.ForeignKey(Module, on_delete=models.CASCADE) #Foreign key to Module
  
  def __str__(self):
    return self.name
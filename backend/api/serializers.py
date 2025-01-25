# from django.contrib.auth.models import User
from rest_framework import serializers
from .models import (
  Student,
  StudentCourse,
  Course,
  Module,
  Material,
)
  
class StudentSerializer(serializers.ModelSerializer):
  class Meta:
    model = Student
    fields = ("api_key", "name", "canvas_sid")
  
  def create(self, validated_data):
    api_key = validated_data.pop("api_key")
    #use canvasapi here to get the student's name and canvas_sid
    
    student, created = Student.objects.update_or_create(api_key=user, university=validated_data.pop("university"))
    return student
  

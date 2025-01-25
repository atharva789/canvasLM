from django.contrib.auth.models import User
from rest_framework import serializers
from .models import (
  Student,
  StudentCourse,
  Course,
  Module,
  Material,
)

class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ("id", "username", "email", "password",)
    extra_kwargs = {"password": {"write_only": True}}
  
  def create(self, validated_data):
    user = User.objects.create_user(**validated_data)
    return user
  
class StudentSerializer(serializers.ModelSerializer):
  class Meta:
    model = Student
    fields = ("id", "user", "api_key",)
    extra_kwargs = {
        "user": {"read_only": True},
    }
  
  def create(self, validated_data):
    user_data = validated_data.pop("user")
    user = UserSerializer.create(UserSerializer(), validated_data=user_data)
    # student, created = Student.objects.update_or_create(user=user, university=validated_data.pop("university"))
    return student
  

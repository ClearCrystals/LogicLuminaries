from django.contrib.auth.hashers import make_password
from rest_framework import serializers
from .models import Users


class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ["id", "pwd", "email"]

    def create(self, validated_data):
        validated_data["pwd"] = make_password(validated_data["pwd"])
        return super(UsersSerializer, self).create(validated_data)

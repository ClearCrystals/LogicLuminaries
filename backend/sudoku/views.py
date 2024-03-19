from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework import viewsets
from .serializers import UsersSerializer
from .models import Users
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.hashers import check_password

# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status

# @method_decorator(csrf_exempt, name='dispatch')
# class SudokuAPIView(APIView):
# def get(self, request, *args, **kwargs):
#    return Response(data, status=status.HTTP_200_OK)
#    def post(self, request, format=None):
#        serializer = UserSerializer(data=request.data)
#        print("TEST", serializer)
#        if serializer.is_valid():
#            print("AM I HERE?")
#            serializer.save()
#            return Response(serializer.data, status=status.HTTP_201_CREATED)
#        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def index(request):
    return HttpResponse("Hello, world. You're at the sudoku index.")


class UsersView(viewsets.ModelViewSet):
    serializer_class = UsersSerializer  # This is where user input data is
    queryset = Users.objects.all()


@api_view(["POST"])
def signup_view(request):
    serializer = UsersSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        print("Received data:", request.data)
        print("Serializer errors:", serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def signin_view(request):
    email = request.data.get("email")
    password = request.data.get("pwd")
    try:
        user = Users.objects.get(email=email)
    except Users.DoesNotExist:
        return Response(
            {"message": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED
        )

    if check_password(password, user.pwd):
        return Response({"message": "User authenticated"}, status=status.HTTP_200_OK)
    else:
        return Response(
            {"message": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED
        )

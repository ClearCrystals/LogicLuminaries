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


def index(request):
    return HttpResponse("Hello, world. You're at the sudoku index.")


class UsersView(viewsets.ModelViewSet):
    serializer_class = UsersSerializer  # This is where user input data is
    queryset = Users.objects.all()


"""
    Handles the user signup process.

    This view function processes POST requests for user registration. It uses a
    serializer to validate and save the new user data. If the provided data is
    valid, it creates a new user and returns the user data with a 201 CREATED status.
    If the data is invalid, it prints the received data and errors, and returns the
    errors with a 400 BAD REQUEST status.

    Args:
        request (Request): The Django REST framework request object containing
                           the user data.

    Returns:
        Response: A Django REST framework response object. On successful user creation,
                  it returns the user data with a 201 CREATED status. On failure, it
                  returns the validation errors with a 400 BAD REQUEST status.
    """


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
        """
    Handle the user signin process via POST request.

    Authenticates a user based on the provided email and password. It first checks if
    a user with the given email exists. If the user exists and the provided password
    matches the stored password hash, it returns a success response. Otherwise, it
    returns an unauthorized response.

    Parameters:
    request (Request): A Django REST framework Request object containing the user's
                       email and password.
    Returns:
    Response: A Django REST framework Response object. Returns a success message with
              a 200 OK status if the authentication is successful. Returns an error
              message with a 401 UNAUTHORIZED status if the credentials are invalid.
    """


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

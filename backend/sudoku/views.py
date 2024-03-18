from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets
from .serializers import UsersSerializer
from .models import Users
#from rest_framework.views import APIView
#from rest_framework.response import Response
#from rest_framework import status

# @method_decorator(csrf_exempt, name='dispatch')
#class SudokuAPIView(APIView):
    #def get(self, request, *args, **kwargs):
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
    serializer_class = UsersSerializer # This is where user input data is
    queryset = Users.objects.all()
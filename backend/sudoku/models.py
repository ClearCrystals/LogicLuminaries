from django.db import models


# Class used to make queries to the user database
class Users(models.Model):
    id = models.CharField(primary_key=True, max_length=30)  # Primary key: the username
    pwd = models.CharField(max_length=128) 
    email = models.CharField(max_length=200)  
#class User(models.Model):
#    full_name = models.CharField(max_length=100)
#    email = models.EmailField(unique=True)
#    password = models.CharField(max_length=100)

# Class used to make queries to the board database
class Boards(models.Model):
    id = models.AutoField(primary_key=True)  # increment it
    state = models.CharField(max_length=200)  # string for array of arrays
    answer = models.CharField(max_length=200)  # consider different lengths
    difficulty = models.CharField(max_length=30)  # Could also use choice see below
    style = models.CharField(max_length=30)  # what kind of sudoku puzzle
    user = models.CharField(max_length=30)  # Foreign key: the username
    isFinished = models.IntegerField(default=0)
    #TODO: switch to float

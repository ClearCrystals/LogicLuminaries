from django.db import models

# Class used to make queries to the user database
class Users(models.Model):
    id = models.CharField(primary_key = True, max_length = 30) # Primary key: the username
    pwd = models.CharField(max_length = 30) # the password
    token = models.CharField(max_length = 200) # Used for authentication. What type?

# Class used to make queries to the board database
class Boards(models.Model):
    id = models.AutoField(primary_key = True) # increment it
    state = models.CharField(max_length = 200) # string for array of arrays
    answer = models.CharField(max_length = 200) # consider different lengths
    difficulty = models.CharField(max_length = 30) # Could also use choice see below    
    style = models.CharField(max_length = 30) # what kind of sudoku puzzle
    # For a many to one relationship (our database), foreign key should use Cascade
    # https://docs.djangoproject.com/en/5.0/ref/models/fields/#foreignkey
    user = models.ForeignKey(Users, on_delete=models.CASCADE) # Foreign key: the username
    isFinished = models.IntegerField(default = 0)
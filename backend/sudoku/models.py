from django.db import models
from django.contrib.postgres.fields import JSONField

# Class used to make queries to the user database
class User(models.Model):
    id = models.CharField(primary_key = True, max_length = 30) # Primary key: the username
    pwd = models.CharField(max_length = 30) # the password
    # token: Used for authentication. What type?

# Class used to make queries to the board database
class Board(models.Model):
    # id: unique identifier for board. Django automatically will make it. Primary key
    # state = JSONField(default=list, blank=True, null=True) # Array of arrays
    state = models.CharField(max_length = 200)
    difficulty = models.CharField(max_length = 30) # Could also use choice
    # answer = JSONField(default=list, blank=True, null=True) # an array of arrays
    answer = models.CharField(max_length = 200)
    style = models.CharField(max_length = 30) # what kind of sudoku puzzle
    # For a many to one relationship (our database), foreign key should use Cascade
    # https://docs.djangoproject.com/en/5.0/ref/models/fields/#foreignkey
    user = models.ForeignKey(User, on_delete=models.CASCADE) # Foreign key: the username
    isFinished = models.ItegerField(default = 0)
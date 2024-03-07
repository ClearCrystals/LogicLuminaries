from django.db import models
# from django.contrib.postgres.fields import JSONField

# Class used to make queries to the user database
class User(models.Model):
    id = models.CharField(max_length = 30) # Primary key: the username
    pwd = models.CharField(max_length = 30) # the password
    # token: Used for authentication. What type?

# Class used to make queries to the board database
class Board(models.Model):
    # id: unique identifier for board. Num or String?
    # state = JSONField(default=list, blank=True, null=True) an array of arrays. Find out how to set this.
    difficulty = models.CharField(max_length = 30) # Could also use choice
    # answer = JSONField(default=list, blank=True, null=True) an array of arrays
    style = models.CharField(max_length = 30) # what kind of sudoku puzzle
    user = models.ForeignKey(User, on_delete=models.CASCADE) # Foreign key: the username
    isFinished = models.ItegerField(default = 0)
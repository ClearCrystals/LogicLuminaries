# Django Documentation

### Use Instructions:

##### Models.py

Within models.py are classes that are the data models in Django. With these, you are able to use them to create, retrieve, update, and delete just like SQL queries. Since there are two tables, there are two classes.

Users: the model that interacts with the user table in the database.

Board: the model that interacts with the board table in the database.

##### Create Objects

To represent the database table, this is how Django does it. The class represents the entire database table and an instance of that class represents a particular record in that database table.[1]

###### Insert

The following Django code initializes an instance of the User class. This is equal to the Insert statement in MySQL.[1]

```
from src.models import User
u = User(id="username", pwd="password", token=token)
u.save()
```

Note: Django **does not** connect to the database until you call `save()`[1]

### References:
[1](https://docs.djangoproject.com/en/5.0/topics/db/queries/)

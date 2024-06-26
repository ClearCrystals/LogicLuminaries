# Generated by Django 5.0.2 on 2024-03-16 22:50

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Users",
            fields=[
                (
                    "id",
                    models.CharField(max_length=30, primary_key=True, serialize=False),
                ),
                ("pwd", models.CharField(max_length=30)),
                ("token", models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name="Boards",
            fields=[
                ("id", models.AutoField(primary_key=True, serialize=False)),
                ("state", models.CharField(max_length=200)),
                ("answer", models.CharField(max_length=200)),
                ("difficulty", models.CharField(max_length=30)),
                ("style", models.CharField(max_length=30)),
                ("isFinished", models.IntegerField(default=0)),
                (
                    "user",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="sudoku.users"
                    ),
                ),
            ],
        ),
    ]

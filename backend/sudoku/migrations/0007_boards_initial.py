# Generated by Django 5.0.2 on 2024-04-12 19:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("sudoku", "0006_alter_boards_answer_alter_boards_state"),
    ]

    operations = [
        migrations.AddField(
            model_name="boards",
            name="initial",
            field=models.CharField(default="", max_length=500),
        ),
    ]

# Generated by Django 3.2 on 2021-05-08 09:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events_board', '0009_eventsboard_likes'),
    ]

    operations = [
        migrations.AlterField(
            model_name='eventsboard',
            name='people_wanted',
            field=models.IntegerField(default=1),
        ),
    ]

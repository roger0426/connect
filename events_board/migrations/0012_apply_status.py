# Generated by Django 3.2 on 2021-06-08 02:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events_board', '0011_apply'),
    ]

    operations = [
        migrations.AddField(
            model_name='apply',
            name='status',
            field=models.IntegerField(default=1),
        ),
    ]

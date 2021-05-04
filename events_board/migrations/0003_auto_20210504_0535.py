# Generated by Django 3.2 on 2021-05-04 05:35

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('events_board', '0002_auto_20210502_0836'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='eventsboard',
            name='interested_users',
        ),
        migrations.AddField(
            model_name='eventsboard',
            name='interested_users',
            field=models.ManyToManyField(null=True, related_name='intereted_user_name', to=settings.AUTH_USER_MODEL),
        ),
        migrations.RemoveField(
            model_name='eventsboard',
            name='participants',
        ),
        migrations.AddField(
            model_name='eventsboard',
            name='participants',
            field=models.ManyToManyField(null=True, related_name='participant_name', to=settings.AUTH_USER_MODEL),
        ),
    ]

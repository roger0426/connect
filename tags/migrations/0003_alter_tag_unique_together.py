# Generated by Django 3.2 on 2021-05-23 07:56

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('tags', '0002_tag_is_hidden'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='tag',
            unique_together={('text', 'user')},
        ),
    ]

# Generated by Django 3.2 on 2021-06-04 06:56

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events_board', '0006_alter_comment_for_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='eventsboard',
            name='due_date',
            field=models.DateField(default=datetime.date.today, null=True),
        ),
        migrations.AddField(
            model_name='eventsboard',
            name='requirements',
            field=models.JSONField(default=''),
            preserve_default=False,
        ),
    ]

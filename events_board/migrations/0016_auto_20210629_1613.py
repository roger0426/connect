# Generated by Django 3.2 on 2021-06-29 08:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events_board', '0015_auto_20210625_2133'),
    ]

    operations = [
        migrations.AlterField(
            model_name='comment',
            name='text',
            field=models.CharField(max_length=50),
        ),
        migrations.AlterField(
            model_name='eventsboard',
            name='subtitle',
            field=models.CharField(blank=True, max_length=40),
        ),
        migrations.AlterField(
            model_name='eventsboard',
            name='title',
            field=models.CharField(max_length=30),
        ),
    ]

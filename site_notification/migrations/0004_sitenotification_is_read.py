# Generated by Django 3.2 on 2021-06-03 03:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('site_notification', '0003_alter_sitenotification_event'),
    ]

    operations = [
        migrations.AddField(
            model_name='sitenotification',
            name='is_read',
            field=models.BooleanField(default=False),
        ),
    ]
# Generated by Django 3.2 on 2021-06-29 08:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('site_notification', '0004_sitenotification_is_read'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sitenotification',
            name='notification_type',
            field=models.IntegerField(default=-1),
        ),
    ]

# Generated by Django 3.2 on 2021-05-15 03:25

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='SiteNotification',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.CharField(max_length=40)),
                ('date', models.DateTimeField(default=django.utils.timezone.now)),
                ('for_user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='received_notification', to=settings.AUTH_USER_MODEL)),
                ('from_user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sent_notification', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
# Generated by Django 3.2 on 2021-06-06 02:27

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('tags', '0006_delete_eventtag'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tagcomment',
            name='author',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='tag_comments', to=settings.AUTH_USER_MODEL),
        ),
    ]

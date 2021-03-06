# Generated by Django 3.2 on 2021-05-16 13:13

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='UserExtend',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('full_name', models.CharField(default='', max_length=10)),
                ('img', models.ImageField(default='user/user_img_default.png', upload_to='user/')),
                ('personal_description', models.TextField(default='喔喔，看來他還沒想好介紹', max_length=400)),
                ('school', models.CharField(default='國立成功大學', max_length=20)),
                ('department', models.CharField(default='電機工程學系', max_length=20)),
                ('grade', models.CharField(choices=[('freshman', '一年級'), ('sophomore', '二年級'), ('junior', '三年級'), ('senior', '四年級'), ('graduate', '研究生')], default='freshman', max_length=9)),
                ('friends', models.ManyToManyField(blank=True, related_name='friends', to=settings.AUTH_USER_MODEL)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]

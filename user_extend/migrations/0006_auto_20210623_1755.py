# Generated by Django 3.2 on 2021-06-23 09:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_extend', '0005_alter_userextend_img'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userextend',
            name='department',
            field=models.CharField(default='未設定系所', max_length=20),
        ),
        migrations.AlterField(
            model_name='userextend',
            name='grade',
            field=models.CharField(default='未設定年級', max_length=9),
        ),
    ]

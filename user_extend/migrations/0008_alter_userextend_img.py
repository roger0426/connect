# Generated by Django 3.2 on 2021-06-26 02:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_extend', '0007_alter_userextend_full_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userextend',
            name='img',
            field=models.ImageField(default='media/user/user_img_default_xanio9.png', upload_to='user/'),
        ),
    ]
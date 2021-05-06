# Generated by Django 3.2 on 2021-05-06 05:34

from django.db import migrations, models
import django.db.models.deletion
import taggit.managers


class Migration(migrations.Migration):

    dependencies = [
        ('taggit', '0003_taggeditem_add_unique_index'),
        ('user_extend', '0008_auto_20210504_1259'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='userextend',
            name='tags',
        ),
        migrations.CreateModel(
            name='TaggedSkills',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content_obj', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='user_extend.userextend')),
                ('tag', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_extend_taggedskills_items', to='taggit.tag')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='TaggedPersonalities',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content_obj', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='user_extend.userextend')),
                ('tag', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_extend_taggedpersonalities_items', to='taggit.tag')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='TaggedInterests',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content_obj', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='user_extend.userextend')),
                ('tag', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_extend_taggedinterests_items', to='taggit.tag')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.AddField(
            model_name='userextend',
            name='interests_tag',
            field=taggit.managers.TaggableManager(help_text='A comma-separated list of tags.', related_name='interests', through='user_extend.TaggedInterests', to='taggit.Tag', verbose_name='Tags'),
        ),
        migrations.AddField(
            model_name='userextend',
            name='personalities_tag',
            field=taggit.managers.TaggableManager(help_text='A comma-separated list of tags.', related_name='personalities', through='user_extend.TaggedPersonalities', to='taggit.Tag', verbose_name='Tags'),
        ),
        migrations.AddField(
            model_name='userextend',
            name='skills_tag',
            field=taggit.managers.TaggableManager(help_text='A comma-separated list of tags.', related_name='skills', through='user_extend.TaggedSkills', to='taggit.Tag', verbose_name='Tags'),
        ),
    ]

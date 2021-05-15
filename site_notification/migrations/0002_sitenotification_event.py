# Generated by Django 3.2 on 2021-05-15 08:18

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('events_board', '0001_initial'),
        ('site_notification', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='sitenotification',
            name='event',
            field=models.ForeignKey(blank=True, default=1, on_delete=django.db.models.deletion.CASCADE, related_name='notification', to='events_board.eventsboard'),
            preserve_default=False,
        ),
    ]
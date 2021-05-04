from django.db import models
from django.conf import settings
from taggit.managers import TaggableManager

# Create your models here.
class EventsBoard(models.Model):
  # basic information
  title = models.CharField(max_length=50)
  subtitle = models.CharField(max_length=70)
  detail = models.TextField()
  event_tag = TaggableManager()
  image = models.ImageField(upload_to='events', blank=True)

  #about people
  host = models.ForeignKey(
    "user_extend.UserExtend",
    on_delete=models.CASCADE, # delete when author deleted
    related_name="event_host_name",
    default = '',
    null=True
  )

  participants = models.ManyToManyField(
    "user_extend.UserExtend",
    related_name="event_participant_name",
    default = '',
    blank = True,
  )

  interested_users = models.ManyToManyField(
    "user_extend.UserExtend",
    related_name="event_intereted_user_name",
    default = '',
    blank = True,
  )

class ProjectBoard(models.Model):
  # basic information
  title = models.CharField(max_length=50)
  subtitle = models.CharField(max_length=70)
  detail = models.TextField()
  event_tag = TaggableManager()
  image = models.ImageField(upload_to='projects', blank=True)

  #about people
  host = models.ForeignKey(
    "user_extend.UserExtend",
    on_delete=models.CASCADE, # delete when author deleted
    related_name="project_host_name",
  )

  participants = models.ManyToManyField(
    "user_extend.UserExtend",
    related_name="project_participant_name",
    blank = True,
  )

  interested_users = models.ManyToManyField(
    "user_extend.UserExtend",
    related_name="project_intereted_user_name",
    blank = True,
  )

class PersonalBoard(models.Model):
  title = models.CharField(max_length=50)
  subtitle = models.CharField(max_length=70)
  detail = models.TextField()
  event_tag = TaggableManager()
  image = models.ImageField(upload_to='personal, blank=True')

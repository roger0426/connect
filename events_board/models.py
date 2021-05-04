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

  #about people
  host = models.ForeignKey(
    settings.AUTH_USER_MODEL,
    on_delete=models.CASCADE, # delete when author deleted
    related_name="host_name",
  )

  participants = models.ManyToManyField(
    settings.AUTH_USER_MODEL,
    related_name="participant_name",
    blank = True,
  )

  interested_users = models.ManyToManyField(
    settings.AUTH_USER_MODEL,
    related_name="intereted_user_name",
    blank = True,
  )

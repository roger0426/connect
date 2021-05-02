from django.db import models
from django.conf import settings

# Create your models here.
class EventsBoard(models.Model):
  # basic information
  title = models.CharField(max_length=50)
  subtitle = models.CharField(max_length=70)
  detail = models.TextField()

  #about people
  host = models.ForeignKey(
    settings.AUTH_USER_MODEL,
    on_delete=models.CASCADE, # delete when author deleted
    related_name="host_name",
  )

  participants = models.ForeignKey(
    settings.AUTH_USER_MODEL,
    on_delete=models.CASCADE,
    related_name="participant_name",
  )

  interested_users = models.ForeignKey(
    settings.AUTH_USER_MODEL,
    on_delete=models.CASCADE,
    related_name="intereted_user_name",
  )

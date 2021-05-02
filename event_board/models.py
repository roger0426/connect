from django.db import models
from django.conf import settings

# Create your models here.
class EventBoard(models.Model):
  # basic information
  title = models.CharField(max_length=8)
  subtitle = models.CharField(max_length=30)
  detail = models.TextField()

  #about people
  host = models.ForeignKey(
    settings.AUTH_USER_MODEL,
    on_delete=models.CASCADE, # delete when author deleted
  )

  participants = models.ForeignKey(
    settings.AUTH_USER_MODEL,
    on_delete=models.CASCADE,
  )

  interested_users = models.ForeignKey(
    settings.AUTH_USER_MODEL,
    on_delete=models.CASCADE,
  )

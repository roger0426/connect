from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User

# Create your models here.
class SiteNotification(models.Model):
  text = models.CharField(max_length=40)
  for_user = models.ForeignKey(
    User,
    on_delete=models.CASCADE, 
    related_name='received_notification'
  )
  from_user = models.ForeignKey(
    User,
    on_delete=models.CASCADE,
    related_name='sent_notification'
  )
  event = models.ForeignKey(
    'events_board.EventsBoard',
    on_delete = models.CASCADE,
    related_name = 'notification',
    blank = True, 
    null = True
  )
  date = models.DateTimeField(default=timezone.now)

  #-1: none
  # 0: event notification
  # 1: friend notification
  notification_type = models.IntegerField(default=-1)
  is_read = models.BooleanField(default=False)

  def __str__(self):
    return self.from_user.username + "-" + self.for_user.username + "-" + self.text

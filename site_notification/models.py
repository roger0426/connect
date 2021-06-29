from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
import datetime

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
  # 2: tag notification
  notification_type = models.IntegerField(default=-1)
  is_read = models.BooleanField(default=False)

  def delta_time(self):
    current_time = datetime.datetime.utcnow()
    naive = self.date.replace(tzinfo=None)
    delta = current_time - naive
    seconds_in_day = 24 * 60 * 60
    mins, secs = divmod(delta.days * seconds_in_day + delta.seconds, 60)
    hours = mins // 60
    days = hours // 24

    if days > 0:
      return str(days) + "天前"
    if hours > 0:
      return str(hours) + "小時前"
    if mins > 0:
      return str(mins) + "分鐘前"
    return str(secs) + "秒前"
    

  def __str__(self):
    return self.from_user.username + "-" + self.for_user.username + "-" + self.text

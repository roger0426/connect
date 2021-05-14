from django.db import models
from django.conf import settings
from datetime import date
from django.utils import timezone

class IntegerRangeField(models.IntegerField):
    def __init__(self, verbose_name=None, name=None, min_value=None, max_value=None, **kwargs):
        self.min_value, self.max_value = min_value, max_value
        models.IntegerField.__init__(self, verbose_name, name, **kwargs)
    def formfield(self, **kwargs):
        defaults = {'min_value': self.min_value, 'max_value':self.max_value}
        defaults.update(kwargs)
        return super(IntegerRangeField, self).formfield(**defaults)

class EventsBoard(models.Model):
  # basic information
  title = models.CharField(max_length=15)
  subtitle = models.CharField(max_length=25, blank=True)
  detail = models.TextField()
  image = models.ImageField(upload_to='events/', blank=True)
  create_date = models.DateField(default = date.today)
  event_date = models.DateField(default = date.today)
  people_limit = IntegerRangeField(min_value=1, max_value=999)
  likes = models.ManyToManyField("user_extend.UserExtend", related_name='event_like', blank=True)
  
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


  EVENT_CHOICES = [
    ('activity', '活動'),
    ('project', '專案'),
    ('personal', '個人專案')
  ]

  event_type = models.CharField(max_length=10, choices=EVENT_CHOICES, default='activity')

  def number_of_comments(self):
    return self.comments.count()

  def number_of_likes(self):
    return self.likes.count()
  
  def number_of_participants(self):
    return self.participants.count()
  
  def get_avg_rating(self):
    comments = Comment.objects.filter(for_event=self)
    count = len(comments)
    sum = 0
    for comment in comments:
      sum += comment.rate
    return (sum/count)
  def __str__(self):
    return self.title


class Comment(models.Model):
  text = models.CharField(max_length=40)
  for_event = models.ForeignKey(
    EventsBoard,
    on_delete=models.CASCADE, 
    related_name='comments'
  )
  author = models.ForeignKey(
    "user_extend.UserExtend",
    on_delete = models.CASCADE,
    related_name='comments'
  )
  rate = IntegerRangeField(min_value=1, max_value=10)
  date = models.DateTimeField(default=timezone.now)
  def __str__(self):
    return self.text


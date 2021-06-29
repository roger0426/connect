from django.db import models
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
  title = models.CharField(max_length=30)
  subtitle = models.CharField(max_length=40, blank=True)
  detail = models.TextField()
  image = models.ImageField(upload_to='events/', blank=True)
  manual_closed = models.BooleanField(default=False)

  # date fields
  create_date = models.DateField(default = date.today)
  event_date = models.DateField(default = date.today, blank=True, null=True)
  due_date = models.DateField(default = date.today, blank=False, null=True)

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
  requirements_str = models.CharField(
    max_length=100,
    blank=True,
  )

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
    return format((sum/count), '.1f')

  def delta_date(self):
    if not self.event_date:
      return -1000
    delta = self.event_date - date.today()
    return delta.days
  
  def is_closed(self):
    return self.delta_date() < 0 or self.manual_closed

  def __str__(self):
    return self.title

# After event held comment
class Comment(models.Model):
  text = models.CharField(max_length=50)
  for_event = models.ForeignKey(
    EventsBoard,
    on_delete=models.CASCADE, 
    related_name='event_comments'
  )
  for_user = models.ForeignKey(
    "user_extend.UserExtend",
    on_delete=models.CASCADE,
    related_name='event_comments',
    blank=False,
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

# Comment messages on the board
class BoardMessage(models.Model):
  text = models.CharField(max_length=100)
  for_event = models.ForeignKey(
    EventsBoard,
    on_delete=models.CASCADE, 
    related_name='board_message'
  )
  author = models.ForeignKey(
    "user_extend.UserExtend",
    on_delete = models.CASCADE,
    related_name='board_message'
  )
  date = models.DateTimeField(default=timezone.now)
  def __str__(self):
    return self.for_event.title + "-" + self.author.user.username + "-" + self.text

# Application to specific event
class Apply(models.Model):
  for_event = models.ForeignKey(
    EventsBoard,
    on_delete = models.CASCADE,
    related_name = 'applications'
  )
  applicant = models.ForeignKey(
    "user_extend.UserExtend",
    on_delete = models.CASCADE,
    related_name = "applications"
  )
  reason = models.CharField(max_length=300)
  abilities = models.CharField(max_length=100)
  # apply status
  # 0: not apply
  # 1: applied, under checking
  # 2: applied, approved
  # 3: applied, rejected
  # 4: event closed
  status = models.IntegerField(default=1)
  date = models.DateTimeField(default=timezone.now)
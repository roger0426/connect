from django.db import models
from django.contrib.auth.models import User
from taggit.managers import TaggableManager
from events_board.models import EventsBoard

class UserExtend(models.Model):
  user = models.OneToOneField(User, on_delete = models.CASCADE)
  full_name = models.CharField(max_length=10, default='')

  # tags
  tag = TaggableManager()

  personal_description = models.TextField(
    max_length=400,
    default='喔喔，看來他還沒想好介紹')

  school = models.CharField(
    max_length=20,
    default='國立成功大學'
  )
  department = models.CharField(
    max_length=20,
    default='電機工程學系'
  )

  YEAR_IN_SCHOOL_CHOICE = [
    ('freshman', '一年級'),
    ('sophomore', '二年級'),
    ('junior', '三年級'),
    ('senior', '四年級'),
    ('graduate', '研究生'),
  ]

  grade = models.CharField(
    max_length = 9,
    choices = YEAR_IN_SCHOOL_CHOICE,
    default = 'freshman'
  )

  friends = models.ManyToManyField(
    User,
    related_name = 'friends',
    blank = True
  )

  events = models.ForeignKey(
    EventsBoard,
    on_delete = models.CASCADE,
    related_name = 'events',
    default = '',
    blank = True,
    null = True
  )
  def __str__(self):
       return "User {0}".format(self.user.username)

  

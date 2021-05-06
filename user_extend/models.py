from django.db import models
from django.contrib.auth.models import User
from taggit.managers import TaggableManager
from taggit.models import TaggedItemBase
from events_board.models import EventsBoard, ProjectBoard, PersonalBoard

class TaggedPersonalities(TaggedItemBase):
  content_obj = models.ForeignKey(
    "UserExtend",
    on_delete = models.CASCADE
  )

class TaggedSkills(TaggedItemBase):
  content_obj = models.ForeignKey(
    "UserExtend",
    on_delete = models.CASCADE
  )

class TaggedInterests(TaggedItemBase):
  content_obj = models.ForeignKey(
    "UserExtend",
    on_delete = models.CASCADE
  )

class UserExtend(models.Model):
  user = models.OneToOneField(User, on_delete = models.CASCADE)
  full_name = models.CharField(max_length=10, default='')

  # tags
  personalities_tag = TaggableManager(through=TaggedPersonalities, related_name='personalities')
  skills_tag = TaggableManager(through=TaggedSkills, related_name='skills')
  interests_tag = TaggableManager(through=TaggedInterests, related_name='interests')

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

  projects = models.ForeignKey(
    ProjectBoard,
    on_delete = models.CASCADE,
    related_name = 'projects',
    default = '',
    blank = True,
    null = True
  )

  personal = models.ForeignKey(
    PersonalBoard,
    on_delete = models.CASCADE,
    related_name = 'personal',
    default = '',
    blank = True,
    null = True
  )

  

from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

class Tag(models.Model):
  text = models.CharField(max_length=10)
  # link with user
  user = models.ForeignKey(
    User,
    related_name="tags",
    on_delete= models.CASCADE,
  )

  # type for the tag
  TYPE_CHOICE = [
    ('個性', '個性'),
    ('專長', '專長'),
    ('有興趣的活動', '有興趣的活動')
  ]
  tag_type = models.CharField(
    max_length=8,
    choices=TYPE_CHOICE,
    default='活動',
  )

  is_hidden = models.BooleanField(default = False)

  def number_of_comments(self):
    return self.comments.count()

  def __str__(self):
    return self.user.username + ' - ' + self.tag_type + ' - ' + self.text

class TagComment(models.Model):
  text = models.CharField(max_length=40)
  for_tag = models.ForeignKey(
    Tag,
    on_delete=models.CASCADE, 
    related_name='comments'
  )
  author = models.ForeignKey(
    User,
    on_delete = models.CASCADE,
    related_name='tag_comments'
  )
  date = models.DateTimeField(default=timezone.now)
  def __str__(self):
    return self.text
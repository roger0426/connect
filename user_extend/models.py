from django.db import models
from django.contrib.auth.models import User
from events_board.models import EventsBoard

class UserExtend(models.Model):
  user = models.OneToOneField(User, on_delete = models.CASCADE)
  full_name = models.CharField(max_length=10, default='')
  img = models.ImageField(upload_to='user/', default='user/user_img_default_xanio9.png')

  personal_description = models.TextField(
    max_length=300,
    default='喔喔，看來他還沒想好介紹')

  school = models.CharField(
    max_length=20,
    default='國立成功大學'
  )
  department = models.CharField(
    max_length=20,
    default='未設定系所'
  )

  grade = models.CharField(
    max_length = 9,
    default = '未設定年級'
  )

  unverified_friends = models.ManyToManyField(
    User,
    related_name = 'unverified_friends',
    blank = True
  )

  friends = models.ManyToManyField(
    User,
    related_name = 'friends',
    blank = True
  )

  events = models.ForeignKey(
    EventsBoard,
    on_delete = models.CASCADE,
    related_name = 'user',
    default = '',
    blank = True,
    null = True
  )

  @property
  def image_url(self):
    from django.contrib.sites.models import Site

    domain = Site.objects.get_current().domain
    url = 'http://{domain}'.format(domain=domain)

    if self.img and hasattr(self.img, 'url'):
      return url + self.img.url
  
  def __str__(self):
    return "User {0}".format(self.user.username)


from django.db import models
from django.contrib.auth.models import User
from taggit.managers import TaggableManager

# Create your models here.
class UserExtend(models.Model):
  user = models. OneToOneField(User, on_delete = models.CASCADE)
  tags = TaggableManager() # for tags of the user

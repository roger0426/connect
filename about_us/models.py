from django.db import models

# Create your models here.
class About(models.Model):
  name = models.CharField(max_length=8)
  job = models.CharField(max_length=10)
  skill = models.CharField(max_length=40)
  hobby = models.CharField(max_length=40)

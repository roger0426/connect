from django.contrib import auth
from django.contrib.auth.models import User
from django.shortcuts import render
from django.http import HttpResponseRedirect 
from django.db.models.signals import post_save
from django.dispatch import receiver
from user_extend.models import UserExtend
import time


def login_view(request, *args, **kwargs):
  time.sleep(0.4)
  if request.user.is_authenticated:
    return HttpResponseRedirect('/')

  username = request.POST.get('username', '')
  password = request.POST.get('password', '')

  fname = request.POST.get('fname', '')
  lname = request.POST.get('lname', '')
  sid   = request.POST.get('sid', '')
  email = request.POST.get('email', '')
  sign_pwd = request.POST.get('sign-pwd', '')
  double_pwd = request.POST.get('double-pwd', '')

  if 'terms' in request.POST and sign_pwd == double_pwd:
    user = User.objects.create_user(
      email = email,
      username = sid,
      first_name = fname,
      last_name = lname,
      password = sign_pwd
    )
    user.save()
    auth.login(request, user)
    return HttpResponseRedirect('/')
    print(sid, "[INFO] account create successfully")
  else:
    print("[INFO] something went wrong, check term or password")

  user = auth.authenticate(username=username, password=password)

  if user is not None and user.is_active:
    auth.login(request, user)
    return HttpResponseRedirect('/')
  else:
    return render(request, 'login.pug', {})

@receiver(post_save, sender=User)
def create_extends(sender, instance, created, **kwargs):
    if created:
        UserExtend.objects.create(user=instance)
  
def home_view(request):
  return render(request, 'homepage.pug', {})
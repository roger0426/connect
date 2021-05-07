from django.contrib import auth
from django.contrib.auth.models import User
from django.shortcuts import render
from django.http import HttpResponseRedirect 
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

    print(sid, "account create successfully")
  else:
    print("something went wrong, check term or password")


  print(fname)

  
  user = auth.authenticate(username=username, password=password)

  if user is not None and user.is_active:
    auth.login(request, user)
    return HttpResponseRedirect('/')
  else:
    return render(request, 'login.pug', {})

  
def home_view(request):
  return render(request, 'homepage.pug', {})
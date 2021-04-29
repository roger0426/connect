from django.contrib import auth
from django.contrib.auth.models import User
from django.shortcuts import render
from django.http import HttpResponseRedirect 

def login_view(request, *args, **kwargs):

  if request.user.is_authenticated:
    return HttpResponseRedirect('/')

  username = request.POST.get('username', '')
  password = request.POST.get('password', '')

  fname = request.POST.get('fname', '')
  lname = request.POST.get('lname', '')
  sid   = request.POST.get('sid', '')
  email = request.POST.get('email', '')
  sign_pwd = request.POST.get('sign-pwd', '')

  if 'terms' in request.POST:
    user = User.objects.create_user(
      email = email,
      username = sid,
      first_name = fname,
      last_name = lname,
      password = sign_pwd
    )
    user.save()

    print(sid, "account create successfully")


  print(fname)

  user = auth.authenticate(username=username, password=password)

  if user is not None and user.is_active:
    auth.login(request, user)
    return HttpResponseRedirect('/')
  else:
    return render(request, 'login.pug', {})
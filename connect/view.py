from django.contrib import auth
from django.shortcuts import render
from django.http import HttpResponseRedirect 

def login(request, *args, **kwargs):

  if request.user.is_authenticated:
    return HttpResponseRedirect('/')

  username = request.POST.get('username', '')
  password = request.POST.get('password', '')

  print(request.POST.get('username', ''))

  user = auth.authenticate(username=username, password=password)

  # if user is not None and user.is_active:
  #   auth.login(request, user)
  #   return HttpResponseRedirect('/')
  # else:
  return render(request, 'login.pug', {})
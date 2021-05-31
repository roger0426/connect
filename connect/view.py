from django.contrib import auth
from django.contrib.auth.models import User
from django.shortcuts import render
from django.http import HttpResponseRedirect, JsonResponse
from user_extend.models import UserExtend
from django.core.mail import EmailMessage
from django.template.loader import render_to_string
from django.conf import settings
import time
import hashlib

def hash_func(sid, email):
  m = hashlib.md5()
  data = email + sid
  m.update(data.encode("utf-8"))
  h = m.hexdigest()
  return h[3:10]

def send_verification_view(request):
  data = request.POST
  token = hash_func(data.get('sid'), data.get('email'))
  email_template = render_to_string(
    'email/verification.html',
    {
      'sid': data.get('sid'),
      'token': token
    }
  )
  email = EmailMessage(
    'Connect 註冊認證通知信',  # title
    email_template,  # content
    settings.EMAIL_HOST_USER,  # sender
    [data.get('email')]  # reciever
  )
  email.fail_silently = False
  email.send()
  print("Email Sent")
  return JsonResponse({
    'status': 200
  })


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
  email_check = request.POST.get('email-check', '')
  sign_pwd = request.POST.get('sign-pwd', '')
  double_pwd = request.POST.get('double-pwd', '')

  if User.objects.filter(username=sid).exists():
    return render(request, 'login.pug', {'error_message': "這個帳號已經被註冊過了"})
  if User.objects.filter(email=email).exists():
    return render(request, 'login.pug', {'error_message': "這個信箱已經被使用過了"})

  email_hash = ''
  if sid != '' and email != '':
    email_hash = hash_func(sid, email)

  if 'terms' in request.POST and sign_pwd == double_pwd and email_check == email_hash:
    user = User.objects.create_user(
      email = email,
      username = sid,
      first_name = fname,
      last_name = lname,
      password = sign_pwd
    )
    user.save()
    user_extend = UserExtend.objects.create(
      user = user,
      full_name = fname + lname,
    )
    user_extend.save()
    auth.login(request, user)
    print(sid, "[INFO] account create successfully")
    return HttpResponseRedirect('/')
  else:
    print("[INFO] something went wrong, check term or password")

  user = auth.authenticate(username=username, password=password)

  if user is not None and user.is_active:
    auth.login(request, user)
    return HttpResponseRedirect('/')
  else:
    return render(request, 'login.pug', {})

  
def home_view(request):
  return render(request, 'homepage.pug', {})

def logout(request):
  auth.logout(request)
  return HttpResponseRedirect('/')

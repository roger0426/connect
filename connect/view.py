from django.contrib import auth
from django.contrib.auth.models import User
from django.shortcuts import render
from django.http import HttpResponseRedirect, JsonResponse
from user_extend.models import UserExtend
from django.core.mail import EmailMessage
from django.template.loader import render_to_string
from django.conf import settings
from .utils import is_all_chinese, input_format
import hashlib

def hash_func(sid, email):
  m = hashlib.md5()
  data = email + sid
  m.update(data.encode("utf-8"))
  h = m.hexdigest()
  return h[3:10]

def send_verification_view(request):
  data = request.POST
  clean_sid = input_format(data.get('sid'))
  clean_email = input_format(data.get('email'))

  token = hash_func(clean_sid, clean_email)
  email_template = render_to_string(
    'email/verification.html',
    {
      'sid': data.get('sid'),
      'token': token
    }
  )
  if clean_sid == '' or clean_email == '':
    return JsonResponse({
      'status': 500,
      'error_message': "[Error] Null input of sid or email"
    })
  email = EmailMessage(
    'Connect 註冊認證通知信',  # title
    email_template,  # content
    settings.EMAIL_HOST_USER,  # sender
    [clean_email]  # reciever
  )
  email.fail_silently = False
  email.send()
  print("Email Sent")
  return JsonResponse({
    'status': 200
  })

def signup_view(request):
  if request.method == 'POST':
    fname = input_format(request.POST.get('fname'))
    lname = input_format(request.POST.get('lname'))
    sid   = input_format(request.POST.get('sid'))
    email = input_format(request.POST.get('email'))
    email_check = input_format(request.POST.get('email-check'))
    sign_pwd = input_format(request.POST.get('sign-pwd'))
    double_pwd = input_format(request.POST.get('double-pwd'))

    if User.objects.filter(username=sid).exists():
      return JsonResponse({
        'status': 500,
        'error_message': "這個帳號已經被註冊過了"
      })
    if User.objects.filter(email=email).exists():
      return JsonResponse({
        'status': 500, 
        'error_message': "這個信箱已經被使用過了"
      })
    
    email_hash = ''
    if sid != '' and email != '':
      email_hash = hash_func(sid, email)
    
    if email_check != email_hash:
      return JsonResponse({
        'status': 500, 
        'error_message': "請輸入正確驗證碼"
      })

    if sign_pwd == double_pwd:
      user = User.objects.create_user(
        email = email,
        username = sid,
        first_name = fname,
        last_name = lname,
        password = sign_pwd
      )
      user.save()
      if not is_all_chinese(fname + lname):
        full_name = fname + " " + lname
      else:
        full_name = fname + lname
      user_extend = UserExtend.objects.create(
        user = user,
        full_name = full_name,
      )
      user_extend.save()
      auth.login(request, user)
      print(sid, "[INFO] account create successfully")
      return JsonResponse({
        'status': 200
      })
    else:
      return JsonResponse({
        'status': 500, 
        'error_message': "第二次密碼打錯囉！"
      })


def login_view(request, *args, **kwargs):
  if request.user.is_authenticated:
    return HttpResponseRedirect('/')
  else:
    return render(request, 'login.pug', {})

def login_request_view(request):
  if request.method == 'POST':
    username = input_format(request.POST.get('username'))
    password = input_format(request.POST.get('password'))
    user = auth.authenticate(username=username, password=password)
    if user is not None and user.is_active:
      auth.login(request, user)
      return JsonResponse({
        'status': 200
      })
    else:
      return JsonResponse({
        'status': 404,
        'error_message': '錯誤的使用者名稱或密碼，請再試一次'
      })

def home_view(request):
  return render(request, 'homepage.pug', {})

def logout(request):
  auth.logout(request)
  return HttpResponseRedirect('/')
from django.shortcuts import render, get_object_or_404
from .models import SiteNotification
from django.contrib.auth.models import User
from django.http import JsonResponse

# Create your views here.
def notice_read_view(request):
  notices = request.user.received_notification.all()
  for notice in notices:
    notice.is_read = True
    notice.save()
  return JsonResponse({
    'status': 200
  })
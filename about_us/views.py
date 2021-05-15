from django.shortcuts import render
from site_notification.models import SiteNotification

# Create your views here.
def about_us_view(requests, *args, **kwargs):
  notification = SiteNotification.objects.filter(for_user = requests.user).order_by('-date')
  context = {
    'notice': notification,
  }
  return render(requests, 'about_us.pug', context)

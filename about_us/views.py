from django.shortcuts import render
from site_notification.models import SiteNotification

# Create your views here.
def about_us_view(requests, *args, **kwargs):
  if(requests.user.is_authenticated):
    notification = SiteNotification.objects.filter(for_user = requests.user).order_by('-date')
  else:
    notification = None
  context = {
    'notice': notification,
  }
  return render(requests, 'about_us.pug', context)

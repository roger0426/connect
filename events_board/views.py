from django.shortcuts import render, get_object_or_404
from django.http import HttpResponseRedirect
from django.urls import reverse
from .models import EventsBoard
from site_notification.models import SiteNotification
from .forms import EventCreateForm

# Create your views here.
def home_view(requests, *args, **kwargs):
  obj = EventsBoard.objects.order_by('-create_date')
  form = EventCreateForm(requests.POST, requests.FILES or None)
  if form.is_valid():
    instance = form.save(commit=False)
    instance.host = requests.user.userextend
    instance.save()
  
  context = {
    'event_obj': obj,
    'form': form
  }
  return render(requests, 'homepage.pug', context)


def event_detail_view(requests, id, *args, **kwargs):
  obj = EventsBoard.objects.order_by('-create_date')
  event_detail = EventsBoard.objects.get(id=id)
  form = EventCreateForm(requests.POST, requests.FILES or None)
  if form.is_valid():
    instance = form.save(commit=False)
    instance.host = requests.user.userextend
    instance.save()
    return HttpResponseRedirect('/')
  
  context = {
    'event_obj': obj,
    'form': form,
    'event_detail': event_detail
  }
  
  return render(requests, 'homepage.pug', context)

def like_view(requests, id):
  event = get_object_or_404(EventsBoard, id=requests.POST.get('event_id'))
  if event.likes.filter(id=requests.user.userextend.id).exists():
    event.likes.remove(requests.user.userextend)
  else:
    event.likes.add(requests.user.userextend)
    receiver = event.host.user
    sender = requests.user
    notification = SiteNotification.objects.create(
      text = sender.userextend.full_name + "對您的活動 '" + event.title + "' 感到有興趣， 快去看看吧",
      for_user = receiver,
      from_user = sender
    )
    notification.save()
  return HttpResponseRedirect(reverse('event_detail', args=[str(id)]))
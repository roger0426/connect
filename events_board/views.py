from django.shortcuts import render, get_object_or_404
from django.http import HttpResponseRedirect
from django.urls import reverse
from .models import EventsBoard, BoardMessage
from site_notification.models import SiteNotification
from .forms import EventCreateForm
from user_extend.models import UserExtend

# Create your views here.
def home_view(requests, *args, **kwargs):
  obj = EventsBoard.objects.order_by('-create_date')
  form = EventCreateForm(requests.POST, requests.FILES or None)
  if(requests.user.is_authenticated):
    notification = SiteNotification.objects.filter(for_user = requests.user).order_by('-date')
  else:
    notification = None

  if form.is_valid():
    instance = form.save(commit=False)
    instance.host = requests.user.userextend
    instance.save()
  
  context = {
    'event_obj': obj,
    'form': form,
    'notice': notification,
  }
  return render(requests, 'homepage.pug', context)


def event_detail_view(requests, id, *args, **kwargs):
  obj = EventsBoard.objects.order_by('-create_date')
  event_detail = EventsBoard.objects.get(id=id)
  form = EventCreateForm(requests.POST, requests.FILES or None)
  if(requests.user.is_authenticated):
    notification = SiteNotification.objects.filter(for_user = requests.user).order_by('-date')
  else:
    notification = None

  if form.is_valid():
    instance = form.save(commit=False)
    instance.host = requests.user.userextend
    instance.save()
    return HttpResponseRedirect('/')
  
  context = {
    'event_obj': obj,
    'form': form,
    'event_detail': event_detail,
    'notice': notification,
  }
  
  return render(requests, 'homepage.pug', context)

#functional view
def like_view(requests, id):
  prev_url = requests.META.get('HTTP_REFERER')
  url_split = prev_url.split('/')
  caller_type = url_split[3]

  print(url_split)
  event = get_object_or_404(EventsBoard, id=requests.POST.get('event_id'))
  if event.likes.filter(id=requests.user.userextend.id).exists():
    event.likes.remove(requests.user.userextend)
  else:
    event.likes.add(requests.user.userextend)
    receiver = event.host.user
    sender = requests.user
    notification = SiteNotification.objects.create(
      text = sender.userextend.full_name + "對您的活動感到有興趣， 快去看看吧",
      event = event,
      for_user = receiver,
      from_user = sender
    )
    notification.save()
  if caller_type == "event":
    return HttpResponseRedirect(reverse('event_detail', args=[str(id)]))
  else:
    return HttpResponseRedirect(reverse('profile_event', args=[url_split[4], str(id)]))

#functional view
def comment_view(requests, event_id, id):
  if requests.method == "POST":
    event = get_object_or_404(EventsBoard, id=event_id)
    author = UserExtend.objects.get(id=id)
    comment_obj = BoardMessage.objects.create(
      author = author,
      for_event = event,
      text = requests.POST.get('text')
    )
    comment_obj.save()
  return HttpResponseRedirect(reverse('event_detail', args=[str(event_id)]))


def search_view(requests):
  if requests.method == "GET":
    events = EventsBoard.objects.filter(
      title__contains=requests.GET.get('search'),
    )
    events_sub = EventsBoard.objects.filter(
      subtitle__contains=requests.GET.get('search'),
    )
    events_detail = EventsBoard.objects.filter(
      detail__contains=requests.GET.get('search'),
    )
    events = events.union(events_sub).union(events_detail)
    form = EventCreateForm(requests.POST, requests.FILES or None)
    if(requests.user.is_authenticated):
      notification = SiteNotification.objects.filter(for_user = requests.user).order_by('-date')
    else:
      notification = None

    if form.is_valid():
      instance = form.save(commit=False)
      instance.host = requests.user.userextend
      instance.save()
    
    context = {
      'event_obj': events,
      'form': form,
      'notice': notification,
    }
    return render(requests, 'homepage.pug', context)

  return HttpResponseRedirect('/')
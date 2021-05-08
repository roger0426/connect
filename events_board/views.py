from django.shortcuts import render, get_object_or_404
from django.http import HttpResponseRedirect
from django.urls import reverse
from .models import EventsBoard
from .forms import EventCreateForm

# Create your views here.
def home_view(requests, *args, **kwargs):
  obj = EventsBoard.objects.all()
  form = EventCreateForm(requests.POST or None)
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
  obj = EventsBoard.objects.get(id=id)
  context = {
    'event_obj': obj
  }
  return render(requests, 'event_detail.pug', context)

def like_view(requests, id):
  print(id)
  event = get_object_or_404(EventsBoard, id=requests.POST.get('event_id'))
  if event.likes.filter(id=requests.user.userextend.id).exists():
    event.likes.remove(requests.user.userextend)
  else:
    event.likes.add(requests.user.userextend)
  return HttpResponseRedirect(reverse('event_detail', args=[str(id)]))
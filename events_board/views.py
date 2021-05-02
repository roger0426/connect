from django.shortcuts import render
from django.http import HttpResponseRedirect
from .models import EventsBoard

# Create your views here.
def home_view(requests, *args, **kwargs):
  obj = EventsBoard.objects.get(id = 1)
  context = {
    'event_obj': obj,
  }
  return render(requests, 'homepage.pug', context)
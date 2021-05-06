from django.shortcuts import render
from django.http import HttpResponseRedirect
from .models import EventsBoard
from .forms import CreateEventForm

# Create your views here.
def home_view(requests, *args, **kwargs):
  obj = EventsBoard.objects.get(id = 1)
  form = CreateEventForm()
  context = {
    'event_obj': obj,
    'form': form
  }
  return render(requests, 'homepage.pug', context)
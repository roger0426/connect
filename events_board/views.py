from django.shortcuts import render
from django.http import HttpResponseRedirect
from .models import EventsBoard
from .forms import EventCreateForm

# Create your views here.
def home_view(requests, *args, **kwargs):
  obj = EventsBoard.objects.get(id = 1)
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
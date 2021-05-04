from django import forms
from .models import EventsBoard

class CreateEventForm(forms.ModelForm):

  class Meta:
    model = EventsBoard
    fields = (
      'title',
      'subtitle',
      'detail',
      'event_tag'
    )

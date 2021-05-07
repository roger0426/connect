from django import forms
from .models import EventsBoard

class EventCreateForm(forms.ModelForm):

  class Meta:
    model = EventsBoard
    fields = (
      'title',
      'subtitle',
      'event_tag',
      'detail',
      'event_type',
      'image',
    )

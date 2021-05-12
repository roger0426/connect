from django import forms
import datetime
from .models import EventsBoard


class DateInput(forms.DateInput):
    input_type = 'date'

class EventCreateForm(forms.ModelForm):

  class Meta:
    model = EventsBoard
    fields = (
      'title',
      'subtitle',
      'event_date',
      'people_limit',
      'event_type',
      'detail',
      'image',
    )
    widgets = {
      'title': forms.TextInput(attrs={'placeholder': '* 活動標題'}),
      'subtitle': forms.TextInput(attrs={'placeholder':'  活動副標題'}),
      'event_tag': forms.TextInput(attrs={'placeholder': '  標籤'}),
      'detail': forms.Textarea(attrs={'placeholder': '* 編輯文字'}),
      'people_limit': forms.NumberInput(attrs={'placeholder': '* 人數'}),
      'event_date': DateInput(),
    }

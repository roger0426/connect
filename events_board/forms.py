from django import forms
from .models import EventsBoard


class DateInput(forms.DateInput):
  input_type = 'date'

class EventCreateForm(forms.ModelForm):
  
  class Meta:
    model = EventsBoard
    fields = (
      'title',
      'subtitle',
      'detail',
      'event_date',
      'due_date',
      'people_limit',
      'requirements_str',
      'event_type',
      'image',
    )
    widgets = {
      'title': forms.TextInput(attrs={'placeholder': '* 活動標題'}),
      'subtitle': forms.TextInput(attrs={'placeholder':'  活動副標題'}),
      'event_tag': forms.TextInput(attrs={'placeholder': '  標籤'}),
      'detail': forms.Textarea(attrs={'placeholder': '* 活動細節'}),
      'people_limit': forms.NumberInput(attrs={'placeholder': '* 人數'}),
      'requirements_str': forms.TextInput(attrs={'placeholder': ' 需要能力'}),
      'event_date': forms.TextInput(attrs={'placeholder': '* 活動日期'}),
      'due_date': forms.TextInput(attrs={'placeholder': '* 報名截止'}),
    }

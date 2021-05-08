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
    widgets = {
      'title': forms.TextInput(attrs={'placeholder': '* 活動標題'}),
      'subtitle': forms.TextInput(attrs={'placeholder':'  活動副標題'}),
      'event_tag': forms.TextInput(attrs={'placeholder': '  標籤'}),
      'detail': forms.Textarea(attrs={'placeholder': '* 編輯文字'}),
    }

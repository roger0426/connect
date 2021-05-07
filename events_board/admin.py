from django.contrib import admin

from .models import EventsBoard, Comment

# Register your models here.

admin.site.register(EventsBoard)
admin.site.register(Comment)
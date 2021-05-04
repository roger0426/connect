from django.contrib import admin

from .models import EventsBoard, ProjectBoard, PersonalBoard

# Register your models here.

admin.site.register(EventsBoard)
admin.site.register(PersonalBoard)
admin.site.register(ProjectBoard)
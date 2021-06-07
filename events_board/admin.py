from django.contrib import admin

from .models import EventsBoard, Comment, BoardMessage, Apply

# Register your models here.

admin.site.register(EventsBoard)
admin.site.register(Comment)
admin.site.register(BoardMessage)
admin.site.register(Apply)
from django.contrib import admin
from .models import TagComment, Tag

# Register your models here.
admin.site.register(Tag)
admin.site.register(TagComment)
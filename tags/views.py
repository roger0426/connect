from django.shortcuts import get_object_or_404
from django.http import HttpResponseRedirect
from django.urls import reverse
from .models import Tag

# Create your views here.
def tag_delete_view(request, tag_id):
  tag_obj = get_object_or_404(Tag, id=tag_id)
  tag_obj.update(is_hidden = True)
  return HttpResponseRedirect(reverse('profile_modify', args=[str(request.user.userextend.pk)]))

from django.shortcuts import get_object_or_404
from django.http import HttpResponseRedirect, JsonResponse
from django.contrib.auth.models import User
from django.urls import reverse
from .models import Tag

# Create your views here.
def tag_delete_view(request):
  data = request.POST
  tag_obj = Tag.objects.filter(text=data.get('text')).filter(user=request.user)
  tag_obj.update(is_hidden = True)
  return JsonResponse({
    'status': 200
  })

def tag_edit_view(request):
  data = request.POST
  tag_type = data.get('type')
  user = request.user
  history_tag = Tag.objects.filter(text = data.get('text')).filter(user=request.user)
  if (data.get('text') == ''):
    return JsonResponse({
      'status': 500,
      'error_message': "Blank tag input"
    })
  if (history_tag):
    if(history_tag.filter(is_hidden=True)):
      history_tag.update(is_hidden=False)
      return JsonResponse({
        'status': 200
      })
    else:
      return JsonResponse({
        'status': 500,
        'error_message': "Duplicate Tag"
      })
  else:
    tag_type_str = ""
    if (tag_type == 'personality'):
      tag_type_str = "個性"
    elif (tag_type == 'skill'):
      tag_type_str = "專長"
    elif (tag_type == 'interest'):
      tag_type_str = "有興趣的活動"
    else:
      return JsonResponse({
        'status': 404,
        'error_message': 'No match tag type found'
      })
    new_tag = Tag.objects.create(
      text = data.get('text'),
      user = user,
      tag_type = tag_type_str
    )
    new_tag.save()

  return JsonResponse({
    'status': 200
  })
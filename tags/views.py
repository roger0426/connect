from django.shortcuts import get_object_or_404
from django.http import HttpResponseRedirect, JsonResponse
from django.contrib.auth.models import User
from django.urls import reverse
from .models import Tag, TagComment
from site_notification.models import SiteNotification

# Create your views here.
def tag_delete_view(request):
  data = request.POST
  tag_obj = Tag.objects.get(text=data.get('text'), user=request.user)
  if tag_obj.comments.count() == 0:
    tag_obj.delete()
  else:
    tag_obj.is_hidden = True
    tag_obj.save()
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

def tag_comment_view(request):
  if request.method == 'POST':
    data = request.POST
    tag = get_object_or_404(Tag, id=data.get('tag_id'))
    user = request.user
    if not TagComment.objects.filter(for_tag=tag, author=user).exists():
      tag_comment = TagComment.objects.create(
        text = data.get('text'),
        for_tag = tag,
        author = user
      )
      tag_comment.save()
      notification = SiteNotification.objects.create(
        text = "在你的專長\"{}\"上新增了認證".format(tag.text),
        from_user = user,
        for_user = tag.user,
        notification_type = 2
      )
      notification.save()
      return JsonResponse({
        'status': 200,
        'user_img_url': request.user.userextend.img.url
      })
    else:
      tag_comment = get_object_or_404(TagComment, for_tag=tag, author=user)
      if data.get('text') == "":
        tag_comment.delete()
        return JsonResponse({
          'status': 201,
          'user_img_url': request.user.userextend.img.url
        })
      tag_comment.text = data.get('text')
      tag_comment.save()
      notification = SiteNotification.objects.create(
        text = "修改了他對你的專長\"{}\"的認證".format(tag.text),
        from_user = user,
        for_user = tag.user,
        notification_type = 2
      )
      notification.save()
      return JsonResponse({
        'status': 201,
        'user_img_url': request.user.userextend.img.url
      })
  else:
    return JsonResponse({
      'status': 500,
      'error_message': '[Error] request not post, rejected'
    })
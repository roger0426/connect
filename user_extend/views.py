from django.shortcuts import render, get_object_or_404
from .models import UserExtend, EventsBoard
from django.contrib.auth.models import User
from events_board.models import Comment
from site_notification.models import SiteNotification
from tags.models import Tag
from django.core.files.storage import default_storage
from django.http import HttpResponseRedirect, JsonResponse
from django.urls import reverse
from connect.utils import input_format
# Create your views here.

# return value events that two users have joined
def get_connect_event_num(user1, user2):
  # @params user1: UserExtend
  # @params user2: User
  count = 0
  events_host = EventsBoard.objects.filter(host=user1)
  events_part = EventsBoard.objects.filter(participants = user1)
  match_events = events_host | events_part # union of two query sets
  for event in match_events.all():
    if event.host == user2.userextend or user2.userextend in event.participants.all():
      count += 1
  return count

# return number of common friends between specific user and request user's friends
def get_common_friend_count(user1, request_user):
  # @params user1: User
  # @params request_user: User
  common_count = 0
  if request_user.is_authenticated:
    request_friend_list = request_user.userextend.friends.all()
    if request_user == user1:
      return -1
    for friend in user1.userextend.friends.all():
      if friend in request_friend_list:
        common_count += 1
    return common_count
  else:
    return 0

def profile_view(request, id, *args, **kwargs):
  obj = UserExtend.objects.get(id=id)
  friend_count = obj.friends.count()

  personality_tags = obj.user.tags.filter(tag_type='個性')
  skill_tags = obj.user.tags.filter(tag_type='專長')
  interest_tags = obj.user.tags.filter(tag_type='有興趣的活動')

  skill_tups = []
  
  can_comment = True
  for tag in skill_tags:
    comment_list = []
    for comment in tag.comments.all():
      if comment.author == request.user:
        can_comment = False
      common_friend_count = get_common_friend_count(comment.author, request.user)
      connect_event_count = get_connect_event_num(comment.author.userextend, obj.user)
      comment_list.append((comment, common_friend_count, connect_event_count))
    if request.user.is_authenticated:
        skill_tups.append((tag, can_comment, comment_list))
        can_comment = True
    else:
        skill_tups.append((tag, False, comment_list))


  activities = \
    EventsBoard.objects.filter(host=obj, event_type='activity').union( \
    EventsBoard.objects.filter(participants__pk=obj.pk, event_type='activity'))
  activities = activities.order_by('-id')
  projects = \
    EventsBoard.objects.filter(host=obj, event_type='project').union( \
    EventsBoard.objects.filter(participants__pk=obj.pk, event_type='project'))
  activities = activities.order_by('-id')
  personal_projs = \
    EventsBoard.objects.filter(host=obj, event_type='personal').union( \
    EventsBoard.objects.filter(participants__pk=obj.pk, event_type='personal'))
  activities = activities.order_by('-id')

  friends = obj.friends.all()
  friend_connect_counts = \
    [ get_connect_event_num(obj, friend) for friend in obj.friends.all() ]
  common_list = []
  if request.user.is_authenticated:
    for friend in friends:
      common_count = get_common_friend_count(friend, request.user)
      common_list.append(common_count)
  else:
    common_list = [0] * len(friends)
  friend_zip = zip(friends, friend_connect_counts, common_list)

  if(request.user.is_authenticated):
    notification = SiteNotification.objects.filter(for_user = request.user).order_by('-date')
    has_unread = False
    for notice in notification.all():
      if notice.is_read == False:
        has_unread = True
        break
  else:
    has_unread = None
    notification = None

  context = {
    'user': obj,
    'personality': personality_tags,
    'skill': skill_tups,
    'interest': interest_tags,
    'friend_count': friend_count,
    'friend_zip': friend_zip,
    'activities': activities,
    'projects': projects,
    'personal_projs': personal_projs,
    'notice': notification,
    'notice_unread': has_unread
  }
  return render(request, 'profile.pug', context)


def modify(request, id):
  user = UserExtend.objects.filter(id = id)
  if(request.method == 'POST'):
    if(request.POST.get('description')):
      user.update(personal_description = 
          input_format(request.POST.get('description')))
    if(request.POST.get('department')):
      user.update(department = 
          input_format(request.POST.get('department')))
    if(request.POST.get('grade')):
      user.update(grade = 
          input_format(request.POST.get('grade')))
    if(request.FILES):
      image = request.FILES['image']
      if (user.get(id=id).img):
        user.get(id=id).img.delete()
      image_name = default_storage.save("user/" + image.name, image)
      user.update(img = image_name)
  return HttpResponseRedirect(reverse('profile', args=[str(id)]))

  
def profile_edit_view(request, id):
  if(id != request.user.userextend.id):
    return HttpResponseRedirect(
        reverse('profile_edit', args=[str(request.user.userextend.id)]))
  obj = UserExtend.objects.get(id=id)
  friend_count = obj.friends.count()

  personality_tags = obj.user.tags.filter(tag_type='個性')
  skill_tags = obj.user.tags.filter(tag_type='專長')
  interest_tags = obj.user.tags.filter(tag_type='有興趣的活動')

  activities = EventsBoard.objects.filter(host=obj).filter(event_type='activity')
  projects = EventsBoard.objects.filter(host=obj).filter(event_type='project')
  personal_projs = EventsBoard.objects.filter(host=obj).filter(event_type='personal')
  if(request.user.is_authenticated):
    notification = SiteNotification.objects.filter(for_user = request.user).order_by('-date')
    has_unread = False
    for notice in notification.all():
      if notice.is_read == False:
        has_unread = True
        break
  else:
    has_unread = None
    notification = None
  
  context = {
    'user': obj,
    'personality': personality_tags,
    'skill': skill_tags,
    'interest': interest_tags,
    'friend_count': friend_count,
    'activities': activities,
    'projects': projects,
    'personal_projs': personal_projs,
    'notice': notification,
    'notice_unread': has_unread
  }
  return render(request, 'profile_edit.pug', context)

def get_user_view(request):
  data = request.POST
  user = get_object_or_404(UserExtend, id=data.get('user_id'))
  if data.get('need_detail'):
    return JsonResponse({
      'status': 200,
      'user_name': user.full_name,
      'user_img_url': user.img.url,
      'user_department': user.department,
      'user_grade': user.grade
    })
  else:
    return JsonResponse({
      'status': 200,
      'user_name': user.full_name,
      'user_img_url': user.img.url
    })
  
def friend_request_view(request):
  data = request.POST
  if request.user.id  != data.get('user_id'):
    user = get_object_or_404(User, id=data.get('user_id'))
    request.user.userextend.unverified_friends.add(user)
    notification = SiteNotification.objects.create(
      text = "對您傳送了連結人邀請， 快去看看吧",
      for_user = user,
      from_user = request.user,
      notification_type = 1,
      is_read = False
    )
    notification.save()
    return JsonResponse({
      'status': 200,
    })
  else:
    return JsonResponse({
      'status': 500,
      'error_message': "[Error] Sending friend request to user himself"
    })

def friend_reply_view(request):
  data = request.POST
  if data.get('reply') == '1':
    # accept friend request
    user = get_object_or_404(User, id=data.get('user_id'))
    user.userextend.unverified_friends.remove(request.user)
    user.userextend.friends.add(request.user)
    request.user.userextend.friends.add(user)
    notification = SiteNotification.objects.create(
      from_user = request.user,
      for_user = user,
      text = "接受了你的連結人邀請！",
      notification_type = 1
    )
    notification.save()
    return JsonResponse({
      'status': 200,
    })
  elif data.get('reply') == '0':
    user = get_object_or_404(User, id=data.get('user_id'))
    user.userextend.unverified_friends.remove(request.user)
    return JsonResponse({
      'status': 200,
    })
  else:
    return JsonResponse({
      'status': 500,
      'error_message': "[Error] Ajax Error"
    })

def friend_remove_view(request):
  data = request.POST
  user = get_object_or_404(User, id=data.get('user_id'))
  if user in request.user.userextend.friends.all(): 
    request.user.userextend.friends.remove(user)
    user.userextend.friends.remove(request.user)
    return JsonResponse({
      'status': 200,
    })
  else:
    return JsonResponse({
      'status': 500,
      'error_message': "[Error] Ajax Error, friend not found"
    })

def send_comment_view(request):
  data = request.POST
  text = input_format(data.get('text'))
  rate = input_format(data.get('rate'))
  if text != '' and rate != '':
    event = get_object_or_404(EventsBoard, id = data.get('event_id'))
    if int(rate) > 10:
      rate = 10
    elif int(rate) < 1:
      rate = 1
    else:
      rate = rate
    comment = Comment.objects.create(
      text = text,
      for_event = event,
      author = request.user.userextend,
      rate = rate
    )
    comment.save()
    return JsonResponse({
      'status': 200,
      'text': text,
      'rate': rate,
      'user_img': request.user.userextend.img.url,
      'user_id': request.user.userextend.id,
      'user_name': request.user.userextend.full_name,
      'post_avg_rate': event.get_avg_rating()
    })
  else:
    return JsonResponse({
      'status': 401,
      'error_message': "[Error] Empty input of text or rate of the event"
    })

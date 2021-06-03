from django.shortcuts import render, get_object_or_404
from .models import UserExtend, EventsBoard
from django.contrib.auth.models import User
from events_board.models import Comment
from site_notification.models import SiteNotification
from tags.models import Tag
from django.core.files.storage import default_storage
from django.http import HttpResponseRedirect, JsonResponse
from django.urls import reverse
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

def update_profile(request, user_id):
  user = User.objects.get(pk=user_id)
  user.save()

def profile_view(requests, id, *args, **kwargs):
  obj = UserExtend.objects.get(id=id)
  friend_count = obj.friends.count()

  personality_tags = obj.user.tags.filter(tag_type='個性')
  skill_tags = obj.user.tags.filter(tag_type='專長')
  interest_tags = obj.user.tags.filter(tag_type='有興趣的活動')

  activities = EventsBoard.objects.filter(host=obj).filter(event_type='activity')
  projects = EventsBoard.objects.filter(host=obj).filter(event_type='project')
  personal_projs = EventsBoard.objects.filter(host=obj).filter(event_type='personal')

  friends = obj.friends.all()
  friend_connect_counts = [ get_connect_event_num(obj, friend) for friend in obj.friends.all() ]
  friend_zip = zip(friends, friend_connect_counts)
  if(requests.user.is_authenticated):
    notification = SiteNotification.objects.filter(for_user = requests.user).order_by('-date')
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
    'friend_zip': friend_zip,
    'activities': activities,
    'projects': projects,
    'personal_projs': personal_projs,
    'notice': notification,
    'notice_unread': has_unread
  }
  return render(requests, 'profile.pug', context)

def profile_event_view(requests, id, event_id):
  obj = UserExtend.objects.get(id=id)
  event_obj = EventsBoard.objects.get(id=event_id)
  friend_count = obj.friends.count()

  personality_tags = obj.user.tags.filter(tag_type='個性')
  skill_tags = obj.user.tags.filter(tag_type='專長')
  interest_tags = obj.user.tags.filter(tag_type='有興趣的活動')

  activities = EventsBoard.objects.filter(host=obj).filter(event_type='activity')
  projects = EventsBoard.objects.filter(host=obj).filter(event_type='project')
  personal_projs = EventsBoard.objects.filter(host=obj).filter(event_type='personal')
  if(requests.user.is_authenticated):
    notification = SiteNotification.objects.filter(for_user = requests.user).order_by('-date')
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
    'event_detail': event_obj,
    'notice': notification,
    'notice_unread': has_unread
  }
  return render(requests, 'profile.pug', context)

def modify(request, id):
  user = UserExtend.objects.filter(id = id)
  if(request.method == 'POST'):
    if(request.POST.get('description')):
      user.update(personal_description = request.POST.get('description'))
    if(request.POST.get('department')):
      user.update(department = request.POST.get('department'))
    if(request.POST.get('grade')):
      user.update(grade = request.POST.get('grade'))
    if(request.FILES):
      image = request.FILES['image']
      if (user.get(id=id).img):
        user.get(id=id).img.delete()
      image_name = default_storage.save("user/" + image.name, image)
      user.update(img = image_name)
  return HttpResponseRedirect(reverse('profile', args=[str(id)]))

  
def profile_edit_view(request, id):
  if(id != request.user.userextend.id):
    return HttpResponseRedirect(reverse('profile_edit', args=[str(request.user.userextend.id)]))
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

def get_user_view(request, id):
  user = get_object_or_404(UserExtend, id=id)
  return JsonResponse({
    'full_name': user.full_name,
    'img': user.img.url
  })

def friend_request_view(request):
  data = request.POST
  if request.user.id  != data.get('user_id'):
    user = get_object_or_404(User, id=data.get('user_id'))
    request.user.userextend.unverified_friends.add(user)
    notification = SiteNotification.objects.create(
      text = request.user.userextend.full_name + "對您傳送了連結人邀請， 快去看看吧",
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
  text = data.get('text')
  rate = data.get('rate')
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
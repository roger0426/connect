from django.shortcuts import render
from .models import UserExtend, EventsBoard
from django.contrib.auth.models import User
from events_board.models import Comment
from site_notification.models import SiteNotification
from tags.models import Tag
from django.core.files.storage import default_storage
from django.http import HttpResponseRedirect
from django.urls import reverse
# Create your views here.
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
  if(requests.user.is_authenticated):
    notification = SiteNotification.objects.filter(for_user = requests.user).order_by('-date')
  else:
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
  else:
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
  }
  return render(requests, 'profile.pug', context)

def modify(request, id):
  user = UserExtend.objects.filter(id = id)
  if(request.method == 'POST'):
    if(request.POST.get('description')):
      user.update(personal_description = request.POST.get('description'))
    if(request.FILES):
      image = request.FILES['image']
      image_name = default_storage.save("user/" + image.name, image)
      print(image_name)
      user.update(img = image_name)
    if(request.POST.get('personality')):
      history_tag = Tag.objects.filter(text = request.POST.get('personality'))
      if (history_tag):
        history_tag.update(is_hidden=False)
      else:
        new_tag = Tag.objects.create(
          text = request.POST.get('personality'),
          user = user.get(id=id).user,
          tag_type = "個性"
        )
        new_tag.save()
    
    if(request.POST.get('skill')):
      history_tag = Tag.objects.filter(text = request.POST.get('skill'))
      if (history_tag):
        history_tag.update(is_hidden=False)
      else:
        new_tag = Tag.objects.create(
          text = request.POST.get('skill'),
          user = user.get(id=id).user,
          tag_type = "專長"
        )
        new_tag.save()
    
    if(request.POST.get('interest')):
      history_tag = Tag.objects.filter(text = request.POST.get('interest'))
      if (history_tag):
        history_tag.update(is_hidden=False)
      else:
        new_tag = Tag.objects.create(
          text = request.POST.get('interest'),
          user = user.get(id=id).user,
          tag_type = "有興趣的活動"
        )
        new_tag.save()
  return HttpResponseRedirect(reverse('profile', args=[str(id)]))

  

def profile_edit_view(request, id):

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
  else:
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
  }
  return render(request, 'profile_edit.pug', context)
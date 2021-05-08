from django.shortcuts import render
from .models import UserExtend, EventsBoard
from events_board.models import Comment

# Create your views here.
def update_profile(request, user_id):
    user = User.objects.get(pk=user_id)
    user.save()

def profile_view(requests, id, *args, **kwargs):
  obj = UserExtend.objects.get(id=id)
  tags = obj.tag.all()
  personality_tags = []
  skill_tags = []
  interest_tags = []
  
  # separate different tags
  for tag in tags:
    tag_str = str(tag) # stringify
    if tag_str[0] == '0':
      personality_tags.append(tag_str[2:])
    elif tag_str[0] == '1':
      skill_tags.append(tag_str[2:])
    elif tag_str[0] == '2':
      interest_tags.append(tag_str[2:])

  activities = EventsBoard.objects.filter(host=obj).filter(event_type='activity')
  projects = EventsBoard.objects.filter(host=obj).filter(event_type='project')
  personal_projs = EventsBoard.objects.filter(host=obj).filter(event_type='personal')
  
  context = {
    'user': obj,
    'personality': personality_tags,
    'skill': skill_tags,
    'interest': interest_tags,
    'activities': activities,
    'projects': projects,
    'personal_projs': personal_projs
  }
  return render(requests, 'profile.pug', context)

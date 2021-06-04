from django.shortcuts import render, get_object_or_404
from django.http import HttpResponseRedirect, JsonResponse
from django.urls import reverse
from .models import EventsBoard, BoardMessage, Comment
from site_notification.models import SiteNotification
from .forms import EventCreateForm
from user_extend.models import UserExtend
from datetime import datetime, timedelta
from django.forms.models import model_to_dict


# Create your views here.
def home_view(requests, *args, **kwargs):
  obj = EventsBoard.objects.order_by('-create_date')
  form = EventCreateForm(requests.POST, requests.FILES or None)
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
    'event_obj': obj,
    'form': form,
    'notice': notification,
    'notice_unread': has_unread
  }

  if form.is_valid():
    instance = form.save(commit=False)
    instance.host = requests.user.userextend
    instance.save()
    return HttpResponseRedirect(reverse('home'))
  
  return render(requests, 'homepage.pug', context)
  
def event_detail_view(requests, id):
  if requests.method == "POST":
    event = get_object_or_404(EventsBoard, id=id)
    
    image_url =  event.image.url if event.image != "" else None
    event_detail = event.detail if event.detail != "" else None
    likes = list(event.likes.all().values())
    participants = list(event.participants.all().values())
    comments = list(event.board_message.all().values())
    host =  model_to_dict(event.host, fields=['id', 'full_name', 'image_url'])
    
    return JsonResponse({
      'title': event.title,
      'subtitle': event.subtitle,
      'host': host,
      'image': image_url,
      'detail': event_detail,
      'create_date': event.create_date,
      'event_date': event.event_date,
      'likes': likes,
      'participants': participants,
      'comments': comments,
      'host_id': event.host.pk,
      'host_pic': event.host.img.url,
      
      'status': 200,
      'error_message': 'No error'
    })
  return JsonResponse({
    'status': 404,
    'error_message': 'Not ajax request'
  })

# Ajax function
def like_view(request, id):
  if request.is_ajax() and request.method == 'POST':
    event = get_object_or_404(EventsBoard, id=id)
    
    #原本存在，要收回
    if event.likes.filter(id=request.user.userextend.id).exists():
      event.likes.remove(request.user.userextend)
      return JsonResponse({
        'add': False,
        'remove': True,
        'user_img_url': request.user.userextend.img.url,
        'status': 200
      })
    #原本存在，要按讚
    else:
      event.likes.add(request.user.userextend)
      receiver = event.host.user
      sender = request.user
      notification = SiteNotification.objects.create(
        text = "對您的活動感到有興趣， 快去看看吧",
        #sender.userextend.full_name +
        event = event,
        for_user = receiver,
        from_user = sender,
        is_read = False
      )
      notification.save()
      return JsonResponse({
        'add': True,
        'remove': False,
        'user_img_url': request.user.userextend.img.url,
        'user_id': request.user.userextend.id,
        'status': 200
      })
  return JsonResponse({
    'status': 404,
    'error_message': 'Not ajax request'
  })
  
# Ajax function
def comment_view(requests, event_id):
  if requests.method == "POST":
    event = get_object_or_404(EventsBoard, id=event_id)
    author = requests.user.userextend
    data = requests.POST
    if (data.get('text')) != "":
      comment_obj = BoardMessage.objects.create(
        author = author,
        for_event = event,
        text = data.get('text')
      )
      comment_obj.save()
    return JsonResponse({
      'author': author.id,
      'author_img_url': author.img.url,
      'author_name': author.full_name,
      'msg_date': (comment_obj.date + timedelta(hours=8)).strftime("%b %d, %Y, %-I:%-M %p")
    })


def search_view(requests):
  if requests.method == "GET":
    events = EventsBoard.objects.filter(
      title__contains=requests.GET.get('search'),
    )
    events_sub = EventsBoard.objects.filter(
      subtitle__contains=requests.GET.get('search'),
    )
    events_detail = EventsBoard.objects.filter(
      detail__contains=requests.GET.get('search'),
    )
    events = events.union(events_sub).union(events_detail)
    form = EventCreateForm(requests.POST, requests.FILES or None)
    if(requests.user.is_authenticated):
      notification = SiteNotification.objects.filter(for_user = requests.user).order_by('-date')
    else:
      notification = None

    if form.is_valid():
      instance = form.save(commit=False)
      instance.host = requests.user.userextend
      instance.save()
    
    context = {
      'event_obj': events,
      'form': form,
      'notice': notification,
    }
    return render(requests, 'homepage.pug', context)

  return HttpResponseRedirect('/')

def order_view(requests):
  if requests.method == 'GET':
    selected_item = requests.GET['order']
    print(selected_item)
    obj = EventsBoard.objects.order_by('-create_date')
    if (selected_item == 'newest'):
      obj = EventsBoard.objects.order_by('-create_date')
    elif (selected_item == 'recent'):
      obj = EventsBoard.objects.order_by('-event_date')
    elif (selected_item == 'most-like'):
      unsorted_obj = EventsBoard.objects.all()
      obj = sorted(unsorted_obj, key=lambda t: -t.number_of_likes())
    elif (selected_item == 'most-participant'):
      unsorted_obj = EventsBoard.objects.all()
      obj = sorted(unsorted_obj, key=lambda t: -t.number_of_participants())

    form = EventCreateForm(requests.POST, requests.FILES or None)
    if(requests.user.is_authenticated):
      notification = SiteNotification.objects.filter(for_user = requests.user).order_by('-date')
    else:
      notification = None

    if form.is_valid():
      instance = form.save(commit=False)
      instance.host = requests.user.userextend
      instance.save()
    
    context = {
      'event_obj': obj,
      'form': form,
      'notice': notification,
    }
    return render(requests, 'homepage.pug', context)

# @url: 'rate_event'
# @request parameters
# 'id': id/pk of the event
# '[participant_full_name]': comment of that participant
def rate_event_view(request):
  if request.method == 'POST':
    data = request.POST
    event = get_object_or_404(EventsBoard, id=data.get('id'))
    if data.has_key(event.host.full_name):
      comment = Comment.objects.create(
        text = data.get(event.host.full_name),
        for_event = event,
        for_user = event.host,
        author = request.user.userextend
      )
      comment.save()
    else:
      return JsonResponse({
        'status': 404,
        'error_message': '[Error] Host comment not found'
      })
    for participant in event.participants.all():
      if data.has_key(participant.full_name):
        comment = Comment.objects.create(
          text = data.get(participant.full_name),
          for_event = event,
          for_user = participant,
          author = request.user.userextend
        )
        comment.save()
      else:
        return JsonResponse({
          'status': 404,
          'error_message': '[Error] Participant comment not found'
        })
    
    return JsonResponse({
      'status': 200,
    })
  else:
    return JsonResponse({
      'status': 500,
      'error_message': "[Error] Request not post, rejected"
    })
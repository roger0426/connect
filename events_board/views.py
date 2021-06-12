from django.shortcuts import render, get_object_or_404
from django.http import HttpResponseRedirect, JsonResponse
from django.urls import reverse
from .models import EventsBoard, BoardMessage, Comment, Apply
from site_notification.models import SiteNotification
from .forms import EventCreateForm
from user_extend.models import UserExtend
from datetime import datetime, timedelta, date
from django.forms.models import model_to_dict
from django.core.mail import EmailMessage
from django.template.loader import render_to_string
from django.conf import settings


# Create your views here.
def home_view(request, *args, **kwargs):
  obj = EventsBoard.objects.order_by('-create_date')
  form = EventCreateForm(request.POST, request.FILES or None)

  # check if there's any uncomment events
  today = date.today()
  need_comment = False
  need_comment_event = None
  if request.user.is_authenticated:
    for event in obj.all():
      if event.event_date:
        if event.event_date < today and \
        not Comment.objects.filter(for_event=event).filter(author=request.user.userextend)\
        and (request.user.userextend in event.participants.all()\
        or (event.host == request.user.userextend and event.participants.count() > 0)):
            need_comment = True
            need_comment_event = event
            break # start comment from the newest event

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
    'event_obj': obj,
    'form': form,
    'notice': notification,
    'notice_unread': has_unread,
    'need_comment': need_comment,
    'need_comment_event': need_comment_event,
  }

  if form.is_valid():
    instance = form.save(commit=False)
    instance.host = request.user.userextend
    instance.save()
    return HttpResponseRedirect(reverse('home'))
  
  return render(request, 'homepage.pug', context)
  
def event_detail_view(request, id):
  if request.method == "POST":
    event = get_object_or_404(EventsBoard, id=id)
    
    image_url =  event.image.url if event.image != "" else None
    event_detail = event.detail if event.detail != "" else None
    likes = list(event.likes.all().values())
    participants = list(event.participants.all().values())
    comments = list(event.board_message.all().values())
    requirements = event.requirements_str.split(',')
    # apply status
    # 0: not apply
    # 1: applied, under checking
    # 2: applied, approved
    # 3: applied, rejected
    join_status = 0
    for application in event.applications.all():
      if application.applicant == request.user.userextend:
        join_status = application.status
        break


    return JsonResponse({
      'title': event.title,
      'subtitle': event.subtitle,
      'image': image_url,
      'detail': event_detail,
      'create_date': event.create_date,
      'event_date': event.event_date,
      'due_date': event.due_date,
      'likes': likes,
      'participants': participants,
      'comments': comments,
      'host_id': event.host.pk,
      'host_pic': event.host.img.url,
      'host_name': event.host.full_name,
      'requirements': requirements,
      'join_status': join_status,
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
def comment_view(request, event_id):
  if request.method == "POST":
    event = get_object_or_404(EventsBoard, id=event_id)
    author = request.user.userextend
    data = request.POST
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


def search_view(request):
  if request.method == "GET":
    events = EventsBoard.objects.filter(
      title__contains=request.GET.get('search'),
    )
    events_sub = EventsBoard.objects.filter(
      subtitle__contains=request.GET.get('search'),
    )
    events_detail = EventsBoard.objects.filter(
      detail__contains=request.GET.get('search'),
    )
    events = events.union(events_sub).union(events_detail)
    form = EventCreateForm(request.POST, request.FILES or None)
    if(request.user.is_authenticated):
      notification = SiteNotification.objects.filter(for_user = request.user).order_by('-date')
    else:
      notification = None

    if form.is_valid():
      instance = form.save(commit=False)
      instance.host = request.user.userextend
      instance.save()
    
    context = {
      'event_obj': events,
      'form': form,
      'notice': notification,
    }
    return render(request, 'homepage.pug', context)

  return HttpResponseRedirect('/')

def order_view(request):
  if request.method == 'POST':
    data = request.POST
    selected_item = data.get('sort_type')

    obj = EventsBoard.objects.order_by('-create_date')
    if (selected_item == '0'):
      obj = EventsBoard.objects.order_by('-create_date')
    elif (selected_item == '1'):
      obj = EventsBoard.objects.order_by('-event_date')
    elif (selected_item == '2'):
      unsorted_obj = EventsBoard.objects.all()
      obj = sorted(unsorted_obj, key=lambda t: -t.number_of_likes())
    elif (selected_item == '3'):
      unsorted_obj = EventsBoard.objects.all()
      obj = sorted(unsorted_obj, key=lambda t: -t.number_of_participants())

    if selected_item == '2' or selected_item == '3':
      obj_id_list = []
      for event in obj:
        obj_id_list.append(event.pk)
    else:
      obj_id_list = list(obj.values_list('pk', flat=True))
      print(obj_id_list)

    return JsonResponse({
      'status': 200,
      'id_list': obj_id_list
    })
  else:
    return JsonResponse({
      'status': 500,
      'error_message': "[Error] request not post, rejected"
    })

# @url: 'rate_event'
# @request parameters
# 'id': id/pk of the event
# 'participant': list of participants
# 'comments': comment of participant
def rate_event_view(request):
  if request.method == 'POST':  
    data = request.POST
    event = get_object_or_404(EventsBoard, id=data.get('event_id'))
    if event.host.full_name in data:
      comment = Comment.objects.create(
        text = data.get(event.host.full_name),
        for_event = event,
        for_user = event.host,
        author = request.user.userextend,
        rate = -1
      )
      comment.save()
    else:
      return JsonResponse({
        'status': 404,
        'error_message': '[Error] Host comment not found'
      })
    for participant in event.participants.all():
      if participant.full_name != request.user.userextend.full_name:
        if participant.full_name in data:
          comment = Comment.objects.create(
            text = data.get(participant.full_name),
            for_event = event,
            for_user = participant,
            author = request.user.userextend,
            rate = -1
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

def join_event_view(request):
  if request.method == 'POST':
    data = request.POST
    event = get_object_or_404(EventsBoard, id=data.get('event_id'))
    if event.host == request.user.userextend:
      return JsonResponse({
        'status': 500,
        'error_message': "[Error] host cannot be applicant"
      })
    if request.user.userextend in event.participants.all():
      return JsonResponse({
        'status': 500,
        'error_message': "[Error] user has been participant"
      })
    apply = Apply.objects.create(
      for_event = event,
      applicant = request.user.userextend,
      reason = data.get('reason'),
      abilities = data.get('ability')
    )
    apply.save()

    # send notification to host email
    notification = SiteNotification.objects.create(
      text = "申請了你的活動， 快去看看吧",
      #sender.userextend.full_name +
      event = event,
      for_user = event.host.user,
      from_user = request.user,
      is_read = False
    )
    notification.save()
    email_template = render_to_string(
      'email/apply.html',
      {
        'event': event,
        'applicant': request.user.userextend.full_name,
        'ability': data.get('ability'),
        'reason': data.get('reason')
      }
    )
    email = EmailMessage(
      'Connect 新申請通知信',  # title
      email_template,  # content
      settings.EMAIL_HOST_USER,  # sender
      [event.host.user.email]  # reciever
    )
    email.fail_silently = False
    email.send()

    return JsonResponse({
      'status': 200,
    })
  else:
    return JsonResponse({
      'status': 500,
      'error_message': "[Error] request not post, rejected"
    })

def edit_event_view(request):
  if request.method == "POST":
    data = request.POST
    event = get_object_or_404(EventsBoard, id=data.get('event_id'))
    has_change = 0
    if data.get('title') != "":
      has_change = 1
      event.title = data.get('title')
    if data.get('subtitle') != "":
      has_change = 1
      event.subtitle = data.get('subtitle')
    if data.get('detail') != "":
      has_change = 1
      event.detail = data.get('detail')
    if not has_change:
      return JsonResponse({
        'status': 500,
        'error_message': '[Error] please confirm you have input some string'
      })
    event.save()
    return JsonResponse({
      'status': 200,
    })
  else:
    return JsonResponse({
      'status': 500,
      'error_message': "[Error] request not post, rejected"
    })

def delete_event_view(request):
  if request.method == "POST":
    data = request.POST
    event = get_object_or_404(EventsBoard, id=data.get('event_id'))
    event.delete()
    return JsonResponse({
      'status': 200,
    })
  else:
    return JsonResponse({
      'status': 500,
      'error_message': "[Error] request not post, rejected"
    })
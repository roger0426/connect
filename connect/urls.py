"""connect URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

from connect.view import login_view, logout, send_verification_view, signup_view
from connect.view import login_request_view, search_view
from about_us.views import about_us_view
from events_board.views import home_view, event_detail_view, like_view, join_event_view
from events_board.views import comment_view, order_view, rate_event_view
from events_board.views import edit_event_view, delete_event_view, get_apply_view
from events_board.views import reply_apply_view, end_event_view
#from user_extend.views import profile_view, profile_event_view, modify, profile_edit_view
from user_extend.views import profile_view, modify, profile_edit_view
from user_extend.views import  get_user_view, friend_request_view, friend_reply_view
from user_extend.views import  friend_remove_view, send_comment_view
from site_notification.views import notice_read_view
from tags.views import tag_delete_view, tag_edit_view, tag_comment_view
from django.contrib.auth import views as auth_views

from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', include('pwa.urls')),
    path('', home_view, name='home'),

    path('profile/<int:id>/', profile_view, name='profile'),
#    path('profile/<int:id>/event/<int:event_id>', profile_event_view, name='profile_event'),
    path('modify/<int:id>', modify, name='modify_profile'),
    path('profile/edit/<int:id>', profile_edit_view, name='profile_edit'),
    path('tag_delete/', tag_delete_view, name='tag_delete'),
    path('tag_edit/', tag_edit_view, name='tag_edit'),
    path('tag_comment/', tag_comment_view, name='tag_comment'),
    path('get_user_detail/', get_user_view, name='get_user'),
    path('friend_request/', friend_request_view, name='friend_request'),
    path('friend_reply/', friend_reply_view, name='friend_reply'),
    path('friend_remove/', friend_remove_view, name='friend_remove'),
    path('send_comment/', send_comment_view, name='send_comment'),

    path('event/<int:id>', event_detail_view, name="event_detail"),
    path('like/<int:id>', like_view, name="like"),
    path('comment/<int:event_id>', comment_view, name="comment"),
    path('rate_event/', rate_event_view, name="rate_event"),
    path('join_event/', join_event_view, name="join_event"),
    path('reply_apply/', reply_apply_view, name="reply_apply"),
    path('get_apply/', get_apply_view, name="get_apply"),
    path('edit_event/', edit_event_view, name="edit_event"),
    path('end_event/', end_event_view, name="end_event"),
    path('delete_event/', delete_event_view, name="delete_event"),
    path('order/', order_view, name="order"),

    path('login/', login_view, name='login'),
    path('login_request/', login_request_view, name='login_request'),
    path('signup/', signup_view, name='sign_up'),
    path('read_notification/', notice_read_view, name='read_notification'),
    path('verify/', send_verification_view, name='verify'),
    path('search/', search_view, name='search'),
    path('about_us/', about_us_view, name='about_us'),
    path('admin/', admin.site.urls),
    path('logout/', logout),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

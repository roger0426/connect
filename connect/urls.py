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

from connect.view import login_view, logout
from about_us.views import about_us_view
from events_board.views import home_view, event_detail_view, like_view
from events_board.views import comment_view, search_view, order_view
from user_extend.views import profile_view, profile_event_view, modify, profile_edit_view, get_user_view
from tags.views import tag_delete_view, tag_edit_view
from django.contrib.auth import views as auth_views

from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', home_view, name='home'),

    path('profile/<int:id>/', profile_view, name='profile'),
    path('profile/<int:id>/event/<int:event_id>', profile_event_view, name='profile_event'),
    path('modify/<int:id>', modify, name='modify_profile'),
    path('profile/edit/<int:id>', profile_edit_view, name='profile_edit'),
    path('tag_delete/', tag_delete_view, name='tag_delete'),
    path('tag_edit/', tag_edit_view, name='tag_edit'),
    path('get_user_detail/<int:id>', get_user_view, name='get_user'),

    path('event/<int:id>', event_detail_view, name='event_detail'),
    path('like/', like_view, name="like"),
    path('comment/event/<int:event_id>/<int:id>', comment_view, name="comment"),
    path('order/', order_view, name="order"),

    path('login/', login_view, name='login'),
    path('search/', search_view, name='search'),
    path('about_us/', about_us_view, name='about_us'),
    path('admin/', admin.site.urls),
    path('logout/', logout),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

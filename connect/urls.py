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

from connect.view import login_view, home_view
from about_us.views import about_us_view
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('', home_view, name='home'),
    #path('login/', auth_views.LoginView.as_view(template_name='./login.pug')),
    path('login/', login_view, name='login'),
    path('about_us/', about_us_view, name='about_us'),
    path('admin/', admin.site.urls),
]

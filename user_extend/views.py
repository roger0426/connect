from django.shortcuts import render

# Create your views here.
def update_profile(request, user_id):
    user = User.objects.get(pk=user_id)
    user.save()
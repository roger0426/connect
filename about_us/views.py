from django.shortcuts import render

# Create your views here.
def about_us_view(requests, *args, **kwargs):
  return render(requests, 'about_us.html', {})

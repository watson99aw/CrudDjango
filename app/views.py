from django.http.response import JsonResponse
from django.shortcuts import render
from .models import Programmer

def index(request):
    return render(request, 'index.html')


def list_programmers(request):
    programmers = list(Programmer.objects.values())
    data={'programmers':programmers}
    return JsonResponse(data)
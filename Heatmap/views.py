from django.contrib import auth
from django.shortcuts import render,redirect
from django.http import HttpResponse,Http404
import json
from django.contrib.auth.models import User
from django.http import HttpResponseRedirect
from django.conf import settings
from django.utils import timezone

from django.core import serializers

import requests
import datetime
import os


def home(request):

	string= str(request.user);	
	if(string!='AnonymousUser'):
		user=1;
	else:
		user=2;

	return render(request,'home.html',{

		'user':user
	});

def login(request):
	email = request.GET.get('email')
	password = request.GET.get('password')
	firstName = request.GET.get('firstName')
	lastName = request.GET.get('lastName')
	number = request.GET.get('number')

	user=User.objects.create(username = email, first_name=firstName,last_name=lastName,is_active=True);
	user.set_password(password)
	user.save()
	user = auth.authenticate(username = email, password = password)
	print(user)
	auth.login(request,user)
	temp = {
		'status': 1
	}
	return HttpResponse(json.dumps(temp), content_type="application/json")

def loginCustom (request):
	# pass
	email = request.GET.get('email')
	password = request.GET.get('password')
	user = auth.authenticate(username = email, password = password)
	auth.login(request,user)
	temp = {
				'url': "/"
			}		
	return HttpResponse(json.dumps(temp), content_type="application/json")

def logout(request):
	auth.logout(request);
	return HttpResponse(json.dumps({'status':1}), content_type="application/json");	


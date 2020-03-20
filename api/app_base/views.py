from rest_framework import status
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User, Group
from django.contrib.auth.decorators import login_required 
from django.shortcuts import get_object_or_404
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action, api_view
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
#Permissions
from rest_framework import permissions

from app_base.permissions import IsOwnerOrReadOnly
from app_base.serializers import *

from djoser import serializers

import logging

logger = logging.getLogger(__name__)

class UserViewSet(ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = serializers.UserSerializer
    lookup_field = "username"
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]
    lookup_value_regex = '[^/]+'

class GroupViewSet(ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]

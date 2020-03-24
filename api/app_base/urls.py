from django.urls import include, path, re_path
from rest_framework_nested import routers
from app_base import views

router = routers.DefaultRouter()

router.register(r'users', views.UserViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('api-auth/', include('rest_framework.urls')),
    re_path(r'^', include(router.urls)),
    re_path('^auth/', include('djoser.urls')),
    re_path('^auth/', include('djoser.urls.jwt')),
]

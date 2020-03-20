from django.urls import include, path, re_path
from rest_framework_nested import routers
from app_base import views

router = routers.DefaultRouter()

router.register(r'users', views.UserViewSet)
#router.register(r'clips', views.AudioClipViewSet, basename="clips")
#user_clip_router = routers.NestedDefaultRouter(router, r'users', lookup='user')
#user_clip_router.register(r'clips', views.UserAudioClipViewSet, base_name='user-clips')
#user_clip_router.register(r'clips', views.LibraryClipViewSet, base_name='library-clips')

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('api-auth/', include('rest_framework.urls')),
    re_path(r'^', include(router.urls)),
#    re_path(r'^', include(user_clip_router.urls)),
    re_path('^auth/', include('djoser.urls')),
    re_path('^auth/', include('djoser.urls.jwt')),
]

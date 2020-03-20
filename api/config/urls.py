"""
API URL Configuration
"""
from django.conf import settings
from django.contrib import admin
from django.urls import include, path, re_path
from django.conf.urls.static import static

from django.views.generic.base import RedirectView

favicon_view = RedirectView.as_view(url='/static/favicon.ico', permanent=True)

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    re_path(r'^favicon\.ico$', favicon_view),
    path('admin/', admin.site.urls),
    path('', include('app_base.urls')),
]
# static files for debug, also django_debug_toolbar crap
if settings.DEBUG:
    import debug_toolbar
    urlpatterns += [
        path('__debug__/', include(debug_toolbar.urls)),
    ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

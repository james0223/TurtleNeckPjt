"""kkobuk_api URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
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
from django.conf import settings
from django.conf.urls.static import static

from rest_auth import views

from rest_framework_jwt.views import refresh_jwt_token

urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('accounts.urls')),
    path('rooms/', include('rooms.urls')),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/signup/', include('rest_auth.registration.urls')),

    path('rest-auth/password/reset/', views.PasswordResetView.as_view(), name="password_reset"),
    path('rest-auth/password/reset/confirm/', views.PasswordResetConfirmView.as_view(), name="password_reset_confirm"),
    path('', include('django.contrib.auth.urls')),
    #jwt
    path('api-jwt-auth/refresh/', refresh_jwt_token),
]\
+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
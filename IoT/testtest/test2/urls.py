from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.index),
    path('sr/', views.sensor_read),
    path('mc/<int:level>/', views.motor_control),
]
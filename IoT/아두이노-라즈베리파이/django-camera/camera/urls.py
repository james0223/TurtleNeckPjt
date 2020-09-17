from django.urls import path
from . import views

urlpatterns = [
    path('',views.index),
    path('camera/',views.take_pic),
    path('sr/', views.sensor_read),
    path('mc/<int:level>/', views.motor_control),
]
from django.urls import path
from . import views

app_name='controls'

urlpatterns = [
    path('', views.index, name="index"),
    path('sr/', views.sensor_read, name="sensor_read"),
    path('mc/', views.motor_control, name="motor_control"),
]

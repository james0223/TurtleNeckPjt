from django.urls import path
from . import views

urlpatterns = [
    path('', views.list_or_create),
    path('<int:room_id>/', views.detail_or_in_or_out),
    path('check/', views.check),
]
from rest_framework import serializers

from .models import Room

class RoomListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('id', 'name', 'password', 'description', 'member_num', 'created_at')

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('id', 'name', 'password', 'description', 'created_at')
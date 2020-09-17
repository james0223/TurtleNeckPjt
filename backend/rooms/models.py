from django.db import models

# Create your models here.
class Room(models.Model):
    name = models.CharField(max_length=100)
    password = models.CharField(max_length=100, null=True)

    description = models.CharField(max_length=300)
    member_num = models.IntegerField(default=1)

    created_at = models.DateTimeField(auto_now_add=True)
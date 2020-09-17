from django.db import models
from django.conf import settings
from django.core.validators import MaxValueValidator, MinValueValidator
from django.contrib.auth.models import AbstractUser

from imagekit.models import ImageSpecField
from imagekit.processors import Thumbnail



from rooms.models import Room

# Create your models here.
class TimeSetting(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    # 사용자 설정 값
    total_time = models.IntegerField() # 분 단위
    work_time = models.IntegerField() # 분 단위
    break_time = models.IntegerField() # 분 단위
    # 일시정지 기록
    total_stop_time = models.IntegerField(default=0) # 초 단위
    last_stop_time = models.DateTimeField(null=True)
    # 실제 총 작업 시간
    real_work_time = models.IntegerField()

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='time_setting')

class User(AbstractUser):
    name = models.CharField(max_length=200)

    GENDER_CHOICES = [(0, 'Male'), (1, 'Female')]
    gender = models.IntegerField(default=True, choices=GENDER_CHOICES)

    # 희망 습도
    desired_humidity = models.IntegerField(default=40)
    # 가습기 자동 온오프 - true / 사용자 조작 - false
    auto_setting = models.BooleanField(default=True)
    # 가습기 사용자 조작 on / off
    humidifier_on_off = models.BooleanField(default=False)

    # 무음모드
    silent_mode = models.BooleanField(default=False)
    
    birth_date = models.DateField(null=True)

    image = models.ImageField(default='/images/default_user.png', upload_to='profile') # 업로드 경로 설정 다시 해야함! media 디렉토리
    image_thumbnail = ImageSpecField(
        source = 'image',
        processors = [Thumbnail(100,100)],
        format = 'JPEG',
        options = {'quality':60}
    )

    friends = models.ManyToManyField('self')

    room = models.ForeignKey(Room, null=True, on_delete=models.CASCADE, related_name='members')

    current_state = models.IntegerField(default=1) # 1-아무것도 안함 2-공부중 3-휴식중, 4-일시정지

    # 알림 소리 테마
    theme = models.IntegerField(default=1)

class FriendRequest(models.Model):
    sender = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='sending')
    receiver = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='receiving')

class Sensing(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='sensing')
    created_at = models.DateTimeField(auto_now_add=True)
    posture_level = models.IntegerField()
    temperature = models.FloatField()
    humidity = models.FloatField()

class Product(models.Model):
    product_key = models.CharField(max_length=200)
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)

class Inquery(models.Model):
    name = models.CharField(max_length=200)
    email = models.CharField(max_length=200)
    subject = models.CharField(max_length=200)
    message = models.CharField(max_length=1000)
    solved = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
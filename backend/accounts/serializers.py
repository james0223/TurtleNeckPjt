from django.contrib.auth import get_user_model

from rest_framework import serializers

from django.contrib.auth import get_user_model
from .models import FriendRequest, TimeSetting, Inquery, Product

from allauth.account import app_settings as allauth_settings
from allauth.utils import email_address_exists
from allauth.account.adapter import get_adapter
from allauth.account.utils import setup_user_email


class CustomRegisterSerializer(serializers.Serializer):
    email = serializers.EmailField(required=allauth_settings.EMAIL_REQUIRED)
    name = serializers.CharField(required=True, write_only=True)
    password1 = serializers.CharField(required=True, write_only=True)
    password2 = serializers.CharField(required=True, write_only=True)
    gender = serializers.IntegerField(required=True, write_only=True)
    birth_date = serializers.DateField(required=True, write_only=True)
    # product_key = serializers.CharField(required=True, write_only=True)

    def validate_email(self, email):
        email = get_adapter().clean_email(email)
        if allauth_settings.UNIQUE_EMAIL:
            if email and email_address_exists(email):
                raise serializers.ValidationError(
                    ("A user is already registered with this e-mail address."))
        return email

    def validate_password1(self, password):
        return get_adapter().clean_password(password)

    def validate(self, data):
        if data['password1'] != data['password2']:
            raise serializers.ValidationError(
                ("The two password fields didn't match."))
        return data

    def get_cleaned_data(self):
        return {
            'name': self.validated_data.get('name', ''),
            'password1': self.validated_data.get('password1', ''),
            'password2': self.validated_data.get('password2', ''),
            'email': self.validated_data.get('email', ''),
            'gender': self.validated_data.get('gender', ''),
            'birth_date': self.validated_data.get('birth_date', ''),
            # 'product_key': self.validated_data.get('product_key', ''),
        }

    def save(self, request):
        adapter = get_adapter()
        user = adapter.new_user(request)
        self.cleaned_data = self.get_cleaned_data()
        adapter.save_user(request, user, self)
        setup_user_email(request, user, [])
        user.save()
        return user

class UserListSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('id','email','name', 'image', 'current_state')
        
class TimeSettingSerializer(serializers.ModelSerializer):
    class Meta:
        model = TimeSetting
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    friends = UserListSerializer(many=True)

    class Meta:
        model = get_user_model()
        fields = ('id', 'email', 'name', 'gender', 'birth_date', 'desired_humidity', 'humidifier_on_off', 'silent_mode',
         'auto_setting', 'room', 'image','friends', 'current_state')
        read_only_fields = ('id', 'email', 'room', 'friends', 'current_state')

class FriendRequestSenderListSerializer(serializers.ModelSerializer):
    sender = UserListSerializer()
    class Meta:
        model = FriendRequest
        fields = ('sender',)

class FriendRequestReceiverListSerializer(serializers.ModelSerializer):
    receiver = UserListSerializer()
    class Meta:
        model = FriendRequest
        fields = ('receiver',)

class InquerySerializer(serializers.ModelSerializer):
    class Meta:
        model = Inquery
        fields = '__all__'

class UserCompactSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('id', 'name', 'email')

class ProductSerializer(serializers.ModelSerializer):
    user = UserCompactSerializer(allow_null=True, required=False)
    class Meta:
        model = Product
        fields = ('id', 'product_key', 'user')
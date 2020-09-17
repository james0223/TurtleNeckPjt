from django.contrib import admin
from .models import User, Product, Sensing, TimeSetting

# Register your models here.
admin.site.register(User)
admin.site.register(Product)
admin.site.register(Sensing)
admin.site.register(TimeSetting)
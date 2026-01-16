from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class product(models.Model):
    pname=models.CharField(max_length=100)
    pdesc=models.CharField(max_length=200)
    price=models.IntegerField()
    pcategory=models.CharField(max_length=100)
    trending=models.BooleanField(default=False)
    offer=models.BooleanField(default=False)
    pimages=models.ImageField(default='default.jpg',upload_to='uploads')


class cartmodel(models.Model):
    pname=models.CharField(max_length=100)
    price=models.IntegerField()
    pcategory=models.CharField(max_length=100)
    quantity=models.IntegerField()
    totalprice=models.IntegerField()
    host=models.ForeignKey(User,on_delete=models.CASCADE)

class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    address = models.TextField()
    city = models.CharField(max_length=100)
    pincode = models.CharField(max_length=10)
    phone = models.CharField(max_length=12)
    total_amount = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)

    
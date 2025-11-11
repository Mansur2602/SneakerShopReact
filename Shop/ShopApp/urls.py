from django.contrib import admin
from django.urls import path
import ShopApp.views as views

urlpatterns = [
    path('sneaker/', views.SneakerList, name='sneakerList'),
]

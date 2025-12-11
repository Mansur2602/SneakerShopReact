from django.contrib import admin
from django.urls import path
import ShopApp.views as views

urlpatterns = [
    path('sneaker/', views.SneakerList, name='sneakerList'),
    path('login/', views.LoginView, name='login'),
    path('logout/', views.LogoutView, name='logout'),
    path('register/', views.RegisterView, name='register'),
    path('cart/', views.CartList, name='cartItemList'),
    path('favorites/', views.FavoriteList, name='favoriteItemList'),
    
    path('admin/users/', views.AdminUserList, name='adminUserList'),
    path('admin/sneakers/', views.AdminSneakerList, name='adminSneakerList'),
    path('admin/is_admin/', views.is_admin, name='isAdmin'),
]

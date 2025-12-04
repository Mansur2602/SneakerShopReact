from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework import status
from .serializers import *
import ShopApp.models as m
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated, AllowAny
from .authentication import CookieJWTAuthentication
from django.http import HttpRequest

def _set_auth_cookies(response: Response, request: HttpRequest, access_token: str, refresh_token: str) -> None:
    """
    Настройка параметров cookie с учётом среды:
    - В режиме HTTPS используем SameSite=None и Secure=True (совместимо с кросс-доменом).
    - В режиме HTTP (локальная разработка) откатываемся на SameSite='Lax', чтобы браузер не блокировал cookie.
    """
    secure = request.is_secure()
    same_site = 'None' if secure else 'Lax'

    response.set_cookie(
        key='access_token',
        value=access_token,
        httponly=True,
        samesite=same_site,
        secure=secure
    )
    response.set_cookie(
        key='refresh_token',
        value=refresh_token,
        httponly=True,
        samesite=same_site,
        secure=secure
    )



@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def SneakerList(request):
    if request.method == 'GET':
        sneakers = m.Sneaker.objects.all()
        serializer = SneakerSerializer(sneakers, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        serializer = SneakerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def LoginView(request):
    username = request.data.get("username")
    password = request.data.get("password")

    user = authenticate(username=username, password=password)
    if user is not None:
  
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)
        refresh_token = str(refresh)

        response = Response({
            "message": "Успешный вход",
            "user": {
                "id": user.id,
                "username": user.username
            }
        }, status=status.HTTP_200_OK)

        _set_auth_cookies(response, request, access_token, refresh_token)
        
        return response
     
    else:
        return Response({"error": "Неверный логин или пароль"}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
def LogoutView(request):
    response = Response({"message": "Вы вышли"}, status=status.HTTP_200_OK)
    response.delete_cookie("access_token")
    response.delete_cookie("refresh_token")
    return response

@api_view(['POST'])
def RegisterView(request):
    username = request.data.get("username")
    password = request.data.get("password")

    if not username or not password:
        return Response({"error": "Пожалуйста, введите логин и пароль"}, status=status.HTTP_400_BAD_REQUEST)
    
    if User.objects.filter(username=username).exists():
        return Response({"error": "Пользователь с таким логином уже существует"}, status=status.HTTP_400_BAD_REQUEST)
    
    if len(password) < 6:
        return Response({"error": "Пароль должен быть не менее 6 символов"}, status=status.HTTP_400_BAD_REQUEST)
    
    if password.isdigit():
        return Response({"error": "Пароль не должен состоять только из цифр"}, status=status.HTTP_400_BAD_REQUEST)
    
    if password.isalpha():
        return Response({"error": "Пароль не должен состоять только из букв"}, status=status.HTTP_400_BAD_REQUEST)
    
    if password.lower() == username.lower():
        return Response({"error": "Пароль не должен быть слишком похож на логин"}, status=status.HTTP_400_BAD_REQUEST)
    
    
    user = User.objects.create_user(username=username, password=password)
    
    refresh = RefreshToken.for_user(user)
    access_token = str(refresh.access_token)
    refresh_token = str(refresh)

    response = Response({
            "message": "Успешный вход",
            "user": {
                "id": user.id,
                "username": user.username
            }
        }, status=status.HTTP_200_OK)

    _set_auth_cookies(response, request, access_token, refresh_token)
        
    return response



@api_view(['GET', 'POST', 'DELETE'])
@authentication_classes([CookieJWTAuthentication])
@permission_classes([IsAuthenticated])  
def CartList(request):

    if request.method == 'GET':
        if not request.user.is_authenticated:
            return Response({"error": "Пользователь не авторизован"}, status=401)
        cartItems = m.CartItem.objects.filter(user=request.user)
        serializer = CartItemSerializer(cartItems, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    elif request.method == 'POST':

        sneakerId = request.data.get("sneakerId")
        if not sneakerId:
            return Response({"error": "Не передан sneakerId"}, status=400)
        
        try:
            sneaker = m.Sneaker.objects.get(id=sneakerId)
        except m.Sneaker.DoesNotExist:
            return Response({"error": "Кроссовки не найдены"}, status=404)
        
        item, created = m.CartItem.objects.get_or_create(
            user=request.user,  
            sneaker=sneaker,
            defaults={"quantity": 1}
        )
        status_code = status.HTTP_201_CREATED

        serializer = CartItemSerializer(item)

        return Response(serializer.data, status=status_code)
    elif request.method == 'DELETE':
        sneakerId = request.data.get("sneakerId")
        deleteAll = request.query_params.get("deleteAll")
        if sneakerId:
            m.CartItem.objects.filter(user=request.user, sneaker__id=sneakerId).delete()
            return Response({"message": "Элемент удален из корзины"}, status=status.HTTP_200_OK)
        elif deleteAll == 'true':
            m.CartItem.objects.filter(user=request.user).delete()
            return Response({"message": "Все элементы удалены из корзины"}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Не передан sneakerId"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'POST', 'DELETE'])
@authentication_classes([CookieJWTAuthentication])
@permission_classes([IsAuthenticated])
def FavoriteList(request):
    if request.method == 'GET':
        favoriteItems = m.FavoriteItem.objects.filter(user=request.user)
        serializers = FavoriteItemSerializer(favoriteItems, many=True)
        return Response(serializers.data, status=status.HTTP_200_OK)
    
    elif request.method == 'POST':

        sneakerId = request.data.get("sneakerId")
        if not sneakerId:
            return Response({"error": "Не передан sneakerId"}, status=400)
        
        try:
            sneaker = m.Sneaker.objects.get(id=sneakerId)
        except m.Sneaker.DoesNotExist:
            return Response({"error": "Кроссовки не найдены"}, status=404)
        
        item = m.FavoriteItem.objects.create(
            user=request.user,  
            sneaker=sneaker,
        )
        status_code = status.HTTP_201_CREATED

        serializer = FavoriteItemSerializer(item)

        return Response(serializer.data, status=status_code)
    elif request.method == 'DELETE':
        sneakerId = request.data.get("sneakerId")
        if sneakerId:
            m.FavoriteItem.objects.filter(user=request.user, sneaker__id=sneakerId).delete()
            return Response({"message": "Элемент удален из избранного"}, status=status.HTTP_200_OK)

        else:
            return Response({"error": "Не передан sneakerId"}, status=status.HTTP_400_BAD_REQUEST)
from rest_framework import serializers
import ShopApp.models as m
from django.contrib.auth.models import User

class SneakerSerializer(serializers.ModelSerializer):
    class Meta:
        model = m.Sneaker
        fields = ['id', 'name','price', 'image']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password']
    
    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password']
        )
        return user
    
class CartItemSerializer(serializers.ModelSerializer):
    sneaker = SneakerSerializer(read_only=True)

    class Meta:
        model = m.CartItem
        fields = ['id', 'quantity', 'sneaker']
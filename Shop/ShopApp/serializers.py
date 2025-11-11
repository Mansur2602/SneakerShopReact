from rest_framework import serializers
import ShopApp.models as m

class SneakerSerializer(serializers.ModelSerializer):
    class Meta:
        model = m.Sneaker
        fields = ['id', 'name','price', 'image']
from django.db import models

class Sneaker(models.Model):
    name = models.CharField(max_length=200, verbose_name="Название кроссовок")
    price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Цена")
    image = models.ImageField(upload_to='sneakers/', verbose_name="Изображение")
    
    def __str__(self):
        return self.name
    
class CartItem(models.Model):
    user = models.ForeignKey('auth.User', null=False,  on_delete=models.CASCADE, verbose_name="Пользователь")
    sneaker = models.ForeignKey(Sneaker, on_delete=models.CASCADE, verbose_name="Кроссовки")
    quantity = models.PositiveIntegerField(default=1, verbose_name="Количество")

    def __str__(self):
        return f"{self.quantity} x {self.sneaker.name}"
    
class FavoriteItem(models.Model):
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE, verbose_name="Пользователь")
    sneaker = models.ForeignKey(Sneaker, on_delete=models.CASCADE, verbose_name="Кроссовки")

    def __str__(self):
        return f"{self.user.username} - {self.sneaker.name}"
    

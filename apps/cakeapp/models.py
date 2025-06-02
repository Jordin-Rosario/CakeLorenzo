from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Categoria(models.Model):
    name = models.CharField(max_length=100)
    # description = models.TextField()
    def __str__(self):
        return f'{self.name}'

class CakesTypes(models.Model):
    id = models.AutoField(primary_key=True)
    type_name = models.CharField(max_length=100)
    category =  models.ForeignKey(Categoria, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.type_name} - {self.category.name}'

class Cake(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    prince = models.DecimalField(max_digits=8, decimal_places=2)
    after_prince = models.DecimalField(max_digits=8, decimal_places=2, null=True, blank=True)  # prince anterior
    image = models.ImageField(upload_to='cakes/')
    available = models.BooleanField(default=True)
    offer = models.BooleanField(blank=True, null=True)
    new_article = models.BooleanField(blank=True, null=True, default=True)
    hidden = models.BooleanField(default=False)
    sold = models.BooleanField(default=False, blank=True, null=True)
    cake_type = models.ForeignKey(CakesTypes, on_delete=models.CASCADE)
    create_time = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name
    
class PerfilUsuario(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    telefono = models.CharField(max_length=20, blank=True)
    otro_contacto = models.CharField(max_length=20, blank=True)
    direccion = models.TextField(blank=True)

    def __str__(self):
        return f'{self.user.username}'
    
class Pedido(models.Model):
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    fecha_pedido = models.DateTimeField(auto_now_add=True)
    total = models.DecimalField(max_digits=10, decimal_places=2)
    estado = models.CharField(max_length=20, choices=[
        ('pendiente', 'Pendiente'),
        ('cancelado', 'Cancelado'),
        ('en_proceso', 'En proceso'),
        ('entregado', 'Entregado'),
    ])

class ItemPedido(models.Model):
    pedido = models.ForeignKey(Pedido, on_delete=models.CASCADE, related_name='items')
    cake = models.ForeignKey(Cake, on_delete=models.CASCADE)
    cantidad = models.PositiveIntegerField(default=1)
    prince_unitario = models.DecimalField(max_digits=8, decimal_places=2)

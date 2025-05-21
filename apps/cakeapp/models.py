from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Categoria(models.Model):
    name = models.CharField(max_length=100)
    # descripcion = models.TextField()
    def __str__(self):
        return f'{self.name}'

class CakesTypes(models.Model):
    id = models.AutoField(primary_key=True)
    type_name = models.CharField(max_length=100)
    category =  models.ForeignKey(Categoria, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.type_name} - {self.category.name}'

class Cake(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    precio = models.DecimalField(max_digits=8, decimal_places=2)
    precio_anterior = models.DecimalField(max_digits=8, decimal_places=2, null=True, blank=True)  # Precio anterior
    imagen = models.ImageField(upload_to='cakes/')
    disponible = models.BooleanField(default=True)
    oferta = models.BooleanField(blank=True, null=True)
    articulo_nuevo = models.BooleanField(blank=True, null=True, default=True)
    ocultar = models.BooleanField(default=False)
    agotado = models.BooleanField(default=False, blank=True, null=True)
    cake_type = models.ForeignKey(CakesTypes, on_delete=models.CASCADE)
    creado_en = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.nombre
class PerfilUsuario(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    telefono = models.CharField(max_length=20, blank=True)
    otro_contacto = models.CharField(max_length=20, blank=True)
    direccion = models.TextField(blank=True)
    
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
    precio_unitario = models.DecimalField(max_digits=8, decimal_places=2)

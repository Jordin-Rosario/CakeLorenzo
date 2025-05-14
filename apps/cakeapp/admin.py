from django.contrib import admin
from .models import Cake, ItemPedido, PerfilUsuario, Categoria
# Register your models here.

class CakeAdmin(admin.ModelAdmin):
    list_display = ["nombre"]

class CategoriaAdmin(admin.ModelAdmin):
    pass

class PerfilUsuarioAdmin(admin.ModelAdmin):
    pass


admin.site.register(Cake, CakeAdmin)
admin.site.register(Categoria, CategoriaAdmin)
admin.site.register(PerfilUsuario, PerfilUsuarioAdmin)
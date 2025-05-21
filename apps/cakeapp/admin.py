from django.contrib import admin
from .models import Cake, ItemPedido, PerfilUsuario, Categoria, CakesTypes


# Register your models here.
class CakeAdmin(admin.ModelAdmin):
    list_display = ["nombre"]
    search_fields =  ("nombre","cake_type__type_name")

class CategoriaAdmin(admin.ModelAdmin):
    pass

class CakesTypesAdmin(admin.ModelAdmin):
    pass

class PerfilUsuarioAdmin(admin.ModelAdmin):
    pass


admin.site.register(Cake, CakeAdmin)
admin.site.register(Categoria, CategoriaAdmin)
admin.site.register(CakesTypes, CakesTypesAdmin)
admin.site.register(PerfilUsuario, PerfilUsuarioAdmin)
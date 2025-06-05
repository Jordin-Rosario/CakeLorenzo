from django.contrib import admin
from .models import Cake, ItemPedido, PerfilUsuario, Categoria, CakesTypes, FavoriteCake


# Register your models here.
class CakeAdmin(admin.ModelAdmin):
    list_display = ["name"]
    search_fields =  ("name","cake_type__type_name")

class CategoriaAdmin(admin.ModelAdmin):
    pass

class CakesTypesAdmin(admin.ModelAdmin):
    pass

class PerfilUsuarioAdmin(admin.ModelAdmin):
    pass

class FavoriteCakeAdmin(admin.ModelAdmin):
    pass

admin.site.register(Cake, CakeAdmin)
admin.site.register(Categoria, CategoriaAdmin)
admin.site.register(CakesTypes, CakesTypesAdmin)
admin.site.register(PerfilUsuario, PerfilUsuarioAdmin)
admin.site.register(FavoriteCake, FavoriteCakeAdmin)
from rest_framework import serializers
from .models import Cake, Categoria, PerfilUsuario


class CakeSerializers(serializers.ModelSerializer):

    class Meta:
        model = Cake
        fields = '__all__'
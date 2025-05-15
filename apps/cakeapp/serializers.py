from rest_framework import serializers
from .models import Cake, Categoria, PerfilUsuario
from django.contrib.auth.models import User

from django.contrib.auth import get_user_model

UserLogged = get_user_model()




class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']


class AuthMeSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserLogged
        fields = ['id', 'username', 'email']

class PerfilUsuarioSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = PerfilUsuario
        fields = ['user', 'telefono', 'otro_contacto', 'direccion']

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = User.objects.create(**user_data)
        perfil = PerfilUsuario.objects.create(user=user, **validated_data)
        return perfil

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', None)

        # Actualizar campos de PerfilUsuario
        instance.telefono = validated_data.get('telefono', instance.telefono)
        instance.otro_contacto = validated_data.get('otro_contacto', instance.otro_contacto)
        instance.direccion = validated_data.get('direccion', instance.direccion)
        instance.save()

        # Actualizar campos del usuario relacionado
        if user_data:
            user = instance.user
            user.username = user_data.get('username', user.username)
            user.email = user_data.get('email', user.email)
            user.save()

        return instance

class CakeSerializers(serializers.ModelSerializer):

    class Meta:
        model = Cake
        fields = '__all__'
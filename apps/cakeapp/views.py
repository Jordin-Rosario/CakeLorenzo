from rest_framework.viewsets import ReadOnlyModelViewSet
from rest_framework.permissions import IsAuthenticated
from .models import Cake, FavoriteCake
from .serializers import CakeSerializers, PerfilUsuarioSerializer, AuthMeSerializer, FavoriteCakeSerializers
from rest_framework.filters import SearchFilter
from rest_framework import viewsets
from core.utils import SmallResultsSetPagination
from django.shortcuts import get_object_or_404
from .models import PerfilUsuario
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated

# Create your views here.
class AuthMeAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = AuthMeSerializer(request.user)
        return Response(serializer.data)
    

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

@method_decorator(csrf_exempt, name='dispatch')
class PerfilUsuarioAPIView(APIView):
    

    # def get_permissions(self):
    #     if self.request.method  in ['PATCH', 'PUT']:
    #         return [IsAuthenticated]
    #     return []
    
    def get(self, request, pk=None):
        if pk:
            user = get_object_or_404(User, pk=pk)
            perfil = get_object_or_404(PerfilUsuario, user=user)
            serializer = PerfilUsuarioSerializer(perfil)
        else:
            perfiles = PerfilUsuario.objects.all()
            serializer = PerfilUsuarioSerializer(perfiles, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = PerfilUsuarioSerializer(data=request.data)
        if serializer.is_valid():
            perfil = serializer.save()
            user = perfil.user
            tokens = get_tokens_for_user(user)
            return Response({**serializer.data, **tokens}, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def put(self, request, pk):
        perfil = get_object_or_404(PerfilUsuario, pk=pk)
        serializer = PerfilUsuarioSerializer(perfil, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def patch(self, request, pk):
        perfil = get_object_or_404(PerfilUsuario, user_id=pk)
        serializer = PerfilUsuarioSerializer(perfil, data=request.data, partial=True)
 
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CakeViewSet(ReadOnlyModelViewSet):
    queryset = Cake.objects.all().order_by('name')
    serializer_class = CakeSerializers
    filter_backends = [SearchFilter]
    search_fields = ['name']
    # permission_classes = [IsAuthenticated]
    pagination_class = SmallResultsSetPagination 



class FavoriteCakeViewSet(viewsets.ModelViewSet):
    queryset = FavoriteCake.objects.all()
    serializer_class = FavoriteCakeSerializers
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        cake_id = self.request.query_params.get('cake')  # <-- busca ?cake=ID en la URL
        queryset = FavoriteCake.objects.filter(user=user)
        
        if cake_id:
            queryset = queryset.filter(cake__id=cake_id)
        
        return queryset

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        return Response({"detail": "Method not allowed"}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
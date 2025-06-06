from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CakeViewSet, PerfilUsuarioAPIView, AuthMeAPIView, FavoriteCakeViewSet

router = DefaultRouter()
router.register(r'cakes', CakeViewSet, basename='cakes')
router.register(r'favorites', FavoriteCakeViewSet, basename='favorite')

urlpatterns = [
    path('api/', include(router.urls)),
    
    path('auth/me/', AuthMeAPIView.as_view()),
    path('perfil/', PerfilUsuarioAPIView.as_view()),
    path('perfil/<int:pk>/', PerfilUsuarioAPIView.as_view()),

]
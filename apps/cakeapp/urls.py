from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CakeViewSet, PerfilUsuarioAPIView, AuthMeAPIView

router = DefaultRouter()
router.register(r'cakes', CakeViewSet, basename='cakes')

urlpatterns = [
    path('api/', include(router.urls)),
    
    path('auth/me/', AuthMeAPIView.as_view()),
    path('perfil/', PerfilUsuarioAPIView.as_view()),
    path('perfil/<int:pk>/', PerfilUsuarioAPIView.as_view()),

]
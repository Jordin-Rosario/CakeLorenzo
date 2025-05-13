from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.viewsets import ReadOnlyModelViewSet
from rest_framework.permissions import IsAuthenticated
from .models import Cake
from .serializers import CakeSerializers
from rest_framework.filters import SearchFilter
from rest_framework.pagination import PageNumberPagination


class SmallResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 10000


# Create your views here.
class CakeViewSet(ReadOnlyModelViewSet):
    queryset = Cake.objects.all()
    serializer_class = CakeSerializers
    filter_backends = [SearchFilter]
    search_fields = ['nombre']
    pagination_class = SmallResultsSetPagination 

    permission_classes = [IsAuthenticated]
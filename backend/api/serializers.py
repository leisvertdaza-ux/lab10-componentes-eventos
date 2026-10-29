from rest_framework import serializers

from .models import Producto


class ProductoSerializer(serializers.ModelSerializer):
    precio = serializers.DecimalField(max_digits=8, decimal_places=2, coerce_to_string=False)

    class Meta:
        model = Producto
        fields = ['codigo', 'descripcion', 'precio']

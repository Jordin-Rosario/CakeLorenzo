# Generated by Django 5.2.1 on 2025-05-20 14:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cakeapp', '0005_rename_categoria_cake_cake_type'),
    ]

    operations = [
        migrations.AddField(
            model_name='cake',
            name='precio_anterior',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=8, null=True),
        ),
    ]

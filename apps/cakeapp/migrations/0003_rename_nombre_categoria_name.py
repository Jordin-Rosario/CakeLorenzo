# Generated by Django 5.2.1 on 2025-05-19 12:24

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cakeapp', '0002_cakestypes_alter_cake_categoria'),
    ]

    operations = [
        migrations.RenameField(
            model_name='categoria',
            old_name='nombre',
            new_name='name',
        ),
    ]

# Generated by Django 5.2.1 on 2025-05-20 13:58

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cakeapp', '0004_rename_category_id_cakestypes_category'),
    ]

    operations = [
        migrations.RenameField(
            model_name='cake',
            old_name='categoria',
            new_name='cake_type',
        ),
    ]

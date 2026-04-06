from django.db import models

class Execution(models.Model):
    numero = models.IntegerField()
    methode = models.CharField()
    nombre1 = models.IntegerField(blank=True, null=True)
    nombre2 = models.IntegerField(null=True, blank=True)  # optionnel
    fichier = models.FileField(upload_to='uploads/', null=True, blank=True)
    resultat = models.TextField(null=True, blank=True)  # pour stocker le calcul
    date_creation = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Execution de l'Exercice {self.numero} avec methode {self.methode}"

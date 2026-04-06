from django.urls import path
from .views import traiter_exercice_1, traiter_exercice_2, traiter_exercice_3, traiter_exercice_4, traiter_exercice_5, traiter_exercice_6, traiter_exercice_7, traiter_exercice_8, traiter_exercice_9


urlpatterns = [
    path('exercice1/', traiter_exercice_1),
    path('exercice2/', traiter_exercice_2),
    path('exercice3/', traiter_exercice_3),
    path('exercice4/', traiter_exercice_4),
    path('exercice5/', traiter_exercice_5),
    path('exercice6/', traiter_exercice_6),
    path('exercice7/', traiter_exercice_7),
    path('exercice8/', traiter_exercice_8),
    path('exercice9/', traiter_exercice_9),
]
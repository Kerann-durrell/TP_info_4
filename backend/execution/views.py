from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Execution
from .serializers import ExecutionSerializer

#Exo 1 ------------------------------------------------------------------------------------------------------------------------------

import math
U0 = 1

def calcul_non_recursif(n):
    prev = U0
    curr = 0
    if n == 0:
        return U0
    for _ in range(1, n + 1):
        curr = _ * math.sin(prev) + 2
        prev = curr
    return curr

def calcul_recursif(n): 
    if n == 0:
        return U0
    return n * math.sin(calcul_recursif(n-1)) + 2

def liste_des_Un(n):
    liste = [U0]
    for i in range(1, n + 1):
        liste.append(i * math.sin(liste[i - 1]) + 2)
    return liste[:]


@api_view(['POST'])
def traiter_exercice_1(request):
    data = request.data
    nombre = int(data.get('nombre'))
    methode = data.get('methode')
    numero = data.get('numero')

    resultat = None

    if nombre is not None :
        if methode == "non recursive":
            resultat = calcul_non_recursif(nombre)

        elif methode == "recursive":
            resultat = calcul_recursif(nombre)

        else:
            resultat = liste_des_Un(nombre)

    else:
        return Response({"error": "Données insuffisantes"}, status=400)

    # 🔹 Sauvegarde
    execution = Execution.objects.create(
        nombre1=nombre,
        resultat=resultat,
        numero = numero,
        methode = methode
    )

    return Response({
        "id": execution.id,
        "resultat": resultat
    })



#Exo 2 ------------------------------------------------------------------------------------------------------------------------------



import math
U5 = 1
U6 = 2

def calcul_non_recursif_2(n):
    prev = U6
    prev2 = U5
    curr = 0

    if n < 5:
        return "Petit fou !!"
    
    if n == 5:
        return prev2
    
    if n == 6:
        return prev

    for i in range(7, n + 1):
        curr = (math.sin(prev) + 5 + math.sin(prev2)) / (math.sqrt(i) - 2)
        prev2 = prev
        prev = curr

    return curr

def calcul_recursif_2(n):
    
    prev = U6
    prev2 = U5

    if n < 5:
        return "Petit fou !!"
    
    if n == 5:
        return prev2
    
    if n == 6:
        return prev
    
    return (math.sin(calcul_recursif_2(n-1)) + 5 + math.sin(calcul_recursif_2(n-2))) / (math.sqrt(n) - 2)

def liste_des_Un_2(n):

    if n < 5 :
        return "Espece de p*ta*n d'enfo*ré de fils de p*te"

    liste = [U5, U6]
    for i in range(7, n + 1):
        liste.append((math.sin(liste[i-6]) + 5 + math.sin(liste[i-7])) / (math.sqrt(i) - 2))

    return liste



@api_view(['POST'])
def traiter_exercice_2(request):
    data = request.data
    nombre = int(data.get('nombre'))
    methode = data.get('methode')
    numero = data.get('numero')

    resultat = None

    if nombre is not None :
        if methode == "non recursive":
            resultat = calcul_non_recursif_2(nombre)

        elif methode == "recursive":
            resultat = calcul_recursif_2(nombre)

        else:
            resultat = liste_des_Un_2(nombre)

    else:
        return Response({"error": "Données insuffisantes"}, status=400)

    # 🔹 Sauvegarde
    execution = Execution.objects.create(
        nombre1=nombre,
        resultat=resultat,
        numero = numero,
        methode = methode
    )

    return Response({
        "id": execution.id,
        "resultat": resultat
    })




#Exo  3 ------------------------------------------------------------------------------------------------------------------------------

def create_suite_with_fic(fic):
    
    suite = [int(x) for x in fic.read().decode('utf-8').split() if x.isdigit()]
    return suite

def maximum(liste:list):
    if len(liste) == 0:
        return "La liste est Vide"
    Max = liste[0]
    for i in liste:
        if i > Max:
            Max = i
    return Max

def max_2_elements(a,b:int):
    if a < b: 
        return b 
    else:
        return a

def maximum_recursif(liste:list):
    if len(liste) == 2:
        return max_2_elements(*liste) 
    else:
        return max_2_elements(maximum_recursif(liste[:-1]), liste[-1])


@api_view(['POST'])
def traiter_exercice_3(request):
    data = request.data
    methode = data.get('methode')
    numero = data.get('numero')
    fic = data.get('fichier')
    resultat = None
    
    if fic is not None :
        if methode == "non recursive":
            resultat = maximum(create_suite_with_fic(fic))

        elif methode == "recursive":
            resultat = maximum_recursif(create_suite_with_fic(fic))
    else:
        return Response({"error": "Pas de fichier ou truc dans le genre..."}, status=400)
    

    # 🔹 Sauvegarde
    execution = Execution.objects.create(
        fichier = fic,
        resultat=resultat,
        numero = numero,
        methode = methode
    )

    return Response({
        "id": execution.id,
        "resultat": resultat
    })



#Exo  4 ------------------------------------------------------------------------------------------------------------------------------

def minimum(liste:list):
    if len(liste) == 0:
        return "La liste est Vide"   
    Min = liste[0]
    for i in liste:
        if i < Min:
            Min = i
    return Min

#methode recursive
def min_2_elements(a,b:int):
    if a > b: 
        return b 
    else:
        return a

def minimum_recursif(liste:list):
    if len(liste) == 2:
        return min_2_elements(*liste) 
    else:
        return min_2_elements(minimum_recursif(liste[:-1]), liste[-1])
    

@api_view(['POST'])
def traiter_exercice_4(request):
    data = request.data
    methode = data.get('methode')
    numero = data.get('numero')
    fic = data.get('fichier')
    resultat = None
    
    if fic is not None :
        if methode == "non recursive":
            resultat = minimum(create_suite_with_fic(fic))

        elif methode == "recursive":
            resultat = minimum_recursif(create_suite_with_fic(fic))
    else:
        return Response({"error": "Pas de fichier ou truc dans le genre..."}, status=400)
    

    # 🔹 Sauvegarde
    execution = Execution.objects.create(
        fichier = fic,
        resultat=resultat,
        numero = numero,
        methode = methode
    )

    return Response({
        "id": execution.id,
        "resultat": resultat
    })


#Exo  5 ------------------------------------------------------------------------------------------------------------------------------

def minimums(liste, n):
    return sorted(liste)[:n]

def deux_min_3_elements(liste:list,c):
    liste2 = liste.copy()
    liste2.append(c)
    liste2.remove(max(liste2))
    return sorted(liste2)

def minimums_recursif(liste:list):
    if len(liste) == 2:
        return liste
    else:
        return deux_min_3_elements(minimums_recursif(liste[:-1]), liste[-1])
    

@api_view(['POST'])
def traiter_exercice_5(request):
    data = request.data
    methode = data.get('methode')
    numero = data.get('numero')
    fic = data.get('fichier')
    resultat = None
    
    if fic is not None :
        if methode == "non recursive":
            resultat = minimums(create_suite_with_fic(fic), 2)

        elif methode == "recursive":
            resultat = minimums_recursif(create_suite_with_fic(fic))
    else:
        return Response({"error": "Pas de fichier ou truc dans le genre..."}, status=400)
    

    # 🔹 Sauvegarde
    execution = Execution.objects.create(
        fichier = fic,
        resultat=resultat,
        numero = numero,
        methode = methode
    )

    return Response({
        "id": execution.id,
        "resultat": resultat
    })


#Exo  6 ------------------------------------------------------------------------------------------------------------------------------


def trois_min_4_elements(liste:list,c):
    liste2 = liste.copy()
    liste2.append(c)
    liste2.remove(max(liste2))
    return sorted(liste2)

def minimums_recursif_6(liste:list):
    if len(liste) == 3:
        return liste
    else:
        return trois_min_4_elements(minimums_recursif_6(liste[:-1]), liste[-1])
    
@api_view(['POST'])
def traiter_exercice_6(request):
    data = request.data
    methode = data.get('methode')
    numero = data.get('numero')
    fic = data.get('fichier')
    resultat = None
    
    if fic is not None :
        if methode == "non recursive":
            resultat = minimums(create_suite_with_fic(fic), 3)

        elif methode == "recursive":
            resultat = minimums_recursif_6(create_suite_with_fic(fic))
    else:
        return Response({"error": "Pas de fichier ou truc dans le genre..."}, status=400)
    

    # 🔹 Sauvegarde
    execution = Execution.objects.create(
        fichier = fic,
        resultat=resultat,
        numero = numero,
        methode = methode
    )

    return Response({
        "id": execution.id,
        "resultat": resultat
    })

#Exo  7 ------------------------------------------------------------------------------------------------------------------------------


def maximum_sous_suite(suite:list, ideb, ifin: int, methode="n"):
    if methode == "r":
        return maximum_recursif(suite[ideb:ifin])
    else:
        return maximum(suite[ideb:ifin])

@api_view(['POST'])
def traiter_exercice_7(request):
    data = request.data
    methode = data.get('methode')
    numero = data.get('numero')
    fic = data.get('fichier')
    nombre = int(data.get('nombre')) - 1
    nombre2 = int(data.get('nombre2')) - 1
    resultat = None
    
    if fic is not None :
        if methode == "non recursive":
            resultat = maximum_sous_suite(create_suite_with_fic(fic), nombre, nombre2, "n")

        elif methode == "recursive":
            resultat = maximum_sous_suite(create_suite_with_fic(fic), nombre, nombre2, "r")
    else:
        return Response({"error": "Pas de fichier ou truc dans le genre..."}, status=400)
    

    # 🔹 Sauvegarde
    execution = Execution.objects.create(
        fichier = fic,
        nombre2 = nombre2,
        nombre1 = nombre,
        resultat=resultat,
        numero = numero,
        methode = methode
    )

    return Response({
        "id": execution.id,
        "resultat": resultat
    })



#Exo  8 ------------------------------------------------------------------------------------------------------------------------------

class Section():
    def __init__(self, valeurs:list = [], type:str = "croissante"):
        self.valeurs = valeurs
        self.type = type
        

class Colline():
    def __init__(self, sommet, debut, fin, valeurs:list = []):
        self.valeurs = valeurs
        self.sommet = sommet
        self.debut = debut
        self.fin = fin
        

def separation(grosseListe, type, suite):
    section = set()
    ListeSeparee = []
    for i in range(len(grosseListe) - 1):
        
        if grosseListe[i] + 1 == grosseListe[i+1]:
            section.add(grosseListe[i])
            section.add(grosseListe[i+1])

        if (type == "palier" and suite[grosseListe[i] - 1] != suite[grosseListe[i+1] - 1]):
            section.discard(grosseListe[i+1])
            if len(section) > 0:
                ListeSeparee.append(Section(sorted(list(section)), type))
            section = set()

        if (type == "croissante" and suite[grosseListe[i] - 1] >= suite[grosseListe[i+1] - 1]):
            section.discard(grosseListe[i+1])
            if len(section) > 0:
                ListeSeparee.append(Section(sorted(list(section)), type))
            section = set()

        if (type == "decroissante" and suite[grosseListe[i] - 1] <= suite[grosseListe[i+1] - 1]):
            section.discard(grosseListe[i+1])
            if len(section) > 0:
                ListeSeparee.append(Section(sorted(list(section)), type))
            section = set()

        if grosseListe[i] + 1 != grosseListe[i+1] or grosseListe[i+1] == grosseListe[-1]:
            if len(section) > 0:
                ListeSeparee.append(Section(sorted(list(section)), type))
            section = set()
        

    return ListeSeparee
        

@api_view(['POST'])
def traiter_exercice_8(request):
    data = request.data
    numero = data.get('numero')
    fic = data.get('fichier')
    resultat = None
    
    if fic is not None :
        suite = create_suite_with_fic(fic) + [0]
    else:
        return Response({"error": "Pas de fichier ou truc dans le genre..."}, status=400)
    
    sectionsCroissantes, sectionsDecroissantes, paliers = [], [], []

    if suite[0] < suite[1]:
        sectionsCroissantes = [1]

    if suite[0] > suite[1]:
        sectionsDecroissantes = [1]

    if suite[0] == suite[1]:
        paliers = [1]


    sectionsCroissantes.extend([(i + 1) for i in range(1, len(suite) - 1) if suite[i] < suite[i+1] or suite[i] > suite[i-1]])

    sectionsDecroissantes.extend([(i + 1) for i in range(1, len(suite) - 1) if suite[i] > suite[i+1] or suite[i] < suite[i-1]])

    paliers.extend([(i + 1) for i in range(1, len(suite) - 1) if suite[i] == suite[i+1] or suite[i] == suite[i-1]])

    sectionsCroissantesAll, sectionsDecroissantesAll, paliersAll = separation(sectionsCroissantes, "croissante", suite=suite), separation(sectionsDecroissantes, "decroissante", suite=suite), separation(paliers, "palier", suite=suite)

    All = sorted(sectionsCroissantesAll + sectionsDecroissantesAll + paliersAll, key=lambda f: f.valeurs)
    
    resultat = ["{} : {} \n ".format(s.type, s.valeurs) for s in All]

    # 🔹 Sauvegarde
    execution = Execution.objects.create(
        fichier = fic,
        resultat=resultat,
        numero = numero,
    )

    return Response({
        "id": execution.id,
        "resultat": resultat
    })


#Exo  9 ------------------------------------------------------------------------------------------------------------------------------

@api_view(['POST'])
def traiter_exercice_9(request):
    data = request.data
    numero = data.get('numero')
    fic = data.get('fichier')
    resultat = None
    
    if fic is not None :
        suite = create_suite_with_fic(fic) + [0]
    else:
        return Response({"error": "Pas de fichier ou truc dans le genre..."}, status=400)
    
    sectionsCroissantes, sectionsDecroissantes, paliers = [], [], []

    if suite[0] < suite[1]:
        sectionsCroissantes = [1]

    if suite[0] > suite[1]:
        sectionsDecroissantes = [1]

    if suite[0] == suite[1]:
        paliers = [1]


    sectionsCroissantes.extend([(i + 1) for i in range(1, len(suite) - 1) if suite[i] < suite[i+1] or suite[i] > suite[i-1]])

    sectionsDecroissantes.extend([(i + 1) for i in range(1, len(suite) - 1) if suite[i] > suite[i+1] or suite[i] < suite[i-1]])

    paliers.extend([(i + 1) for i in range(1, len(suite) - 1) if suite[i] == suite[i+1] or suite[i] == suite[i-1]])

    sectionsCroissantesAll, sectionsDecroissantesAll, paliersAll = separation(sectionsCroissantes, "croissante", suite=suite), separation(sectionsDecroissantes, "decroissante", suite=suite), separation(paliers, "palier", suite=suite)

    All = sorted(sectionsCroissantesAll + sectionsDecroissantesAll + paliersAll, key=lambda f: f.valeurs)

    collines = []

    for i in range(len(All) - 1):
        if All[i].type == "croissante" and All[i + 1].type == "decroissante":
            collines.append(Colline(All[i].valeurs[-1], All[i].valeurs[0], All[i+1].valeurs[-1], list(set(All[i].valeurs).union(set(All[i + 1].valeurs)))))
            i += 1


    resultat = ["({}, {}, {}) : {} \n ".format(s.debut, s.sommet, s.fin, sorted(s.valeurs)) for s in collines]

    # 🔹 Sauvegarde
    execution = Execution.objects.create(
        fichier = fic,
        resultat=resultat,
        numero = numero,
    )

    return Response({
        "id": execution.id,
        "resultat": resultat
    })




#Exo  10 ------------------------------------------------------------------------------------------------------------------------------


@api_view(['POST'])
def traiter_exercice_10(request):
    data = request.data
    numero = data.get('numero')
    fic = data.get('fichier')
    fic2 = data.get('fichier2')
    resultat = None
    
    if fic is not None and fic2 is not None:
        suite_1 = create_suite_with_fic(fic)
        suite_2 = create_suite_with_fic(fic2)
    else:
        return Response({"error": "Pas de fichier ou truc dans le genre..."}, status=400)
    
    index_nex_fic, index_fic_1, index_fic_2 = 0, 0, 0
    suite = []

    N = len(suite_1) + len(suite_2)

    while index_nex_fic < N:

        if index_fic_1 >= len(suite_1):
            if index_fic_2 < len(suite_2):
                suite.append(suite_2[index_fic_2])
                index_fic_2 += 1

        elif index_fic_2 >= len(suite_2):
            if index_fic_1 < len(suite_1):
                suite.append(suite_1[index_fic_1])
                index_fic_1 += 1
        
        else:
            suite.append(min(suite_1[index_fic_1], suite_2[index_fic_2]))
            if suite_1[index_fic_1] >= suite_2[index_fic_2]:
                index_fic_2 += 1
            else:
                index_fic_1 += 1

        index_nex_fic += 1


    execution = Execution.objects.create(
        fichier = fic,
        resultat=resultat,
        numero = numero,
    )

    return Response({
        "id": execution.id,
        "resultat": resultat
    })




#Exo  11 ------------------------------------------------------------------------------------------------------------------------------

@api_view(['POST'])
def traiter_exercice_11(request):
    data = request.data
    numero = data.get('numero')
    fic = data.get('fichier')
    nombre = int(data.get('nombre'))
    resultat = None
    
    if fic is not None :
        suite = create_suite_with_fic(fic)
    else:
        return Response({"error": "Pas de fichier ou truc dans le genre..."}, status=400)
    


    resultat = [i for i in suite if i < nombre] + [nombre] + [i for i in suite if i >= nombre]

    execution = Execution.objects.create(
        fichier = fic,
        resultat=resultat,
        numero = numero,
    )

    return Response({
        "id": execution.id,
        "resultat": resultat
    })
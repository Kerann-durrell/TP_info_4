import { useState, useEffect } from 'react';
import { Play, RotateCcw, BookOpen, Upload, Zap, PlaySquare, PlayCircleIcon, PlayIcon, UploadCloud, ReceiptRussianRubleIcon, GitPullRequestClosed, BookAIcon, BookAudioIcon, BookDown, Ellipsis, ArrowBigRight, ArrowLeft, ArrowBigLeft, AArrowUp, ArrowLeftCircle, ArrowRight } from 'lucide-react';
import * as Tabs from '@radix-ui/react-tabs';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { BACKEND_URL } from '../consts/backend_url';

interface ExecutionResult {
  success: boolean;
  output: React.ReactNode;
}

interface Exercise {
  title : string;
  description: string;
  starterCode: {
    python: string;
    lea: string;
  };
  api:string;
  fichier: boolean;
}

const exercisesData: Exercise[] = [
  {
    api : BACKEND_URL + "/api/exercice1/", title : 'Exercice 1 - Reccurence à 1 variable',
    fichier : false,
    description: `Déterminer le terme de rang N d'une suite définie par une relation de reccurence d'ordre 1

## Consignes

1. soit U<sub>n+1</sub> = n.sin(U<sub>n</sub>) + 2
2. Determiner la valeur de Un pour n 
3. determiner les valeurs de (U<sub>n</sub>) jusqu'a n

## Contraintes

- **Entrée** : U<sub>0</sub> = 1
- **Sortie** : Affichage des variables 

## Exemples

\`\`\`
n = 1
U<sub>n</sub> = 1 * sin(1) + 2
\`\`\``,
    starterCode: {
      python: `import math
U0 = 1

#methode non recursive 
# Un+1 = n.sin(Un) + 2
def calcul_non_recursif(n):
    prev = U0
    curr = 0
    if n == 0:
        return U0
    for _ in range(1, n + 1):
        curr = _ * math.sin(prev) + 2
        prev = curr
    return curr

#methode recursive 
# Un+1 = n.sin(Un) + 2
def calcul_recursif(n): 
    if n == 0:
        return U0
    return n * math.sin(calcul_recursif(n-1)) + 2

#liste des elements de (Un) 
def liste_des_Un(n):
    liste = [U0]
    for i in range(1, n + 1):
        liste.append(i * math.sin(liste[i - 1]) + 2)
    return liste`,
    
    lea: `#A Vous de faire la partie çi parce que moi ça me depasse grave !!`
    }
  },
  {
    api : BACKEND_URL + "/api/exercice2/", title : 'Exercice 2 - Reccurence à 2 variables',
    fichier: false,
    description: `Déterminer le terme de rang N d'une suite définie par une relation de reccurence d'ordre 2

## Consignes

1. soit U<sub>n</sub> = [ sin(U<sub>n-1</sub>) + sin(U<sub>n-2</sub>) + 5 ] / √n - 2
2. Determiner la valeur de Un pour n de deux méthodes
3. determiner les valeurs de (U<sub>n</sub>) jusqu'a n

## Contraintes

- **Entrée** : n >= 7; U<sub>5</sub> = 1; U<sub>6</sub> = 2
- **Sortie** : Terme de Rang n
`,
    starterCode: {
      python: `import math
U5 = 1
U6 = 2

#methode non recursive 
# Un+2 = sin(Un+1) + 5 + sin(Un) / √n+2 - 2
def calcul_non_recursif(n):
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

#methode  recursive 
# Un+2 = sin(Un+1) + 5 + sin(Un) / √n+2 - 2
def calcul_recursif(n):
    
    prev = U6
    prev2 = U5

    if n < 5:
        return "Petit fou !!"
    
    if n == 5:
        return prev2
    
    if n == 6:
        return prev
    
    return (math.sin(calcul_recursif(n-1)) + 5 + math.sin(calcul_recursif(n-2))) / (math.sqrt(n) - 2)

#liste des elements de (Un) 
def liste_des_Un(n):

    if n < 5 :
        return "Espece de p*ta*n d'enfo*ré de fils de p*te"

    liste = [U5, U6]
    for i in range(7, n + 1):
        liste.append((math.sin(liste[i-6]) + 5 + math.sin(liste[i-7])) / (math.sqrt(i) - 2))

    return liste`,

lea: `#A Vous de faire la partie çi parce que moi ça me depasse grave !!`
    }
  },
  {
    api : BACKEND_URL + "/api/exercice3/", title : 'Exercice 3 - Recherche du maximum d\'une suite finie',
    fichier: true,
    description: `Implementer de deux méthodes une fonction permettant de trouver le plus grand élément d'une suite.

## Consignes

1. la suite de nombre est lue dans un fichier
2. determiner de façon itérative le maximum
3. determiner de façon recursive le maximum

## Contraintes

- **Entrée** : le fichier existe; le fichier n'est pas vide
- **Sortie** : la valeur maximale de la suite
`,

  starterCode: {
    python: `# Recherche du maximum dans le fichier suite.txt
try:
    with open("suite.txt", "r") as fic:
        suite = [int(x) for x in fic.read().split("\\n") if x.isdigit()]
except Exception as e:
    print(f"{e}")

#methode non recursive
def maximum(liste:list):
    
    if len(liste) == 0:
        return "La liste est Vide"
    
    Max = liste[0]

    for i in liste:
        if i > Max:
            Max = i

    return Max

#methode recursive
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
`,

lea: `#A Vous de faire la partie çi parce que moi ça me depasse grave !!`
    }
  },
  {
    api : BACKEND_URL + "/api/exercice4/", title : 'Exercice 4 - Recherche du minimum',
    fichier: true,
    description: `Implementer de deux méthoder une fonction permettant de trouver le plus petit élément d'une suite.

## Consignes

1. la suite de nombre est lue dans un fichier
2. determiner de façon itérative le minimum
3. determiner de façon recursive le minimum

## Contraintes

- **Entrée** : le fichier existe; le fichier n'est pas vide
- **Sortie** : la valeur minimale de la suite
`,
    starterCode: {
      python: `# Recherche du minimum dans le fichier suite.txt
try:
    with open("suite.txt", "r") as fic:
        suite = [int(x) for x in fic.read().split("\\n") if x.isdigit()]
except Exception as e:
    print(f"{e}")

#methode non recursive
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
        return min_2_elements(minimum_recursif(liste[:-1]), liste[-1])`,

      lea: `#A Vous de faire la partie çi parce que moi ça me depasse grave !!`
    }
  },
  {
    api : BACKEND_URL + "/api/exercice5/", title : 'Exercice 5 - Recherche des deux plus petits élements',
    fichier: true,
    description: `Trouver les deux plus petits élements d'une suite de nombres dans un fichier.

## Consignes

## Contraintes

## Exemples

`,
    starterCode: {
      python: `# Recherche des deux plus petits dans le fichier suite.txt
try:
    with open("suite.txt", "r") as fic:
        suite = [int(x) for x in fic.read().split("\\n") if x.isdigit()]
except Exception as e:
    print(f"{e}")

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
    
print(minimums_recursif(suite[:10]))
`,

lea: `#A Vous de faire la partie çi parce que moi ça me depasse grave !!`
    }
  },
  {
    api : BACKEND_URL + "/api/exercice6/", title : 'Exercice 6 - Recherche des trois plus petits élements',
    fichier: true,
    description: `Determiner les trois plus petits élements d'une suite contenue dans un fichier.

## Consignes

## Contraintes

## Exemples
`,
    starterCode: {
      python: `# Recherche des deux plus petits dans le fichier suite.txt
try:
    with open("suite.txt", "r") as fic:
        suite = [int(x) for x in fic.read().split("\\n") if x.isdigit()]
except Exception as e:
    print(f"{e}")

def minimums(liste, n):
    return sorted(liste)[:n]

def trois_min_4_elements(liste:list,c):
    liste2 = liste.copy()
    liste2.append(c)
    liste2.remove(max(liste2))
    return sorted(liste2)

def minimums_recursif(liste:list):
    if len(liste) == 3:
        return liste
    else:
        return trois_min_4_elements(minimums_recursif(liste[:-1]), liste[-1])
    
print(minimums_recursif(suite[:10]))
    `,
    lea: `#A Vous de faire la partie çi parce que moi ça me depasse grave !!`
    }
  },
  {
    api : BACKEND_URL + "/api/exercice7/", title : 'Exercice 7 - Recherche du maximum d\'une section',
    fichier: true,
    description: `Determiner le maximum d'une section d'une suite finie. 

## Consignes



## Contraintes



## Exemples

`,
    starterCode: {
      python: `# Recherche du maximum dans le fichier suite.txt
try:
    with open("suite.txt", "r") as fic:
        suite = [int(x) for x in fic.read().split("\n") if x.isdigit()]
except Exception as e:
    print(f"{e}")

#methode non recursive
def maximum(liste:list):
    if len(liste) == 0:
        return "La liste est Vide"
    Max = liste[0]

    for i in liste:
        if i > Max:
            Max = i
    return Max

#methode recursive
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
    
def maximum_sous_suite(ideb, ifin: int):
    return maximum(suite[ideb:ifin]), maximum_recursif(suite[ideb:ifin])
`,
lea: `#A Vous de faire la partie çi parce que moi ça me depasse grave !!`
    }
  },
  {
    api : BACKEND_URL + "/api/exercice8/", title : 'Exercice 8 - Sections monotones d\'une suite',
    fichier: true,
    description: `Determiner le maximum et le minimum d'une Sections monotones d\'une suite.

## Consignes



## Contraintes


## Exemples

`,
    starterCode: {
      python: `try:
    with open("suite.txt", "r") as fic:
        suite = [int(x) for x in fic.read().split("\\n") if x.isdigit()] + [0]
except Exception as e:
    print(f"{e}")


class Section():
    def __init__(self, valeurs:list = [], type:str = "croissante"):
        self.valeurs = valeurs
        self.type = type
        

def separation(grosseListe, type):
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

sectionsCroissantesAll, sectionsDecroissantesAll, paliersAll = separation(sectionsCroissantes, "croissante"), separation(sectionsDecroissantes, "decroissante"), separation(paliers, "palier")

All = sorted(sectionsCroissantesAll + sectionsDecroissantesAll + paliersAll, key=lambda f: f.valeurs)`,
  lea: `#A Vous de faire la partie çi parce que moi ça me depasse grave !!`
    }
  },
  {
    api : BACKEND_URL + "/api/exercice9/", title : 'Exercice 9 - Sections Unimodale (colline)',
    fichier: true,
    description: `Determiner les collines dans une suite de valeurs. 

## Consignes



## Contraintes



## Exemples

`,
    starterCode: {
      python: ` 
#... Exercice 8
class Colline():
  def __init__(self, sommet, debut, fin, valeurs:list = []):
      self.valeurs = valeurs
      self.sommet = sommet
      self.debut = debut
      self.fin = fin
      
collines = []

for i in range(len(All) - 1):
    if All[i].type == "croissante" and All[i + 1].type == "decroissante":
        collines.append(Colline(All[i].valeurs[-1], All[i].valeurs[0], All[i+1].valeurs[-1], list(set(All[i].valeurs).union(set(All[i + 1].valeurs)))))
        i += 1

print([(colline.debut, colline.sommet, colline.fin) for colline in collines])
`,
lea: `#A Vous de faire la partie çi parce que moi ça me depasse grave !!`
    }
  },

  {
    api : BACKEND_URL + "/api/exercice10/", title : 'Exercice 10 - fusionner deux listes',
    fichier: true,
    description: `Fusionner deux listes triées en une seule liste triée.

## Consignes



## Contraintes



## Exemples

`,
    starterCode: {
      python: `suite = []

try:
    with open("fichier_1.txt", "r") as fic_1:
        suite_1 = [int(x) for x in fic_1.read().split("\\n") if x.isdigit()]

    with open("fichier_2.txt", "r") as fic_2:
        suite_2 = [int(x) for x in fic_2.read().split("\\n") if x.isdigit()]
except Exception as e:
    print(f"{e}")

index_nex_fic, index_fic_1, index_fic_2 = 0, 0, 0

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

    print(suite_1, suite_2, suite)
    index_nex_fic += 1


`,
lea: `#A Vous de faire la partie çi parce que moi ça me depasse grave !!`
    }
  },
  
  {
    api : BACKEND_URL + "/api/exercice11/", title : 'Exercice 11 - insertion dans une liste triée',
    fichier: true,
    description: `Insérer un élément dans une liste triée en conservant l'ordre.

## Consignes



## Contraintes



## Exemples

`,
    starterCode: {
      python: 
`
try:
    with open("suite.txt", "r") as fic_1:
        suite = [int(x) for x in fic_1.read().split("\\n") if x.isdigit()]
except Exception as e:
    print(f"{e}")

nombre =  int(input("Entrez un nombre à inserer : "))

print([i for i in suite if i < nombre] + [nombre] + [i for i in suite if i >= nombre])
`,
lea: `#A Vous de faire la partie çi parce que moi ça me depasse grave !!`
    }
  },
  
];

interface ExerciseDetailProps {
  exerciseNumber: number;
}

export function ExerciseDetail({ exerciseNumber }: ExerciseDetailProps) {
  const [activeTab, setActiveTab] = useState('python');
  const [inputValue, setInputValue] = useState<number>(0);
  const [inputValue2, setInputValue2] = useState<number | null>(null);
  const [fileInput, setFileInput] = useState<File | null>(null);
  const [fileInput2, setFileInput2] = useState<File | null>(null);
  const [result, setResult] = useState<ExecutionResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [methode, setMethode] = useState("recursive");

  // Sélectionner le bon exercice
  const exerciseData = exercisesData[exerciseNumber - 1];

  // Réinitialiser quand on change d'exercice
  useEffect(() => {
    setResult(null);
    setInputValue(0);
    setFileInput(null);
    setFileInput2(null);
  }, [exerciseNumber]);

  const handleRun = async () => {
  setIsRunning(true);

  try {
    const formData = new FormData();

    formData.append("numero", exerciseNumber.toString());
    formData.append("methode", methode);
    formData.append("nombre", (inputValue.toString()))

    if (inputValue2) {
      formData.append("nombre2", (inputValue2.toString()))
    }

    if (fileInput) {
      formData.append("fichier", fileInput);
    }

    if (fileInput2) {
      formData.append("fichier2", fileInput2);
    }

    const response = await fetch(exerciseData.api, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    let liste = ""
    if (typeof data.resultat != "number" && typeof data.resultat != "string") {
      for (let i = 0; i < data.resultat.length; i++){
        liste += (data.resultat[i] + (i == data.resultat.length - 1 ? "" : " | "))
      }
    }

    if (!response.ok) {
      throw new Error(data.error || "Erreur serveur");
    }

    const output = (
      <div className="space-y-3 md:space-y-4">
        <div className="bg-[#13131f]/60 border border-[#1f1f2e] rounded-xl md:rounded-2xl p-3 md:p-5">
          <h4 className="text-xs text-gray-500 uppercase tracking-wider mb-2 md:mb-3">Console</h4>

          <div className="space-y-2 text-xs md:text-sm text-gray-300 font-mono">
            <div className="hidden text-[#6366f1]">$ API call...</div>

            <div className="p-2 bg-[#0a0a12]/50 rounded-lg">
              Exercice: {exerciseNumber}
            </div>

            <div className="text-gray-500" style={([8,9].includes(exerciseNumber) ? {display: 'none'} : {})}>
              Méthode: <span className="text-white">{methode}</span>
            </div>

            <div className={"text-gray-500" + [3,4,5,6,8,9].includes(exerciseNumber) ? "hidden": ""}>
              Paramètre: <span className="text-white">{inputValue}</span>
            </div>

            {fileInput && (
              <div className="text-gray-500">
                Fichier: <span className="text-white">{fileInput.name}</span>
              </div>
            )}

            <div className="text-[#10b981] p-2 bg-[#10b981]/10 rounded-lg border border-[#10b981]/30">
              ✓ Résultat: {typeof data.resultat != "number" &&  typeof data.resultat != "string" ? liste : data.resultat}
            </div>
          </div>
        </div>
      </div>
    );

    setResult({
      success: true,
      output: (
        <div className="space-y-3 md:space-y-4">
          {output}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#10b981]/10 border border-[#10b981]/30 text-[#10b981] text-sm rounded-full">
            ✓ Exécution réussie
          </div>
        </div>
      ),
    });

  } catch (error: any) {
    setResult({
      success: false,
      output: (
        <div className="text-red-400 text-sm">
          ❌ Erreur : {error.message}
        </div>
      ),
    });
  }

  setIsRunning(false);
};

  const handleReset = () => {
    setResult(null);
    setInputValue(0);
    setFileInput(null)
  };

  return (
    <div className="flex-1 flex flex-col bg-[#0a0a12] overflow-hidden">
      {/* Exercise Statement */}
      <div className="h-64 md:h-72 border-b-2 border-[#6366f1]/20 overflow-y-auto bg-gradient-to-b from-[#0f0f1a] to-[#0a0a12]">
        <div className="p-4 md:p-8">
          <div className='sm: text-center' style={{justifyContent: 'space-between'}}>
            <div  className=" inline-flex items-center gap-2 md:gap-3 mb-4 md:mb-6 px-3 md:px-4 py-1.5 md:py-2 bg-gradient-to-r from-[#6366f1]/20 to-[#8b5cf6]/20 rounded-full border border-[#6366f1]/30">
              <BookOpen className="w-4 h-4 md:w-5 md:h-5 text-[#6366f1]" />
              <h2 className="text-sm md:text-lg text-white text-left">{exerciseData.title}</h2>
            </div> 
          </div>

          <div className="prose prose-invert max-w-none text-sm md:text-base">
            {exerciseData.description.split('\n').map((line, idx) => {
              if (line.startsWith('## ')) {
                return <h3 key={idx} className="text-base md:text-lg text-white mt-4 md:mt-6 mb-2 md:mb-3">{line.replace('## ', '')}</h3>;
              } else if (line.startsWith('- **')) {
                const match = line.match(/- \*\*(.+?)\*\* : (.+)/);
                if (match) {
                  return (
                    <li key={idx} className="text-gray-300 ml-3 md:ml-4 text-xs md:text-sm">
                      <strong className="text-[#8b5cf6]">{match[1]}</strong> : <span dangerouslySetInnerHTML={{__html: match[2]}}></span>
                    </li>
                  );
                }
              } else if (line.startsWith('```')) {
                return null;
              } else if (line.startsWith('1.') || line.startsWith('2.') || line.startsWith('3.') || line.startsWith('4.')) {
                return <li dangerouslySetInnerHTML={{__html: line.substring(3)}} key={idx} className="text-gray-300 ml-3 md:ml-4 text-xs md:text-sm">{}</li>;
              } else if (line.includes('`') && !line.startsWith('```')) {
                const parts = line.split('`');
                return (
                  <p key={idx} className="text-gray-300 mb-1.5 md:mb-2 text-xs md:text-sm">
                    {parts.map((part, i) =>
                      i % 2 === 0 ? part : <code key={i} className="px-1.5 md:px-2 py-0.5 md:py-1 bg-[#1f1f2e] text-[#6366f1] rounded text-xs">{part}</code>
                    )}
                  </p>
                );
              } else if (line.trim()) {
                return <p key={idx} className="text-gray-300 mb-1.5 md:mb-2 text-xs md:text-sm" dangerouslySetInnerHTML={{__html: line}}>{}</p>;
              }
              return null;
            })}
          </div>
        </div>
      </div>

      {/* Code Editor Section */}
      <div className="flex-1 flex flex-col min-h-0">
        <Tabs.Root value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          {/* Tabs Header */}
          <div className="bg-[#0a0a12] px-3 md:px-6 pt-3 md:pt-4 pb-0 border-b border-[#1f1f2e]/50">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-0 mb-3 md:mb-4">
              <Tabs.List className="inline-flex items-center gap-1 md:gap-2 p-1 bg-[#13131f] rounded-xl border border-[#1f1f2e] overflow-x-auto">
                <Tabs.Trigger
                  value="python"
                  className="px-3 md:px-5 py-1.5 md:py-2 text-xs md:text-sm text-gray-400 rounded-lg transition-all whitespace-nowrap data-[state=active]:text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#6366f1] data-[state=active]:to-[#8b5cf6] data-[state=active]:shadow-lg"
                >
                  Python
                </Tabs.Trigger>
                
                <Tabs.Trigger
                  value="lea"
                  className="px-3 md:px-5 py-1.5 md:py-2 text-xs md:text-sm text-gray-400 rounded-lg transition-all whitespace-nowrap data-[state=active]:text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#6366f1] data-[state=active]:to-[#8b5cf6] data-[state=active]:shadow-lg"
                >
                  Langage d'expression Algorithmique
                </Tabs.Trigger>
              </Tabs.List>
            </div>
          </div>

          <div className="flex-1 overflow-hidden flex flex-col bg-[#0a0a12]">
            <Tabs.Content value="python" className="flex-1 overflow-auto">
              <SyntaxHighlighter
                language="python"
                style={vscDarkPlus}
                customStyle={{
                  margin: '0.5rem',
                  padding: '1rem',
                  background: '#13131f',
                  fontSize: '0.8rem',
                  height: 'calc(100% - 1rem)',
                  borderRadius: '12px',
                  border: '1px solid #1f1f2e',
                }}
                customstylemobile={{
                  margin: '0.5rem',
                  padding: '0.75rem',
                  fontSize: '0.75rem',
                }}
                showLineNumbers
              >
                {exerciseData.starterCode.python}
              </SyntaxHighlighter>
            </Tabs.Content>

            <Tabs.Content value="lea" className="flex-1 overflow-auto">
              <SyntaxHighlighter
                language="asm6502"
                style={vscDarkPlus}
                customStyle={{
                  margin: '0.5rem',
                  padding: '1rem',
                  background: '#13131f',
                  fontSize: '0.6rem',
                  height: 'calc(100% - 1rem)',
                  borderRadius: '12px',
                  border: '1px solid #1f1f2e',
                }}
                showLineNumbers
              >
                {exerciseData.starterCode.lea}
              </SyntaxHighlighter>
            </Tabs.Content>

            {/* Action Buttons */}
              <div className="flex items-center gap-2 md:gap-3 mt-3 mb-3 p-2">
                <button
                  onClick={handleReset}
                  className="flex-1 md:flex-none px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm text-gray-400 hover:text-white bg-[#13131f] hover:bg-[#1a1a28] rounded-lg transition-all flex items-center justify-center gap-2 border border-[#1f1f2e]"
                >
                  <RotateCcw className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  <span className="sm:inline">Reset</span>
                </button>
                <button
                  onClick={handleRun}
                  disabled={isRunning}
                  className="flex-1 md:flex-none px-4 md:px-5 py-1.5 md:py-2 text-xs md:text-sm bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] hover:from-[#5558e3] hover:to-[#7c4ddd] text-white rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg shadow-[#6366f1]/30"
                >
                  <Play className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  {isRunning ? 'Exécution....' : 'Exécuter'}
                </button>
              </div>
          </div>
        </Tabs.Root>

        {/* Execution Panel */}
        <div className="h-auto max-h-96 bg-gradient-to-b from-[#0a0a12] to-[#0f0f1a] border-t-2 border-[#6366f1]/20 flex flex-col md:flex-row overflow-y-auto md:overflow-y-visible">
          {/* Input Form */}
          <div className="w-full md:w-80 border-b md:border-b-0 md:border-r border-[#1f1f2e]/50 flex flex-col">
            <div className="px-4 md:px-6 py-3 md:py-4 bg-[#13131f]/30 border-b border-[#1f1f2e]/50">
              <h3 className="text-xs md:text-sm text-white"> Données d'entrées</h3>
            </div>
            <div className="flex-1 p-4 md:p-6 space-y-4 md:space-y-5 overflow-y-auto">
              <div className={[3,4,5,6,8,9,10].includes(exerciseNumber) ? "hidden": "relative "}>
                <label className="text-xs text-gray-500 uppercase tracking-wider block mb-2">
                  paramètre d'entrée 
                </label>
                <input
                  type="number"
                  value={inputValue}
                  onChange={(e) => setInputValue(parseInt(e.target.value))}
                  className={"w-full mb-2 px-3 md:px-4 py-2 md:py-3 bg-[#13131f] border-2 border-[#1f1f2e] rounded-xl text-white text-sm focus:outline-none focus:border-[#6366f1] transition-all"}
                  placeholder={exerciseNumber == 7 ? "Debut de Section" : "valeur de n" }
                  min="1"
                />

                <input
                  type="number"
                  value={inputValue2!}
                  onChange={(e) => setInputValue2(parseInt(e.target.value))}
                  className={exerciseNumber == 7 ? "w-full px-3 md:px-4 py-2 md:py-3 bg-[#13131f] border-2 border-[#1f1f2e] rounded-xl text-white text-sm focus:outline-none focus:border-[#6366f1] transition-all" : "hidden"}
                  placeholder={"" + (exerciseNumber == 7 && "fin de Section") }
                  min="1"
                />
              </div>

              <div style={([8,9,10,11].includes(exerciseNumber) ? {display: 'none'} : {})}>
                <label className="text-xs text-gray-500 uppercase tracking-wider block mb-2">
                  Méthode
                </label>
                <select
                  value={methode}
                  onChange={(e) => setMethode(e.target.value)}
                  className={"w-full px-3 md:px-4 py-2 md:py-3 bg-[#13131f] border-2 border-[#1f1f2e] rounded-xl text-white text-sm focus:outline-none focus:border-[#6366f1]" }
                >
                  <option value="recursive">Recursive</option>
                  <option value="non recursive">Non Recursive</option>
                  <option value="autre" className={[3,4,5,6,7,8,9].includes(exerciseNumber) ? "hidden": ""}>Liste</option>
                </select>
              </div>

              {/* File Upload */}
              <div className={exerciseData.fichier ? "" : "hidden"}>
                <label className="text-xs text-gray-500 uppercase tracking-wider block mb-2">
                  Fichier
                </label>
                <div className={"relative"} >
                  <input
                    type="file"
                    accept='txt'
                    onChange={(e) => setFileInput(e.target.files?.[0] || null)}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2 md:py-3 bg-[#13131f] border-2 border-dashed border-[#1f1f2e] rounded-xl text-gray-400 text-xs md:text-sm cursor-pointer hover:border-[#6366f1] transition-all"
                  >
                    <UploadCloud className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                    <span className="truncate">{fileInput ? fileInput.name : 'Choisir un fichier...'}</span>
                  </label>
                </div>

                <div className={"relative"} style={exerciseNumber != 10 ? {display: 'none'} : {}} >
                  <input
                    type="file"
                    accept='txt'
                    onChange={(e) => setFileInput(e.target.files?.[0] || null)}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2 md:py-3 bg-[#13131f] border-2 border-dashed border-[#1f1f2e] rounded-xl text-gray-400 text-xs md:text-sm cursor-pointer hover:border-[#6366f1] transition-all"
                  >
                    <UploadCloud className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                    <span className="truncate">{fileInput ? fileInput.name : 'Choisir un fichier...'}</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Results Display */}
          <div className="flex-1 flex flex-col min-h-[300px] md:min-h-0">
            <div className="px-4 md:px-6 py-3 md:py-4 bg-[#13131f]/30 border-b border-[#1f1f2e]/50 flex items-center justify-between">
              <h3 className="text-xs md:text-sm text-white"><GitPullRequestClosed className='w-4 h-4 inline'/> Résultat d'exécution</h3>
              {result && (
                <button
                  onClick={handleReset}
                  className="text-xs text-gray-500 hover:text-[#6366f1] flex items-center gap-1 transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span className="sm:inline">Effacer</span>
                </button>
              )}
            </div>
            <div className="flex-1 overflow-y-auto p-4 md:p-6">
              {!result ? (
                <div className="flex flex-col items-center justify-center h-full gap-3">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-[#6366f1]/10 flex items-center justify-center">
                    <PlayIcon className="w-6 h-6 md:w-8 md:h-8 text-[#6366f1]/50" />
                  </div>
                  <p className="text-gray-600 text-xs md:text-sm text-center">
                    Prêt à exécuter le code<br />
                    <span className="text-xs text-gray-700">Cliquez sur "Exécuter" pour voir les résultats</span>
                  </p>
                </div>
              ) : (
                result.output
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

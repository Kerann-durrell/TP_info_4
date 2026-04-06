import { Code2, ChevronRight, X } from 'lucide-react';

interface Exercise {
  id: number;
  title: string;
  disabled?:boolean;
}

const exercises: Exercise[] = [
  { id: 1, title: 'Reccurence à 1 variable' },
  { id: 2, title: 'Reccurence à 2 variables' },
  { id: 3, title: 'Recherche du maximum' },
  { id: 4, title: 'Recherche du minimum' },
  { id: 5, title: 'Recherche des deux plus petits élements' },
  { id: 6, title: 'Recherche des trois plus petits élements' },
  { id: 7, title: 'Recherche du maximum d\'une section' },
  { id: 8, title: 'Sections monotones d\'une suite' },
  { id: 9, title: 'Sections Unimodale (colline)' },
  { id: 10, title: 'Fusion Ordonnée de deux suites', disabled : true },
  { id: 11, title: 'Insertion d\'un element dans une suite', disabled : true },
];

interface SidebarProps {
  currentExercise: number;
  onSelectExercise: (id: number) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ currentExercise, onSelectExercise, isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Overlay pour mobile */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed md:relative
        inset-y-0 left-0
        w-72 md:w-72
        bg-gradient-to-b from-[#0f0f1a] to-[#0a0a12]
        border-r border-[#1f1f2e]/50
        flex flex-col
        z-50
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
      {/* Sidebar Header */}
      <div className="p-4 md:p-6 border-b border-[#1f1f2e]/50">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="w-5 h-2 rounded-full bg-[#10b981] animate"></div>
            <span className="text-xs text-gray-500 uppercase tracking-wider">By Kerann D.</span>
          </div>
          {/* Bouton fermeture mobile */}
          <button
            onClick={onClose}
            className="md:hidden w-8 h-8 rounded-lg bg-[#13131f] border border-[#1f1f2e] flex items-center justify-center text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <h2 className="text-white text-base md:text-lg">Exercices</h2>
      </div>

      {/* Exercise List */}
      <div className="flex-1 overflow-y-auto p-3 md:p-4">
        <div className="space-y-2 md:space-y-3">
          {exercises.map((exercise) => (
            <button
              key={exercise.id}
              onClick={() => {!exercise.disabled ? onSelectExercise(exercise.id) : null }}
              className={`
                group w-full p-3 md:p-4 rounded-xl text-left transition-all duration-300
                ${currentExercise === exercise.id
                  ? 'bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] shadow-lg shadow-[#6366f1]/30 scale-[1.02] md:scale-105'
                  : 'bg-[#13131f]/40 hover:bg-[#1a1a28] border border-[#1f1f2e] hover:border-[#6366f1]/30'
                }
              `}

              style={exercise.disabled ? {'background': 'rgba(255, 0, 30, 0.07)'}: {cursor: 'pointer'}}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5 md:gap-3">
                  {/* Number Badge */}
                  <div className={`
                    w-7 h-7 md:w-8 md:h-8 rounded-lg flex items-center justify-center text-xs
                    ${currentExercise === exercise.id
                      ? 'bg-white/20 text-white'
                      : 'bg-[#6366f1]/10 text-[#6366f1] group-hover:bg-[#6366f1]/20'
                    }
                  `}>
                    {exercise.id}
                  </div>

                  {/* Exercise Info */}
                  <div>
                    <p className={`text-xs md:text-sm ${
                      currentExercise === exercise.id ? 'text-white' : 'text-gray-300'
                    }`}>
                      {exercise.title}
                    </p>
                    <p className={`text-xs ${
                      currentExercise === exercise.id ? 'text-white/70' : 'text-gray-600'
                    }`}>
                      Exercice {exercise.id}
                    </p>
                  </div>
                </div>

                {/* Arrow Icon */}
                <ChevronRight className={`
                  w-4 h-4 transition-all flex-shrink-0
                  ${currentExercise === exercise.id
                    ? 'text-white opacity-100'
                    : 'text-gray-600 opacity-0 group-hover:opacity-100'
                  }
                `} />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="p-3 md:p-4 border-t border-[#1f1f2e]/50">
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <Code2 className="w-3.5 h-3.5 md:w-4 md:h-4" />
          <span className="text-xs">{exercises.length} exercices disponibles</span>
        </div>
      </div>
      </div>
    </>
  );
}

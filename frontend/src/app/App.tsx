import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { ExerciseDetail } from './components/ExerciseDetail';

export default function App() {
  const [currentExercise, setCurrentExercise] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSelectExercise = (id: number) => {
    setCurrentExercise(id);
    setSidebarOpen(false); // Fermer la sidebar sur mobile après sélection
  };

  return (
    <div className="size-full flex flex-col bg-[#0a0a12] dark">
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex-1 flex overflow-hidden relative">
        <Sidebar
          currentExercise={currentExercise}
          onSelectExercise={handleSelectExercise}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        <ExerciseDetail exerciseNumber={currentExercise} />
      </div>
    </div>
  );
}
import { User, GraduationCap, Menu } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="h-16 md:h-20 bg-gradient-to-r from-[#0a0a12] via-[#0f0f1a] to-[#0a0a12] border-b-2 border-[#6366f1]/30 px-4 md:px-8 flex items-center justify-between shadow-lg">
      {/* Mobile Menu Button */}
      <button
        onClick={onMenuClick}
        className="md:hidden w-10 h-10 rounded-lg bg-[#13131f] border border-[#1f1f2e] flex items-center justify-center text-gray-400 hover:text-white transition-colors"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Left - Logo & Title */}
      <div className="flex items-center gap-3 md:gap-4">
        <div className="text-white w-40 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-[#6366f1] via-[#7c4ddd] to-[#8b5cf6] flex items-center justify-center shadow-lg shadow-[#6366f1]/20">
          <span className="md:hidden">Groupe 1</span>
          <GraduationCap className="w-5 h-5 md:w-7 md:h-7 text-white" />
        </div>
        <div className="hidden sm:block">
          <h1 className="text-white text-base md:text-xl tracking-tight">TP - Informatique 4</h1>
          <p className="text-xs text-gray-500 hidden md:block">Semestre 2 • 2026</p>
        </div>
      </div>

      {/* Right - User Profile */}
      <div className="flex items-center gap-2 md:gap-4 px-3 md:px-4 py-1.5 md:py-2 bg-[#13131f]/50 rounded-full border border-[#1f1f2e]">
        <div className="text-right hidden sm:block">
          <p className="text-xs md:text-sm text-white">Groupe 1</p>
          <p className="text-xs text-[#6366f1] hidden md:block">Sous Groupe A4</p>
        </div>
        <div className="text-white text-xs w-8 h-8 md:w-9 md:h-9 rounded-full bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center ring-2 ring-[#6366f1]/30">
          A4
        </div>
      </div>
    </header>
  );
}

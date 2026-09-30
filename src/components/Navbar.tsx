import React, { useState } from 'react';
import { soundFx } from '../utils/soundEffects';
import {
  Heart,
  Calendar,
  Image,
  MapPin,
  Gift,
  UtensilsCrossed,
  Mail,
  Trophy,
  Music,
  Sparkles,
  User,
  Settings,
  Moon,
  Sun,
  Edit3,
  Menu,
  X,
  Volume2,
  VolumeX,
} from 'lucide-react';

interface NavbarProps {
  currentSection: string;
  onNavigate: (section: string) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  isEditMode: boolean;
  onToggleEditMode: () => void;
  onOpenSurprise: () => void;
  onOpenProfiles: () => void;
  onOpenSettings: () => void;
  coupleNames: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentSection,
  onNavigate,
  isDarkMode,
  onToggleDarkMode,
  isEditMode,
  onToggleEditMode,
  onOpenSurprise,
  onOpenProfiles,
  onOpenSettings,
  coupleNames,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBgmPlaying, setIsBgmPlaying] = useState(soundFx.getIsBgmPlaying());

  const navItems = [
    { id: 'home', label: 'Trang chủ', icon: Heart },
    { id: 'timeline', label: 'Our Story', icon: Calendar },
    { id: 'gallery', label: 'Memories', icon: Image },
    { id: 'map', label: 'Love Map', icon: MapPin },
    { id: 'gifts', label: 'Gifts', icon: Gift },
    { id: 'kitchen', label: 'Kitchen', icon: UtensilsCrossed },
    { id: 'letters', label: 'Letters', icon: Mail },
    { id: 'bucket-list', label: 'Bucket List', icon: Trophy },
    { id: 'special-days', label: 'Special Days', icon: Sparkles },
    { id: 'soundtrack', label: 'Soundtrack', icon: Music },
  ];

  const handleToggleAudio = () => {
    const nextState = soundFx.toggleBgm((playing) => setIsBgmPlaying(playing));
    setIsBgmPlaying(nextState);
  };

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setIsMobileMenuOpen(false);
    soundFx.playHeartChime();
  };

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-zinc-950 md:bg-white/80 md:dark:bg-zinc-950/80 md:backdrop-blur-md border-b border-pink-100/80 dark:border-zinc-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18 gap-2">
          {/* Logo & Brand */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 cursor-pointer group shrink-0 min-w-0 py-1"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform shrink-0">
              <Heart className="w-4 h-4 fill-white" />
            </div>
            <div className="flex flex-col justify-center min-w-0">
              <span className="font-romantic text-xl sm:text-2xl text-rose-600 dark:text-rose-400 font-bold whitespace-nowrap leading-snug pt-0.5">
                Our Little Love Story
              </span>
              <span className="font-handwriting text-xs sm:text-sm text-pink-600 dark:text-pink-300 font-medium whitespace-nowrap leading-tight">
                {coupleNames}
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-rose-500 text-white shadow-xs'
                      : 'text-zinc-600 dark:text-zinc-300 hover:text-rose-500 hover:bg-pink-50 dark:hover:bg-zinc-800'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Action buttons on the right */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            {/* Surprise Me button - compact on small screen, full on larger */}
            <button
              onClick={onOpenSurprise}
              className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white text-xs font-bold shadow-xs hover:scale-105 transition-transform"
              title="Surprise Me!"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span className="hidden md:inline">Surprise Me!</span>
            </button>

            {/* BGM Toggle */}
            <button
              onClick={handleToggleAudio}
              className={`p-2 rounded-full border transition-colors ${
                isBgmPlaying
                  ? 'bg-rose-100 border-rose-300 text-rose-600 dark:bg-rose-950/60 dark:border-rose-800 dark:text-rose-300 animate-pulse'
                  : 'border-pink-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:bg-pink-50 dark:hover:bg-zinc-800'
              }`}
              title={isBgmPlaying ? 'Tắt nhạc nền' : 'Bật nhạc nền lãng mạn'}
            >
              {isBgmPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Dark / Light Mode */}
            <button
              onClick={onToggleDarkMode}
              className="p-2 rounded-full border border-pink-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-pink-50 dark:hover:bg-zinc-800 transition-colors"
              title={isDarkMode ? 'Chế độ ban ngày (Day)' : 'Chế độ đêm lãng mạn (Night)'}
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
            </button>

            {/* Profiles Modal - visible on sm+ */}
            <button
              onClick={onOpenProfiles}
              className="hidden sm:inline-flex p-2 rounded-full border border-pink-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-pink-50 dark:hover:bg-zinc-800 transition-colors"
              title="Hồ sơ hai đứa (Couple Profile)"
            >
              <User className="w-4 h-4" />
            </button>

            {/* Settings - visible on sm+ */}
            <button
              onClick={onOpenSettings}
              className="hidden sm:inline-flex p-2 rounded-full border border-pink-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-pink-50 dark:hover:bg-zinc-800 transition-colors"
              title="Cài đặt nhật ký"
            >
              <Settings className="w-4 h-4" />
            </button>

            {/* Edit Mode Toggle - visible on md+ */}
            <button
              onClick={onToggleEditMode}
              className={`hidden md:inline-flex p-2 rounded-full border transition-colors ${
                isEditMode
                  ? 'bg-amber-100 border-amber-300 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300'
                  : 'border-pink-200 dark:border-zinc-700 text-zinc-400 hover:bg-pink-50'
              }`}
              title={isEditMode ? 'Đang bật chế độ chỉnh sửa / xóa' : 'Chế độ xem'}
            >
              <Edit3 className="w-4 h-4" />
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden p-2 rounded-full text-zinc-600 dark:text-zinc-300 hover:bg-pink-50 dark:hover:bg-zinc-800"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="xl:hidden border-t border-pink-100 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md px-4 py-4 space-y-3 shadow-lg">
          {/* Mobile Quick Action Buttons */}
          <div className="grid grid-cols-3 gap-2 pb-2 border-b border-pink-100 dark:border-zinc-800">
            <button
              onClick={() => {
                onOpenProfiles();
                setIsMobileMenuOpen(false);
              }}
              className="flex flex-col items-center justify-center p-2 rounded-xl bg-pink-50 dark:bg-zinc-800/60 text-zinc-700 dark:text-zinc-200 hover:bg-pink-100 transition-colors text-xs font-medium gap-1"
            >
              <User className="w-4 h-4 text-rose-500" />
              <span>Hồ sơ</span>
            </button>

            <button
              onClick={() => {
                onToggleEditMode();
                setIsMobileMenuOpen(false);
              }}
              className={`flex flex-col items-center justify-center p-2 rounded-xl text-xs font-medium gap-1 transition-colors ${
                isEditMode
                  ? 'bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300'
                  : 'bg-pink-50 dark:bg-zinc-800/60 text-zinc-700 dark:text-zinc-200 hover:bg-pink-100'
              }`}
            >
              <Edit3 className="w-4 h-4 text-amber-500" />
              <span>{isEditMode ? 'Đang sửa' : 'Chỉnh sửa'}</span>
            </button>

            <button
              onClick={() => {
                onOpenSettings();
                setIsMobileMenuOpen(false);
              }}
              className="flex flex-col items-center justify-center p-2 rounded-xl bg-pink-50 dark:bg-zinc-800/60 text-zinc-700 dark:text-zinc-200 hover:bg-pink-100 transition-colors text-xs font-medium gap-1"
            >
              <Settings className="w-4 h-4 text-purple-500" />
              <span>Cài đặt</span>
            </button>
          </div>

          {/* Section Navigation Links */}
          <div className="grid grid-cols-2 gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-rose-500 text-white'
                      : 'text-zinc-700 dark:text-zinc-300 hover:bg-pink-50 dark:hover:bg-zinc-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};

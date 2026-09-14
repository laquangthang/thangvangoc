import React, { useState } from 'react';
import { LoveLocation } from '../types';
import { soundFx } from '../utils/soundEffects';
import { Sticker } from './Sticker';
import {
  MapPin,
  Heart,
  Plus,
  Calendar,
  Sparkles,
  Compass,
  X,
  Camera,
  Trash2,
} from 'lucide-react';

interface LoveMapSectionProps {
  locations: LoveLocation[];
  onAddLocation: (location: Omit<LoveLocation, 'id'>) => void;
  onUpdateLocation: (location: LoveLocation) => void;
  onDeleteLocation: (id: string) => void;
  isEditMode: boolean;
}

export const LoveMapSection: React.FC<LoveMapSectionProps> = ({
  locations,
  onAddLocation,
  onUpdateLocation,
  onDeleteLocation,
  isEditMode,
}) => {
  const [selectedLocation, setSelectedLocation] = useState<LoveLocation>(locations[0] || null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form states
  const [placeName, setPlaceName] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState('');
  const [mood, setMood] = useState('Ngọt ngào');

  // Relative visual positions for Vietnam map coordinate projection
  const getMapPosition = (lat: number) => {
    // Normalizing Vietnam latitude from 22.5 (North) to 9.5 (South)
    const normalizedY = ((22.5 - lat) / (22.5 - 9.5)) * 80 + 10;
    // Normalized X slight curve for S-shape
    const normalizedX = 40 + Math.sin((normalizedY / 100) * Math.PI) * 20;
    return { top: `${Math.min(90, Math.max(8, normalizedY))}%`, left: `${Math.min(85, Math.max(15, normalizedX))}%` };
  };

  const handleSelectLocation = (loc: LoveLocation) => {
    soundFx.playHeartChime();
    setSelectedLocation(loc);
  };

  const handleToggleFavorite = (loc: LoveLocation) => {
    soundFx.playHeartChime();
    onUpdateLocation({
      ...loc,
      favorite: !loc.favorite,
    });
    if (selectedLocation?.id === loc.id) {
      setSelectedLocation({
        ...selectedLocation,
        favorite: !selectedLocation.favorite,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!placeName.trim() || !date) return;

    onAddLocation({
      placeName,
      date,
      description,
      photos: photo ? [photo] : ['https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800'],
      lat: 16.0 + (Math.random() * 6 - 3),
      lng: 106.0,
      favorite: false,
      mood,
    });

    soundFx.playCelebration();
    setIsAddModalOpen(false);
  };

  return (
    <section id="love-map" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-100/80 dark:bg-rose-950/60 text-rose-600 dark:text-rose-300 text-xs font-semibold mb-2">
          <Compass className="w-3.5 h-3.5 text-rose-500" />
          <span>Bản đồ tình yêu (Places We've Loved)</span>
        </div>
        <h2 className="font-romantic text-4xl sm:text-5xl text-rose-600 dark:text-rose-400 font-bold mb-3">
          Our Love Map
        </h2>
        <p className="font-handwriting text-2xl text-pink-700/80 dark:text-pink-300/80 max-w-lg mx-auto">
          Từng dấu chân in trên bản đồ đều mang theo một lời hứa: Cùng nhau đi khắp thế gian!
        </p>

        <div className="mt-4">
          <button
            onClick={() => {
              setPlaceName('');
              setDate(new Date().toISOString().split('T')[0]);
              setDescription('');
              setPhoto('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800');
              setMood('Ngọt ngào');
              setIsAddModalOpen(true);
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-rose-500 hover:bg-rose-600 text-white text-xs font-semibold shadow-md cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Ghim thêm địa điểm đã đi</span>
          </button>
        </div>
      </div>

      {/* Map Layout: Illustrated Canvas on Left + Scrapbook Story on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Romantic Interactive Illustrated Map */}
        <div className="lg:col-span-7 relative min-h-[460px] sm:min-h-[540px] rounded-3xl bg-gradient-to-b from-rose-50/70 via-pink-50/50 to-pink-100/60 dark:from-zinc-900/60 dark:to-rose-950/40 p-6 border border-pink-200/80 dark:border-pink-900/40 shadow-xl overflow-hidden flex items-center justify-center">
          
          {/* Subtle Map Grid & S-Curve Vietnam shape silhouette */}
          <div className="absolute inset-0 opacity-15 dark:opacity-10 pointer-events-none flex items-center justify-center">
            <svg viewBox="0 0 400 700" className="w-full h-full max-h-[500px]">
              <path
                d="M 180 50 Q 230 110 200 180 T 260 320 T 170 500 T 140 640"
                fill="none"
                stroke="#e11d48"
                strokeWidth="48"
                strokeLinecap="round"
                strokeDasharray="4 8"
              />
            </svg>
          </div>

          {/* Compass Rose Decoration */}
          <div className="absolute top-6 left-6 opacity-60 pointer-events-none">
            <Sticker type="star" size="md" />
            <span className="block text-[10px] uppercase font-bold text-pink-500 tracking-widest mt-1">
              Love Journey
            </span>
          </div>

          {/* Location Pins plotted onto the romantic map */}
          {locations.map((loc) => {
            const pos = getMapPosition(loc.lat);
            const isSelected = selectedLocation?.id === loc.id;
            return (
              <div
                key={loc.id}
                style={{ top: pos.top, left: pos.left }}
                onClick={() => handleSelectLocation(loc)}
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
              >
                {/* Ping wave */}
                {isSelected && (
                  <span className="absolute -inset-2 rounded-full bg-rose-400 opacity-60 animate-ping" />
                )}

                {/* Heart Pin */}
                <div
                  className={`relative flex items-center justify-center w-10 h-10 rounded-full shadow-lg transition-all duration-300 ${
                    isSelected
                      ? 'bg-rose-500 text-white scale-125 ring-4 ring-rose-300'
                      : 'bg-white dark:bg-zinc-800 text-rose-500 hover:scale-115 border border-rose-200'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isSelected ? 'fill-white' : 'fill-rose-500'}`} />
                </div>

                {/* City name bubble */}
                <div
                  className={`absolute top-full mt-1.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full text-xs font-bold whitespace-nowrap shadow-sm transition-all ${
                    isSelected
                      ? 'bg-rose-600 text-white shadow-md'
                      : 'bg-white/90 dark:bg-zinc-900 text-pink-900 dark:text-pink-100 group-hover:bg-rose-50'
                  }`}
                >
                  {loc.placeName}
                </div>
              </div>
            );
          })}

          {/* Interactive instruction note */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xs text-pink-700 dark:text-pink-300 text-xs font-medium border border-pink-200/50 dark:border-zinc-700 shadow-sm flex items-center gap-1.5 pointer-events-none">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Nhấp vào từng trái tim trên bản đồ để mở kỷ niệm</span>
          </div>
        </div>

        {/* Right: Selected Location Memory Card (Scrapbook Page) */}
        <div className="lg:col-span-5">
          {selectedLocation ? (
            <div className="polaroid-card relative bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-pink-200 dark:border-zinc-800 shadow-xl">
              {/* Tape sticker */}
              <div className="absolute -top-3 left-8 w-24 h-6 tape-effect border-dashed border-t border-b border-pink-300 -rotate-2 z-10" />

              {/* Photo preview */}
              {selectedLocation.photos[0] && (
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-pink-100 mb-4">
                  <img
                    src={selectedLocation.photos[0]}
                    alt={selectedLocation.placeName}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => handleToggleFavorite(selectedLocation)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/80 dark:bg-zinc-800/80 text-rose-500 hover:scale-115 transition-transform"
                  >
                    <Heart
                      className={`w-4 h-4 ${selectedLocation.favorite ? 'fill-rose-500' : ''}`}
                    />
                  </button>
                </div>
              )}

              {/* Details */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-300 text-xs font-bold">
                  {selectedLocation.mood || 'Kỷ niệm đẹp'}
                </span>
                <div className="flex items-center gap-1 text-xs text-pink-500 dark:text-pink-400">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{new Date(selectedLocation.date).toLocaleDateString('vi-VN')}</span>
                </div>
              </div>

              <h3 className="font-sans font-bold text-2xl text-pink-950 dark:text-pink-100 mb-2">
                {selectedLocation.placeName}
              </h3>

              <p className="font-handwriting text-2xl text-pink-900/90 dark:text-pink-100/90 leading-relaxed mb-6">
                "{selectedLocation.description}"
              </p>

              {/* Bottom footer with all places list */}
              <div className="pt-4 border-t border-pink-100 dark:border-zinc-800">
                <div className="text-xs font-semibold text-pink-400 uppercase tracking-wider mb-2">
                  Tất cả các điểm hẹn ({locations.length}):
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {locations.map((loc) => (
                    <button
                      key={loc.id}
                      onClick={() => setSelectedLocation(loc)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                        selectedLocation.id === loc.id
                          ? 'bg-rose-500 text-white'
                          : 'bg-pink-50 dark:bg-zinc-800 text-pink-700 dark:text-pink-300 hover:bg-pink-100'
                      }`}
                    >
                      {loc.placeName}
                    </button>
                  ))}
                </div>

                {isEditMode && (
                  <div className="flex justify-end mt-4">
                    <button
                      onClick={() => onDeleteLocation(selectedLocation.id)}
                      className="inline-flex items-center gap-1 text-xs text-rose-500 hover:text-rose-600"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Xóa điểm đến này</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="p-8 text-center bg-white dark:bg-zinc-900 rounded-3xl border border-pink-100">
              <p className="text-sm text-pink-500">Chưa chọn địa điểm nào</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Location Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-md bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-pink-200 dark:border-zinc-800 shadow-2xl">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-pink-100 text-zinc-500"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-romantic text-3xl text-rose-600 dark:text-rose-400 font-bold mb-4">
              Thêm điểm đến mới 📍
            </h3>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-sm">
              <div>
                <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-300 mb-1">
                  Tên địa điểm / Thành phố *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Phú Quốc, Nha Trang..."
                  value={placeName}
                  onChange={(e) => setPlaceName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-pink-50/50 dark:bg-zinc-800/60 border border-pink-200 dark:border-zinc-700 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-300 mb-1">
                    Ngày ghé thăm *
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-pink-50/50 dark:bg-zinc-800/60 border border-pink-200 dark:border-zinc-700 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-300 mb-1">
                    Cảm xúc
                  </label>
                  <input
                    type="text"
                    value={mood}
                    onChange={(e) => setMood(e.target.value)}
                    placeholder="Bình yên, Lãng mạn..."
                    className="w-full px-3 py-2 rounded-xl bg-pink-50/50 dark:bg-zinc-800/60 border border-pink-200 dark:border-zinc-700 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-300 mb-1">
                  Câu chuyện ở đây
                </label>
                <textarea
                  rows={3}
                  placeholder="Hai đứa đã làm gì ở đây..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-pink-50/50 dark:bg-zinc-800/60 border border-pink-200 dark:border-zinc-700 text-xs font-handwriting text-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-300 mb-1">
                  Link ảnh địa điểm
                </label>
                <input
                  type="text"
                  placeholder="https://images.unsplash.com/..."
                  value={photo}
                  onChange={(e) => setPhoto(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-pink-50/50 dark:bg-zinc-800/60 border border-pink-200 dark:border-zinc-700 text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-1.5 rounded-full text-xs font-medium text-zinc-600"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-rose-500 text-white text-xs font-bold shadow-sm"
                >
                  Ghim địa điểm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

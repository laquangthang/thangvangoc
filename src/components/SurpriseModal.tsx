import React, { useEffect } from 'react';
import { Memory } from '../types';
import { soundFx } from '../utils/soundEffects';
import confetti from 'canvas-confetti';
import { Sticker } from './Sticker';
import { Sparkles, Calendar, MapPin, X, Heart } from 'lucide-react';
import { optimizeImage } from '../utils/cloudinary';

interface SurpriseModalProps {
  memory: Memory;
  onClose: () => void;
  onAnother: () => void;
}

export const SurpriseModal: React.FC<SurpriseModalProps> = ({
  memory,
  onClose,
  onAnother,
}) => {
  useEffect(() => {
    soundFx.playCelebration();
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#f43f5e', '#ec4899', '#fb7185', '#fde047', '#f472b6'],
      });
    } catch {
      // ignore
    }
  }, [memory]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-lg bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 border-2 border-rose-300 dark:border-rose-700 shadow-2xl overflow-hidden">
        {/* Scrap tape */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 tape-effect border-dashed border-t border-b border-pink-300 z-10" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-pink-100 dark:hover:bg-zinc-800 text-zinc-500"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-300 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Kỷ niệm bất ngờ dành cho em (Surprise Me) ✨</span>
          </div>
          <h3 className="font-romantic text-3xl sm:text-4xl text-rose-600 dark:text-rose-400 font-bold">
            Một khoảnh khắc ngọt ngào
          </h3>
        </div>

        {/* Memory Photo */}
        {memory.photos[0] && (
          <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-pink-100 mb-4 border border-pink-200">
            <img
              src={optimizeImage(memory.photos[0], 1600)}
              alt={memory.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2.5 right-2.5">
              <Sticker type="heart" size="sm" />
            </div>
          </div>
        )}

        <div className="space-y-2 text-center">
          <div className="flex items-center justify-center gap-3 text-xs text-pink-500 dark:text-pink-400">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {new Date(memory.date).toLocaleDateString('vi-VN')}
            </span>
            {memory.location && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                {memory.location}
              </span>
            )}
          </div>

          <h4 className="font-sans font-bold text-xl text-zinc-900 dark:text-zinc-100">
            {memory.title}
          </h4>

          <p className="font-handwriting text-2xl text-pink-900 dark:text-pink-100 leading-relaxed px-2">
            "{memory.description}"
          </p>
        </div>

        <div className="flex items-center justify-center gap-3 pt-6 mt-4 border-t border-pink-100 dark:border-zinc-800">
          <button
            onClick={onAnother}
            className="px-5 py-2 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white text-xs font-bold shadow-md cursor-pointer flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Mở kỷ niệm khác</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-full bg-pink-100 dark:bg-zinc-800 text-pink-700 dark:text-pink-300 text-xs font-semibold hover:bg-pink-200"
          >
            Đóng lại
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { soundFx } from '../utils/soundEffects';
import { Heart, X, Sparkles, Smile } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SecretMessageModalProps {
  message: string;
}

export const SecretMascotButton: React.FC<SecretMessageModalProps> = ({ message }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    soundFx.playCelebration();
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { x: 0.9, y: 0.85 },
        colors: ['#f43f5e', '#fb7185', '#ec4899'],
      });
    } catch {
      // ignore
    }
    setIsOpen(true);
  };

  return (
    <>
      {/* Hidden adorable mascot button fixed at bottom-right */}
      <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40 group">
        <button
          onClick={handleOpen}
          className="relative flex items-center justify-center w-12 h-12 rounded-full bg-white dark:bg-zinc-800 border-2 border-pink-200 dark:border-rose-900 shadow-xl hover:scale-115 active:scale-95 transition-all duration-300 cursor-pointer"
          title="Bấm vào tớ đi! 🧸"
          aria-label="Secret Love Message Mascot"
        >
          <span className="text-2xl animate-bounce" style={{ animationDuration: '2.5s' }}>
            🧸
          </span>
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500" />
          </span>
        </button>
        <span className="absolute right-14 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-full bg-black/75 text-white text-[10px] font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Lời nhắn bí mật ❤️
        </span>
      </div>

      {/* Secret Message Popup Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-sm bg-white dark:bg-zinc-900 rounded-3xl p-8 border-2 border-pink-300 dark:border-zinc-700 shadow-2xl text-center">
            {/* Scrap tape */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5 tape-effect border-dashed border-t border-b border-pink-300 z-10" />

            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-pink-100 text-zinc-500"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-4xl mb-3">🧸💕</div>

            <div className="inline-flex items-center gap-1 text-xs font-bold text-rose-500 uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Secret Love Message</span>
            </div>

            <div className="p-4 rounded-2xl bg-rose-50/70 dark:bg-rose-950/40 border border-pink-200 dark:border-rose-900/50 mb-4">
              <p className="font-handwriting text-3xl sm:text-4xl text-rose-600 dark:text-rose-300 leading-snug font-bold">
                {message || "If you're reading this... I love you. A lot. ❤️"}
              </p>
            </div>

            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              (Lời nhắn này có thể tùy chỉnh trong phần Cài đặt của hai đứa)
            </p>

            <button
              onClick={() => setIsOpen(false)}
              className="mt-5 px-6 py-2 rounded-full bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold shadow-md"
            >
              Em cũng yêu anh nhiều! 💖
            </button>
          </div>
        </div>
      )}
    </>
  );
};

import React, { useState } from 'react';
import { soundFx } from '../utils/soundEffects';
import { Heart, Lock, Unlock, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PasscodeGateProps {
  correctPasscode: string;
  onUnlock: () => void;
  coupleNames: string;
}

export const PasscodeGate: React.FC<PasscodeGateProps> = ({
  correctPasscode,
  onUnlock,
  coupleNames,
}) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  const handleKeyPress = (num: string) => {
    if (pin.length >= 6) return;
    const newPin = pin + num;
    setPin(newPin);
    soundFx.playHeartChime();

    if (newPin === correctPasscode) {
      soundFx.playCelebration();
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#f43f5e', '#ec4899', '#fde047'],
        });
      } catch {
        // ignore
      }
      setTimeout(() => {
        onUnlock();
      }, 400);
    } else if (newPin.length === correctPasscode.length) {
      setError(true);
      setTimeout(() => {
        setPin('');
        setError(false);
      }, 800);
    }
  };

  const handleBackspace = () => {
    setPin((prev) => prev.slice(0, -1));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gradient-to-br from-rose-50 via-pink-50 to-pink-100 dark:from-zinc-950 dark:via-zinc-900 dark:to-rose-950/40">
      <div className="relative w-full max-w-sm bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md rounded-3xl p-8 border-2 border-pink-200 dark:border-zinc-800 shadow-2xl text-center">
        {/* Scrap tape */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 tape-effect border-dashed border-t border-b border-pink-300 z-10" />

        <div className="w-16 h-16 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-500 mx-auto flex items-center justify-center mb-4 shadow-inner">
          <Lock className="w-7 h-7" />
        </div>

        <h2 className="font-romantic text-3xl font-bold text-rose-600 dark:text-rose-400 mb-1">
          {coupleNames}
        </h2>
        <p className="font-handwriting text-2xl text-pink-700/80 dark:text-pink-300/80 mb-6">
          Không gian riêng tư của hai đứa 💕
        </p>

        {/* PIN display dots */}
        <div className="flex items-center justify-center gap-3 mb-6">
          {Array.from({ length: correctPasscode.length || 4 }).map((_, i) => (
            <div
              key={i}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                pin.length > i
                  ? error
                    ? 'bg-red-500 scale-125'
                    : 'bg-rose-500 scale-110'
                  : 'bg-pink-200 dark:bg-zinc-700'
              }`}
            />
          ))}
        </div>

        {error && (
          <p className="text-xs text-red-500 font-semibold mb-3 animate-shake">
            Mã PIN chưa đúng, thử lại nhé! (Gợi ý ngày kỷ niệm: {correctPasscode})
          </p>
        )}

        {/* Keypad */}
        <div className="grid grid-cols-3 gap-3 max-w-[240px] mx-auto mb-6">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((n) => (
            <button
              key={n}
              onClick={() => handleKeyPress(n)}
              className="w-16 h-16 rounded-2xl bg-pink-50 dark:bg-zinc-800 hover:bg-rose-100 dark:hover:bg-zinc-700 text-lg font-bold text-zinc-800 dark:text-zinc-100 transition-all active:scale-95 shadow-xs"
            >
              {n}
            </button>
          ))}
          <button
            onClick={() => setPin('')}
            className="w-16 h-16 rounded-2xl bg-pink-50/50 dark:bg-zinc-800/50 text-xs font-semibold text-zinc-500 active:scale-95"
          >
            Xóa hết
          </button>
          <button
            onClick={() => handleKeyPress('0')}
            className="w-16 h-16 rounded-2xl bg-pink-50 dark:bg-zinc-800 hover:bg-rose-100 dark:hover:bg-zinc-700 text-lg font-bold text-zinc-800 dark:text-zinc-100 transition-all active:scale-95 shadow-xs"
          >
            0
          </button>
          <button
            onClick={handleBackspace}
            className="w-16 h-16 rounded-2xl bg-pink-50/50 dark:bg-zinc-800/50 text-xs font-semibold text-zinc-500 active:scale-95"
          >
            ⌫
          </button>
        </div>

        <button
          onClick={onUnlock}
          className="text-xs text-zinc-400 hover:text-rose-500 underline transition-colors"
        >
          Bỏ qua mật khẩu (Khách tham quan)
        </button>
      </div>
    </div>
  );
};

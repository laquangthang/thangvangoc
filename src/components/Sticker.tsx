import React from 'react';

interface StickerProps {
  type: 'heart' | 'sparkle' | 'bow' | 'flower' | 'bear' | 'cat' | 'star' | 'coffee' | 'camera' | 'letter' | 'gift' | 'tape' | 'cake' | 'pin';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  rotate?: number;
}

export const Sticker: React.FC<StickerProps> = ({
  type,
  className = '',
  size = 'md',
  rotate = 0,
}) => {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl',
  };

  const getStickerContent = () => {
    switch (type) {
      case 'heart':
        return (
          <span className="inline-flex items-center justify-center p-1.5 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-500 shadow-sm border border-rose-200/60 dark:border-rose-800/60">
            💖
          </span>
        );
      case 'sparkle':
        return <span className="text-amber-400 drop-shadow-sm">✨</span>;
      case 'bow':
        return (
          <span className="inline-flex items-center justify-center p-1.5 rounded-full bg-pink-100 dark:bg-pink-950/60 text-pink-500 shadow-sm border border-pink-200/60 dark:border-pink-800/60">
            🎀
          </span>
        );
      case 'flower':
        return <span className="text-pink-400 drop-shadow-sm">🌸</span>;
      case 'bear':
        return (
          <span className="inline-flex items-center justify-center p-1.5 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 shadow-sm border border-amber-200/60 dark:border-amber-800/60">
            🧸
          </span>
        );
      case 'cat':
        return (
          <span className="inline-flex items-center justify-center p-1.5 rounded-2xl bg-orange-100 dark:bg-orange-950/60 shadow-sm border border-orange-200/60 dark:border-orange-800/60">
            🐱
          </span>
        );
      case 'star':
        return <span className="text-yellow-400 drop-shadow-sm">⭐</span>;
      case 'coffee':
        return (
          <span className="inline-flex items-center justify-center p-1.5 rounded-2xl bg-amber-100 dark:bg-amber-950/60 shadow-sm border border-amber-200/60">
            ☕
          </span>
        );
      case 'camera':
        return (
          <span className="inline-flex items-center justify-center p-1.5 rounded-2xl bg-sky-100 dark:bg-sky-950/60 shadow-sm border border-sky-200/60">
            📸
          </span>
        );
      case 'letter':
        return (
          <span className="inline-flex items-center justify-center p-1.5 rounded-2xl bg-rose-100 dark:bg-rose-950/60 shadow-sm border border-rose-200/60">
            💌
          </span>
        );
      case 'gift':
        return (
          <span className="inline-flex items-center justify-center p-1.5 rounded-2xl bg-pink-100 dark:bg-pink-950/60 shadow-sm border border-pink-200/60">
            🎁
          </span>
        );
      case 'cake':
        return (
          <span className="inline-flex items-center justify-center p-1.5 rounded-2xl bg-purple-100 dark:bg-purple-950/60 shadow-sm border border-purple-200/60">
            🍰
          </span>
        );
      case 'pin':
        return <span className="text-rose-500 drop-shadow-md">📍</span>;
      case 'tape':
        return (
          <div
            className="w-16 h-5 tape-effect border-dashed border-t border-b border-rose-200/50 -rotate-2 rounded-xs"
            aria-hidden="true"
          />
        );
      default:
        return <span>💕</span>;
    }
  };

  return (
    <div
      className={`inline-block select-none transition-transform duration-200 hover:scale-115 cursor-default ${sizeClasses[size]} ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {getStickerContent()}
    </div>
  );
};

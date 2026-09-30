import React, { useState } from 'react';
import { optimizeImage } from '../utils/cloudinary';
import { BucketItem } from '../types';
import { soundFx } from '../utils/soundEffects';
import confetti from 'canvas-confetti';
import { Sticker } from './Sticker';
import {
  CheckCircle2,
  Circle,
  Plus,
  Sparkles,
  Calendar,
  X,
  Trash2,
  Trophy,
} from 'lucide-react';

interface BucketListSectionProps {
  items: BucketItem[];
  onToggleItem: (id: string) => void;
  onAddItem: (item: Omit<BucketItem, 'id'>) => void;
  onDeleteItem: (id: string) => void;
  isEditMode: boolean;
}

export const BucketListSection: React.FC<BucketListSectionProps> = ({
  items,
  onToggleItem,
  onAddItem,
  onDeleteItem,
  isEditMode,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<BucketItem['category']>('Travel');
  const [image, setImage] = useState('');

  const categories: BucketItem['category'][] = [
    'Travel',
    'Food',
    'Experiences',
    'Photos',
    'Future',
    'Random',
  ];

  const completedCount = items.filter((i) => i.completed).length;
  const totalCount = items.length;
  const percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const filteredItems = items.filter(
    (item) => selectedCategory === 'all' || item.category === selectedCategory
  );

  const handleCheck = (item: BucketItem) => {
    if (!item.completed) {
      // Trigger heart confetti & celebration sound
      soundFx.playCelebration();
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#f43f5e', '#fb7185', '#fda4af', '#fecdd3', '#f59e0b'],
        });
      } catch {
        // ignore
      }
    }
    onToggleItem(item.id);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddItem({
      title,
      description,
      category,
      completed: false,
      image: image || undefined,
    });

    soundFx.playCelebration();
    setIsAddModalOpen(false);
  };

  return (
    <section id="bucket-list" className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100/80 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-semibold mb-2">
          <Trophy className="w-3.5 h-3.5" />
          <span>Danh sách ước mơ chung</span>
        </div>
        <h2 className="font-romantic text-4xl sm:text-5xl text-rose-600 dark:text-rose-400 font-bold mb-1">
          Our Little Bucket List
        </h2>
        <p className="font-handwriting text-2xl text-pink-700/80 dark:text-pink-300/80 italic max-w-lg mx-auto">
          "Every adventure starts with a dream."
        </p>

        {/* Progress Bar Display */}
        <div className="max-w-md mx-auto mt-6 p-4 rounded-3xl bg-white/80 dark:bg-zinc-900/60 border border-pink-200 dark:border-zinc-700 shadow-sm">
          <div className="flex items-center justify-between text-xs font-bold text-pink-900 dark:text-pink-100 mb-2">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Tiến độ hoàn thành:</span>
            </span>
            <span className="text-rose-600 dark:text-rose-400 font-extrabold text-sm">
              {completedCount} / {totalCount} dreams completed ({percent}%)
            </span>
          </div>
          <div className="w-full h-3.5 rounded-full bg-pink-100 dark:bg-zinc-800 overflow-hidden p-0.5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-rose-500 to-pink-500 transition-all duration-700 shadow-xs"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>

        {/* Category Filter Pills & Add Button */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              selectedCategory === 'all'
                ? 'bg-rose-500 text-white'
                : 'bg-pink-100/60 dark:bg-zinc-800 text-pink-700 dark:text-pink-300 hover:bg-pink-200/60'
            }`}
          >
            Tất cả ({totalCount})
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                selectedCategory === cat
                  ? 'bg-rose-500 text-white'
                  : 'bg-pink-100/60 dark:bg-zinc-800 text-pink-700 dark:text-pink-300 hover:bg-pink-200/60'
              }`}
            >
              {cat}
            </button>
          ))}

          <button
            onClick={() => {
              setTitle('');
              setDescription('');
              setCategory('Travel');
              setImage('');
              setIsAddModalOpen(true);
            }}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-rose-500 hover:bg-rose-600 text-white text-xs font-semibold shadow-sm ml-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm ước mơ mới</span>
          </button>
        </div>
      </div>

      {/* Bucket List Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => handleCheck(item)}
            className={`group relative p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
              item.completed
                ? 'bg-emerald-50/70 dark:bg-emerald-950/20 border-emerald-200/80 dark:border-emerald-900/40 shadow-xs'
                : 'bg-white/90 dark:bg-zinc-900/80 border-pink-200/70 dark:border-zinc-800 shadow-sm hover:shadow-md hover:border-pink-300'
            }`}
          >
            {/* Checkbox */}
            <button
              type="button"
              className="shrink-0 mt-0.5 transition-transform active:scale-125"
              onClick={(e) => {
                e.stopPropagation();
                handleCheck(item);
              }}
            >
              {item.completed ? (
                <CheckCircle2 className="w-6 h-6 text-emerald-500 fill-emerald-100 dark:fill-emerald-950" />
              ) : (
                <Circle className="w-6 h-6 text-pink-300 group-hover:text-rose-500 transition-colors" />
              )}
            </button>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span
                  className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                    item.completed
                      ? 'bg-emerald-200/60 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200'
                      : 'bg-pink-100 dark:bg-pink-900/50 text-pink-700 dark:text-pink-300'
                  }`}
                >
                  {item.category}
                </span>

                {item.completed && item.completedDate && (
                  <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>Xong: {new Date(item.completedDate).toLocaleDateString('vi-VN')}</span>
                  </span>
                )}
              </div>

              <h4
                className={`font-sans font-bold text-base leading-snug mb-1 ${
                  item.completed
                    ? 'line-through text-zinc-500 dark:text-zinc-400'
                    : 'text-zinc-900 dark:text-zinc-100'
                }`}
              >
                {item.title}
              </h4>

              {item.description && (
                <p className="font-handwriting text-lg text-zinc-600 dark:text-zinc-400 leading-snug">
                  {item.description}
                </p>
              )}

              {/* Photo thumbnail if completed */}
              {item.image && item.completed && (
                <div className="relative aspect-[16/9] max-w-[220px] rounded-xl overflow-hidden mt-2 border border-emerald-200">
                  <img
                    src={optimizeImage(item.image, 600)}
                    loading="lazy"
                    decoding="async"
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>

            {/* Delete button in Edit mode */}
            {isEditMode && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteItem(item.id);
                }}
                className="p-1 rounded text-zinc-400 hover:text-rose-500 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Add Bucket Item Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-md bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-pink-200 dark:border-zinc-800 shadow-2xl">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-pink-50 text-zinc-500"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-romantic text-3xl text-rose-600 dark:text-rose-400 font-bold mb-4">
              Thêm ước mơ mới 🎯
            </h3>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-sm">
              <div>
                <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-300 mb-1">
                  Ước mơ của hai đứa *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Đi Nhật Bản ngắm hoa anh đào..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-pink-50/50 dark:bg-zinc-800/60 border border-pink-200 dark:border-zinc-700 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-300 mb-1">
                  Danh mục
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as BucketItem['category'])}
                  className="w-full px-3 py-2 rounded-xl bg-pink-50/50 dark:bg-zinc-800/60 border border-pink-200 dark:border-zinc-700 text-xs"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-300 mb-1">
                  Mô tả chi tiết kế hoạch
                </label>
                <textarea
                  rows={2}
                  placeholder="Chi tiết mong muốn..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-pink-50/50 dark:bg-zinc-800/60 border border-pink-200 dark:border-zinc-700 text-xs font-handwriting text-lg"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-1.5 rounded-full text-xs text-zinc-600"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-rose-500 text-white text-xs font-bold shadow-sm"
                >
                  Thêm vào Bucket List
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

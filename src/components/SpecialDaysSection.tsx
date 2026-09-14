import React, { useState } from 'react';
import { SpecialDay } from '../types';
import { soundFx } from '../utils/soundEffects';
import {
  Calendar,
  Clock,
  Heart,
  Gift,
  Plus,
  Sparkles,
  X,
  Trash2,
} from 'lucide-react';

interface SpecialDaysSectionProps {
  specialDays: SpecialDay[];
  onAddSpecialDay: (day: Omit<SpecialDay, 'id'>) => void;
  onDeleteSpecialDay: (id: string) => void;
  isEditMode: boolean;
}

export const SpecialDaysSection: React.FC<SpecialDaysSectionProps> = ({
  specialDays,
  onAddSpecialDay,
  onDeleteSpecialDay,
  isEditMode,
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState<SpecialDay['category']>('Kỷ niệm');
  const [description, setDescription] = useState('');

  const now = new Date();
  const currentYear = now.getFullYear();

  // Compute countdowns
  const processedDays = specialDays.map((item) => {
    const rawDate = new Date(item.date);
    let targetThisYear = new Date(currentYear, rawDate.getMonth(), rawDate.getDate());
    if (targetThisYear.getTime() < now.getTime() - 24 * 60 * 60 * 1000) {
      targetThisYear = new Date(currentYear + 1, rawDate.getMonth(), rawDate.getDate());
    }
    const daysLeft = Math.ceil((targetThisYear.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    // Days since origin
    const daysSince = Math.floor((now.getTime() - rawDate.getTime()) / (1000 * 60 * 60 * 24));

    return {
      ...item,
      daysLeft,
      daysSince,
      nextDate: targetThisYear,
    };
  }).sort((a, b) => a.daysLeft - b.daysLeft);

  const nearestDay = processedDays[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !date) return;

    onAddSpecialDay({
      title,
      date,
      category,
      description,
    });

    soundFx.playCelebration();
    setIsAddModalOpen(false);
  };

  return (
    <section id="special-days" className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-100/80 dark:bg-rose-950/60 text-rose-600 dark:text-rose-300 text-xs font-semibold mb-2">
          <Calendar className="w-3.5 h-3.5 text-rose-500" />
          <span>Những ngày đặc biệt</span>
        </div>
        <h2 className="font-romantic text-4xl sm:text-5xl text-rose-600 dark:text-rose-400 font-bold mb-1">
          Special Days & Countdowns
        </h2>
        <p className="font-handwriting text-2xl text-pink-700/80 dark:text-pink-300/80 max-w-lg mx-auto">
          Mỗi ngày trôi qua đều có một lý do để đếm ngược và chúc mừng!
        </p>

        <button
          onClick={() => {
            setTitle('');
            setDate(new Date().toISOString().split('T')[0]);
            setCategory('Kỷ niệm');
            setDescription('');
            setIsAddModalOpen(true);
          }}
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-rose-500 hover:bg-rose-600 text-white text-xs font-semibold shadow-sm mt-4 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Thêm ngày quan trọng</span>
        </button>
      </div>

      {/* Featured Next Special Day Countdown Card */}
      {nearestDay && (
        <div className="relative rounded-3xl bg-gradient-to-r from-rose-500 via-pink-500 to-rose-400 text-white p-6 sm:p-8 mb-8 shadow-xl shadow-rose-300/40 dark:shadow-none overflow-hidden">
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                <span>Next Special Day</span>
              </div>
              <h3 className="font-sans font-bold text-2xl sm:text-3xl mb-1">
                {nearestDay.title}
              </h3>
              <p className="text-white/90 text-sm max-w-md">
                {nearestDay.description || 'Ngày kỷ niệm tràn ngập yêu thương sắp đến!'}
              </p>
              <div className="text-xs text-white/80 mt-2 font-medium">
                Dịp này vào ngày: {nearestDay.nextDate.toLocaleDateString('vi-VN')}
              </div>
            </div>

            <div className="flex flex-col items-center justify-center p-5 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 text-center min-w-[140px]">
              <span className="font-extrabold text-4xl sm:text-5xl tabular-nums">
                {nearestDay.daysLeft}
              </span>
              <span className="text-xs uppercase font-bold tracking-wider mt-1 text-white/90">
                Ngày nữa tới
              </span>
            </div>
          </div>
        </div>
      )}

      {/* List of all special milestones */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {processedDays.map((sd) => (
          <div
            key={sd.id}
            className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-pink-200/80 dark:border-zinc-800 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2.5 py-0.5 rounded-full bg-pink-100 dark:bg-pink-900/50 text-rose-600 dark:text-rose-300 text-xs font-medium">
                  {sd.category}
                </span>
                <span className="text-xs font-bold text-rose-500">
                  {sd.daysLeft === 0 ? 'Hôm nay!' : `Còn ${sd.daysLeft} ngày`}
                </span>
              </div>

              <h4 className="font-sans font-bold text-base text-zinc-900 dark:text-zinc-100 mb-1">
                {sd.title}
              </h4>
              <p className="text-xs text-zinc-500 mb-2">
                {sd.description || 'Ngày có ý nghĩa đặc biệt'}
              </p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-pink-50 dark:border-zinc-800 text-xs text-zinc-400">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {new Date(sd.date).toLocaleDateString('vi-VN')}
              </span>

              {isEditMode && (
                <button
                  onClick={() => onDeleteSpecialDay(sd.id)}
                  className="p-1 text-zinc-400 hover:text-rose-500"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Special Day Modal */}
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
              Thêm ngày kỷ niệm ✨
            </h3>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-sm">
              <div>
                <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-300 mb-1">
                  Tên ngày đặc biệt *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Ngày nụ hôn đầu tiên..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-pink-50/50 dark:bg-zinc-800/60 border border-pink-200 dark:border-zinc-700 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-300 mb-1">
                    Ngày tháng *
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
                    Phân loại
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as SpecialDay['category'])}
                    className="w-full px-3 py-2 rounded-xl bg-pink-50/50 dark:bg-zinc-800/60 border border-pink-200 dark:border-zinc-700 text-xs"
                  >
                    <option value="Kỷ niệm">Kỷ niệm</option>
                    <option value="Sinh nhật">Sinh nhật</option>
                    <option value="Lễ hội">Lễ hội</option>
                    <option value="Cột mốc">Cột mốc</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-300 mb-1">
                  Mô tả / Ý nghĩa
                </label>
                <input
                  type="text"
                  placeholder="Chi tiết nhắc nhớ..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-pink-50/50 dark:bg-zinc-800/60 border border-pink-200 dark:border-zinc-700 text-xs"
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
                  Lưu ngày đặc biệt
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

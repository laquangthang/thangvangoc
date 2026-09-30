import React, { useState } from 'react';
import { TimelineEvent } from '../types';
import { Sticker } from './Sticker';
import { soundFx } from '../utils/soundEffects';
import {
  Calendar,
  MapPin,
  Heart,
  Plus,
  Trash2,
  Edit3,
  X,
  Sparkles,
  Camera,
  Smile,
  Loader2,
} from 'lucide-react';
import { uploadImage } from '../utils/cloudinary';

interface TimelineSectionProps {
  events: TimelineEvent[];
  onAddEvent: (event: Omit<TimelineEvent, 'id'>) => void;
  onUpdateEvent: (event: TimelineEvent) => void;
  onDeleteEvent: (id: string) => void;
  isEditMode: boolean;
}

export const TimelineSection: React.FC<TimelineSectionProps> = ({
  events,
  onAddEvent,
  onUpdateEvent,
  onDeleteEvent,
  isEditMode,
}) => {
  const [filterMood, setFilterMood] = useState<string>('all');
  const [onlyFavorites, setOnlyFavorites] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<TimelineEvent | null>(null);

  // Form state
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [sticker, setSticker] = useState('heart');
  const [mood, setMood] = useState('Hạnh phúc');

  const moods = ['Hạnh phúc', 'Lãng mạn', 'Đáng nhớ', 'Ấm áp', 'Hài hước'];

  const filteredEvents = events
    .filter((e) => (filterMood === 'all' ? true : e.mood === filterMood))
    .filter((e) => (onlyFavorites ? e.favorite : true))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const openAddModal = () => {
    setEditingEvent(null);
    setTitle('');
    setDate(new Date().toISOString().split('T')[0]);
    setLocation('');
    setDescription('');
    setImage('https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&auto=format&fit=crop&q=80');
    setSticker('heart');
    setMood('Hạnh phúc');
    setIsModalOpen(true);
  };

  const openEditModal = (event: TimelineEvent) => {
    setEditingEvent(event);
    setTitle(event.title);
    setDate(event.date);
    setLocation(event.location);
    setDescription(event.description);
    setImage(event.image);
    setSticker(event.sticker);
    setMood(event.mood);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !date) return;

    if (editingEvent) {
      onUpdateEvent({
        ...editingEvent,
        title,
        date,
        location,
        description,
        image,
        sticker,
        mood,
      });
    } else {
      onAddEvent({
        title,
        date,
        location,
        description,
        image,
        sticker,
        mood,
        favorite: false,
      });
    }
    soundFx.playCelebration();
    setIsModalOpen(false);
  };

  const handleToggleFavorite = (e: React.MouseEvent, event: TimelineEvent) => {
    e.stopPropagation();
    soundFx.playHeartChime();
    onUpdateEvent({
      ...event,
      favorite: !event.favorite,
    });
  };

  const [isUploading, setIsUploading] = useState(false);

  const handleImageFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        setIsUploading(true);
        const url = await uploadImage(file);
        setImage(url);
      } catch (err) {
        alert((err as Error).message);
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <section id="our-story" className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-100/70 dark:bg-rose-950/50 text-rose-600 dark:text-rose-300 text-xs font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Dòng thời gian tình yêu</span>
        </div>
        <h2 className="font-romantic text-4xl sm:text-5xl text-rose-600 dark:text-rose-400 font-bold mb-3">
          Our Love Timeline
        </h2>
        <p className="font-handwriting text-2xl text-pink-700/80 dark:text-pink-300/80 max-w-lg mx-auto">
          Từng dấu mốc ghi lại hành trình từ hai người xa lạ trở thành một phần không thể thiếu.
        </p>

        {/* Action Controls & Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
          <button
            onClick={() => setFilterMood('all')}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              filterMood === 'all'
                ? 'bg-rose-500 text-white'
                : 'bg-pink-100/60 dark:bg-zinc-800 text-pink-700 dark:text-pink-300 hover:bg-pink-200/60'
            }`}
          >
            Tất cả ({events.length})
          </button>
          {moods.map((m) => (
            <button
              key={m}
              onClick={() => setFilterMood(m)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                filterMood === m
                  ? 'bg-rose-500 text-white'
                  : 'bg-pink-100/60 dark:bg-zinc-800 text-pink-700 dark:text-pink-300 hover:bg-pink-200/60'
              }`}
            >
              {m}
            </button>
          ))}
          <button
            onClick={() => setOnlyFavorites(!onlyFavorites)}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
              onlyFavorites
                ? 'bg-rose-100 dark:bg-rose-950/60 border-rose-300 text-rose-600 font-bold'
                : 'border-pink-200 dark:border-zinc-700 text-pink-600 dark:text-pink-400'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${onlyFavorites ? 'fill-rose-500 text-rose-500' : ''}`} />
            <span>Yêu thích</span>
          </button>

          <button
            onClick={openAddModal}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-rose-500 hover:bg-rose-600 text-white text-xs font-semibold shadow-sm ml-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm cột mốc</span>
          </button>
        </div>
      </div>

      {/* Vertical Scrapbook Timeline */}
      <div className="relative">
        {/* Center vertical dashed line */}
        <div className="absolute left-4 sm:left-1/2 top-4 bottom-4 w-0.5 -translate-x-1/2 border-l-2 border-dashed border-pink-300 dark:border-pink-800 pointer-events-none" />

        <div className="space-y-12">
          {filteredEvents.map((event, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={event.id}
                className={`relative flex flex-col sm:flex-row items-start sm:items-center ${
                  isEven ? 'sm:flex-row-reverse' : ''
                } gap-6 pl-10 sm:pl-0`}
              >
                {/* Center Node / Pin */}
                <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white dark:bg-zinc-900 border-2 border-rose-400 dark:border-rose-500 shadow-md flex items-center justify-center z-10">
                  <Heart className="w-4 h-4 text-rose-500 fill-rose-500/30" />
                </div>

                {/* Content Box */}
                <div className="w-full sm:w-[calc(50%-2rem)]">
                  <div className="polaroid-card relative bg-white/90 dark:bg-rose-950/40 backdrop-blur-xs p-5 rounded-3xl border border-pink-200/80 dark:border-pink-900/40 shadow-lg group">
                    
                    {/* Cute scrap tape */}
                    <div
                      className={`absolute -top-3 ${
                        isEven ? 'right-6 rotate-2' : 'left-6 -rotate-2'
                      } w-20 h-5 tape-effect border-dashed border-t border-b border-pink-300 z-10`}
                    />

                    {/* Image if available */}
                    {event.image && (
                      <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-4 bg-pink-100">
                        <img
                          src={event.image}
                          alt={event.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                        />
                        {/* Sticker in corner */}
                        <div className="absolute top-2 right-2">
                          <Sticker type={event.sticker as 'heart'} size="sm" />
                        </div>
                      </div>
                    )}

                    {/* Meta info */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-500 dark:text-rose-400">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{new Date(event.date).toLocaleDateString('vi-VN')}</span>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-pink-100 dark:bg-pink-900/50 text-pink-700 dark:text-pink-300 text-xs font-medium">
                        {event.mood}
                      </span>
                    </div>

                    <h3 className="font-sans font-bold text-lg text-pink-950 dark:text-pink-100 mb-1">
                      {event.title}
                    </h3>

                    {event.location && (
                      <div className="flex items-center gap-1.5 text-xs text-pink-600/80 dark:text-pink-400/80 mb-3">
                        <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                        <span>{event.location}</span>
                      </div>
                    )}

                    <p className="font-handwriting text-xl text-pink-900/90 dark:text-pink-100/90 leading-relaxed mb-4">
                      {event.description}
                    </p>

                    {/* Bottom Actions */}
                    <div className="flex items-center justify-between pt-3 border-t border-pink-100 dark:border-pink-900/30">
                      <button
                        onClick={(e) => handleToggleFavorite(e, event)}
                        className={`flex items-center gap-1 text-xs font-medium transition-transform active:scale-125 ${
                          event.favorite ? 'text-rose-500' : 'text-pink-400 hover:text-rose-500'
                        }`}
                      >
                        <Heart
                          className={`w-4 h-4 ${event.favorite ? 'fill-rose-500 text-rose-500' : ''}`}
                        />
                        <span>{event.favorite ? 'Yêu thích' : 'Lưu lại'}</span>
                      </button>

                      {/* Edit / Delete in Edit Mode */}
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => openEditModal(event)}
                          className="p-1.5 rounded-lg text-pink-500 hover:bg-pink-100 dark:hover:bg-zinc-800 transition-colors"
                          title="Sửa sự kiện"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        {isEditMode && (
                          <button
                            onClick={() => onDeleteEvent(event.id)}
                            className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-100 dark:hover:bg-rose-950/60 transition-colors"
                            title="Xóa sự kiện"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-lg bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-pink-200 dark:border-zinc-800 shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-pink-100 dark:hover:bg-zinc-800 text-zinc-500"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-romantic text-3xl text-rose-600 dark:text-rose-400 font-bold mb-4">
              {editingEvent ? 'Chỉnh sửa cột mốc' : 'Thêm cột mốc tình yêu ✨'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-300 mb-1">
                  Tiêu đề cột mốc *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Buổi hẹn hò đầu tiên..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-2xl bg-pink-50/50 dark:bg-zinc-800/60 border border-pink-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-rose-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-300 mb-1">
                    Ngày xảy ra *
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-2xl bg-pink-50/50 dark:bg-zinc-800/60 border border-pink-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-rose-400 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-300 mb-1">
                    Tâm trạng (Mood)
                  </label>
                  <select
                    value={mood}
                    onChange={(e) => setMood(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-2xl bg-pink-50/50 dark:bg-zinc-800/60 border border-pink-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-rose-400 text-xs"
                  >
                    {moods.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-300 mb-1">
                  Địa điểm
                </label>
                <input
                  type="text"
                  placeholder="Ví dụ: Cầu Long Biên, Hà Nội"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-2xl bg-pink-50/50 dark:bg-zinc-800/60 border border-pink-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-rose-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-300 mb-1">
                  Câu chuyện / Cảm xúc
                </label>
                <textarea
                  rows={3}
                  placeholder="Kể lại cảm xúc ngọt ngào hôm ấy..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-2xl bg-pink-50/50 dark:bg-zinc-800/60 border border-pink-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-rose-400 font-handwriting text-xl"
                />
              </div>

              {/* Photo Input & Preview */}
              <div>
                <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-300 mb-1">
                  Ảnh kỷ niệm
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Dán link ảnh hoặc chọn file bên cạnh"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl bg-pink-50/50 dark:bg-zinc-800/60 border border-pink-200 dark:border-zinc-700 text-xs"
                  />
                  <label className={`flex items-center gap-1 px-3 py-2 rounded-xl bg-pink-100 dark:bg-zinc-700 text-pink-700 dark:text-pink-300 text-xs font-semibold cursor-pointer hover:bg-pink-200 ${isUploading ? 'opacity-60 pointer-events-none' : ''}`}>
                    {isUploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Camera className="w-3.5 h-3.5" />}
                    <span>{isUploading ? 'Đang tải...' : 'Tải ảnh'}</span>
                    <input type="file" accept="image/*" disabled={isUploading} onChange={handleImageFile} className="hidden" />
                  </label>
                </div>
                {image && (
                  <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-pink-200">
                    <img src={image} alt="Preview" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-300 mb-1">
                  Sticker biểu trưng
                </label>
                <div className="flex gap-2">
                  {['heart', 'star', 'coffee', 'trip', 'gift', 'ring'].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSticker(s)}
                      className={`p-2 rounded-xl border transition-all ${
                        sticker === s
                          ? 'border-rose-500 bg-rose-50 dark:bg-rose-950 scale-110'
                          : 'border-pink-200 dark:border-zinc-700'
                      }`}
                    >
                      <Sticker type={s as 'heart'} size="sm" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-pink-100 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-full text-zinc-600 dark:text-zinc-300 hover:bg-pink-50 dark:hover:bg-zinc-800 text-xs font-medium"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold shadow-md shadow-pink-300/50"
                >
                  {editingEvent ? 'Cập nhật' : 'Lưu kỷ niệm'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

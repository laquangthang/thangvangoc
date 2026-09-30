import React, { useState, useMemo } from 'react';
import { Memory } from '../types';
import { soundFx } from '../utils/soundEffects';
import { Sticker } from './Sticker';
import {
  Search,
  Heart,
  Plus,
  Calendar,
  MapPin,
  Tag,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Trash2,
  Edit3,
  Camera,
  BookOpen,
  Loader2,
} from 'lucide-react';
import { uploadImage } from '../utils/cloudinary';

interface GallerySectionProps {
  memories: Memory[];
  onAddMemory: (memory: Omit<Memory, 'id'>) => void;
  onUpdateMemory: (memory: Memory) => void;
  onDeleteMemory: (id: string) => void;
  isEditMode: boolean;
}

export const GallerySection: React.FC<GallerySectionProps> = ({
  memories,
  onAddMemory,
  onUpdateMemory,
  onDeleteMemory,
  isEditMode,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('all');
  const [onlyFavorites, setOnlyFavorites] = useState(false);

  // Lightbox & Modal states
  const [lightboxMemory, setLightboxMemory] = useState<Memory | null>(null);
  const [lightboxPhotoIdx, setLightboxPhotoIdx] = useState(0);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingMemory, setEditingMemory] = useState<Memory | null>(null);

  // Add form fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [photosInput, setPhotosInput] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [notes, setNotes] = useState('');

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    memories.forEach((m) => m.tags.forEach((t) => tagsSet.add(t)));
    return Array.from(tagsSet);
  }, [memories]);

  // Filter memories
  const filteredMemories = useMemo(() => {
    return memories.filter((m) => {
      const matchSearch =
        m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchTag = selectedTag === 'all' || m.tags.includes(selectedTag);
      const matchFav = onlyFavorites ? m.favorite : true;
      return matchSearch && matchTag && matchFav;
    });
  }, [memories, searchQuery, selectedTag, onlyFavorites]);

  const openLightbox = (memory: Memory, photoIdx = 0) => {
    setLightboxMemory(memory);
    setLightboxPhotoIdx(photoIdx);
  };

  const handleToggleFavorite = (e: React.MouseEvent, memory: Memory) => {
    e.stopPropagation();
    soundFx.playHeartChime();
    onUpdateMemory({
      ...memory,
      favorite: !memory.favorite,
    });
  };

  const openAddModal = () => {
    setEditingMemory(null);
    setTitle('');
    setDescription('');
    setDate(new Date().toISOString().split('T')[0]);
    setLocation('');
    setPhotosInput('https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&auto=format&fit=crop&q=80');
    setTagsInput('Kỷ niệm, Hẹn hò');
    setNotes('');
    setIsAddModalOpen(true);
  };

  const openEditModal = (e: React.MouseEvent, memory: Memory) => {
    e.stopPropagation();
    setEditingMemory(memory);
    setTitle(memory.title);
    setDescription(memory.description);
    setDate(memory.date);
    setLocation(memory.location);
    setPhotosInput(memory.photos.join('\n'));
    setTagsInput(memory.tags.join(', '));
    setNotes(memory.notes || '');
    setIsAddModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !date) return;

    const photos = photosInput
      .split('\n')
      .map((p) => p.trim())
      .filter(Boolean);
    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    if (editingMemory) {
      onUpdateMemory({
        ...editingMemory,
        title,
        description,
        date,
        location,
        photos: photos.length > 0 ? photos : ['https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800'],
        tags,
        notes,
      });
    } else {
      onAddMemory({
        title,
        description,
        date,
        location,
        photos: photos.length > 0 ? photos : ['https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800'],
        tags,
        notes,
        favorite: false,
      });
    }

    soundFx.playCelebration();
    setIsAddModalOpen(false);
  };

  const [isUploading, setIsUploading] = useState(false);

  const handleMultipleImageFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setIsUploading(true);
      const results = await Promise.allSettled(Array.from(files).map((file: File) => uploadImage(file)));
      setIsUploading(false);
      const urls = results.flatMap((r) => (r.status === 'fulfilled' ? [r.value] : []));
      const failed = results.flatMap((r) => (r.status === 'rejected' ? [(r.reason as Error).message] : []));
      if (urls.length) {
        setPhotosInput((prev) => (prev ? `${prev}\n${urls.join('\n')}` : urls.join('\n')));
      }
      if (failed.length) {
        alert(`${failed.length}/${results.length} ảnh tải lên thất bại:\n${failed.join('\n')}`);
      }
    }
  };

  return (
    <section id="memories" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-100/80 dark:bg-pink-950/60 text-pink-600 dark:text-pink-300 text-xs font-semibold mb-2">
          <span>📸 Album ảnh kỷ niệm</span>
        </div>
        <h2 className="font-romantic text-4xl sm:text-5xl text-rose-600 dark:text-rose-400 font-bold mb-3">
          Memories & Gallery
        </h2>
        <p className="font-handwriting text-2xl text-pink-700/80 dark:text-pink-300/80 max-w-lg mx-auto">
          Mỗi bức ảnh là một lời nhắc nhở rằng chúng mình đã từng hạnh phúc thế nào.
        </p>

        {/* Search, Tag, and Action Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 bg-white/70 dark:bg-rose-950/30 p-4 rounded-2xl border border-pink-200/60 dark:border-pink-900/40">
          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-pink-400" />
            <input
              type="text"
              placeholder="Tìm theo tiêu đề, địa điểm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-pink-50/60 dark:bg-zinc-800/60 border border-pink-200 dark:border-zinc-700 text-xs focus:outline-none focus:ring-2 focus:ring-rose-400"
            />
          </div>

          {/* Tag Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto py-1 scrollbar-none">
            <button
              onClick={() => setSelectedTag('all')}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                selectedTag === 'all'
                  ? 'bg-rose-500 text-white'
                  : 'bg-pink-100/60 dark:bg-zinc-800 text-pink-700 dark:text-pink-300 hover:bg-pink-200/60'
              }`}
            >
              Tất cả
            </button>
            {allTags.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTag(t)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedTag === t
                    ? 'bg-rose-500 text-white'
                    : 'bg-pink-100/60 dark:bg-zinc-800 text-pink-700 dark:text-pink-300 hover:bg-pink-200/60'
                }`}
              >
                #{t}
              </button>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setOnlyFavorites(!onlyFavorites)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-colors ${
                onlyFavorites
                  ? 'bg-rose-100 dark:bg-rose-950/60 border-rose-300 text-rose-600'
                  : 'border-pink-200 dark:border-zinc-700 text-pink-600 dark:text-pink-400'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${onlyFavorites ? 'fill-rose-500 text-rose-500' : ''}`} />
              <span>Yêu thích</span>
            </button>

            <button
              onClick={openAddModal}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold shadow-sm cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Thêm ảnh mới</span>
            </button>
          </div>
        </div>
      </div>

      {/* Masonry / Grid Gallery */}
      {filteredMemories.length === 0 ? (
        <div className="text-center py-16 bg-white/40 dark:bg-zinc-900/40 rounded-3xl border border-dashed border-pink-200 dark:border-zinc-800">
          <p className="font-handwriting text-2xl text-pink-600 dark:text-pink-400">
            "No memories here yet... Let's make some. 💕"
          </p>
          <button
            onClick={openAddModal}
            className="mt-4 px-4 py-2 rounded-full bg-rose-500 text-white text-xs font-bold"
          >
            Tạo kỷ niệm đầu tiên
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMemories.map((memory, index) => {
            const rot = index % 3 === 0 ? '-rotate-1' : index % 3 === 1 ? 'rotate-1' : 'rotate-0';
            return (
              <div
                key={memory.id}
                onClick={() => openLightbox(memory)}
                className={`polaroid-card group relative bg-white dark:bg-zinc-900 p-4 pb-5 rounded-3xl border border-pink-100 dark:border-zinc-800 cursor-pointer ${rot}`}
              >
                {/* Scrap tape */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5 tape-effect border-dashed border-t border-b border-pink-300 z-10" />

                {/* Primary Photo */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-pink-100 mb-3">
                  <img
                    src={memory.photos[0]}
                    alt={memory.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Multiple photos badge */}
                  {memory.photos.length > 1 && (
                    <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-black/60 text-white text-xs font-medium">
                      +{memory.photos.length - 1} ảnh
                    </div>
                  )}

                  <button
                    onClick={(e) => handleToggleFavorite(e, memory)}
                    className="absolute bottom-2 right-2 p-2 rounded-full bg-white/80 dark:bg-zinc-800/80 text-rose-500 shadow-sm hover:scale-115 transition-transform"
                  >
                    <Heart className={`w-4 h-4 ${memory.favorite ? 'fill-rose-500' : ''}`} />
                  </button>
                </div>

                {/* Title & Caption */}
                <h3 className="font-sans font-bold text-base text-pink-950 dark:text-pink-100 truncate mb-1">
                  {memory.title}
                </h3>
                <p className="font-handwriting text-lg text-pink-700/80 dark:text-pink-300/80 line-clamp-2 leading-relaxed mb-3">
                  {memory.description}
                </p>

                {/* Date & Location */}
                <div className="flex items-center justify-between text-xs text-pink-500 dark:text-pink-400 pt-2 border-t border-pink-50 dark:border-zinc-800">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{new Date(memory.date).toLocaleDateString('vi-VN')}</span>
                  </div>
                  {memory.location && (
                    <div className="flex items-center gap-1 truncate max-w-[140px]">
                      <MapPin className="w-3.5 h-3.5 shrink-0 text-rose-400" />
                      <span className="truncate">{memory.location}</span>
                    </div>
                  )}
                </div>

                {/* Tags */}
                {memory.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {memory.tags.slice(0, 3).map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-pink-50 dark:bg-pink-900/30 text-pink-600 dark:text-pink-300 text-[10px] font-medium"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                )}

                {/* Edit options */}
                <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1 z-20">
                  <button
                    onClick={(e) => openEditModal(e, memory)}
                    className="p-1.5 rounded-lg bg-white/90 text-zinc-700 shadow hover:bg-pink-100"
                    title="Sửa kỷ niệm"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  {isEditMode && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteMemory(memory.id);
                      }}
                      className="p-1.5 rounded-lg bg-white/90 text-rose-600 shadow hover:bg-rose-100"
                      title="Xóa kỷ niệm"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Lightbox Modal (Scrapbook Polaroid Overlay) */}
      {lightboxMemory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-3xl bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-pink-200 dark:border-zinc-800 shadow-2xl overflow-hidden">
            {/* Close button */}
            <button
              onClick={() => setLightboxMemory(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-pink-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 hover:scale-110 z-20"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Polaroid Photo Slider */}
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl overflow-hidden bg-black mb-4">
              <img
                src={lightboxMemory.photos[lightboxPhotoIdx]}
                alt={lightboxMemory.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
              />

              {lightboxMemory.photos.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setLightboxPhotoIdx((prev) =>
                        prev === 0 ? lightboxMemory.photos.length - 1 : prev - 1
                      )
                    }
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/70 dark:bg-zinc-800/70 text-zinc-800 dark:text-zinc-100 hover:scale-110 transition-transform"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() =>
                      setLightboxPhotoIdx((prev) =>
                        prev === lightboxMemory.photos.length - 1 ? 0 : prev + 1
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/70 dark:bg-zinc-800/70 text-zinc-800 dark:text-zinc-100 hover:scale-110 transition-transform"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/60 text-white text-xs font-semibold">
                    {lightboxPhotoIdx + 1} / {lightboxMemory.photos.length}
                  </div>
                </>
              )}
            </div>

            {/* Memory Card Overlay Details */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-sans font-bold text-xl text-pink-950 dark:text-pink-100">
                  {lightboxMemory.title}
                </h3>
                <button
                  onClick={(e) => handleToggleFavorite(e, lightboxMemory)}
                  className="flex items-center gap-1 px-3 py-1 rounded-full bg-pink-100 dark:bg-pink-950/60 text-rose-500 text-xs font-semibold"
                >
                  <Heart className={`w-4 h-4 ${lightboxMemory.favorite ? 'fill-rose-500' : ''}`} />
                  <span>{lightboxMemory.favorite ? 'Đã yêu thích' : 'Yêu thích'}</span>
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs text-pink-600 dark:text-pink-400">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-rose-500" />
                  <span>{new Date(lightboxMemory.date).toLocaleDateString('vi-VN')}</span>
                </div>
                {lightboxMemory.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-rose-500" />
                    <span>{lightboxMemory.location}</span>
                  </div>
                )}
              </div>

              <p className="font-handwriting text-2xl text-pink-900 dark:text-pink-100 leading-relaxed">
                "{lightboxMemory.description}"
              </p>

              {lightboxMemory.notes && (
                <div className="p-3 rounded-2xl bg-pink-50/70 dark:bg-zinc-800/70 border border-pink-200/50 dark:border-zinc-700/50 text-xs text-pink-700 dark:text-pink-300">
                  <strong>Ghi chú nhỏ:</strong> {lightboxMemory.notes}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Memory Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-lg bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-pink-200 dark:border-zinc-800 shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-pink-100 dark:hover:bg-zinc-800 text-zinc-500"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-romantic text-3xl text-rose-600 dark:text-rose-400 font-bold mb-4">
              {editingMemory ? 'Chỉnh sửa album ảnh' : 'Lưu thêm kỷ niệm mới 🌸'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-300 mb-1">
                  Tiêu đề kỷ niệm *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Hoàng hôn biển Đà Nẵng..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-2xl bg-pink-50/50 dark:bg-zinc-800/60 border border-pink-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-rose-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-300 mb-1">
                    Ngày chụp *
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
                    Địa điểm
                  </label>
                  <input
                    type="text"
                    placeholder="Ví dụ: Bãi biển Mỹ Khê"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-2xl bg-pink-50/50 dark:bg-zinc-800/60 border border-pink-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-rose-400 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-300 mb-1">
                  Lời nhắn / Cảm xúc (Caption)
                </label>
                <textarea
                  rows={3}
                  placeholder="Kể về khoảnh khắc đẹp đẽ này..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-2 rounded-2xl bg-pink-50/50 dark:bg-zinc-800/60 border border-pink-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-rose-400 font-handwriting text-xl"
                />
              </div>

              {/* Photos input & file picker */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-300">
                    Danh sách ảnh (Link hoặc Tải từ máy)
                  </label>
                  <label className={`flex items-center gap-1 text-xs text-rose-500 font-semibold cursor-pointer hover:underline ${isUploading ? 'opacity-60 pointer-events-none' : ''}`}>
                    {isUploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Camera className="w-3.5 h-3.5" />}
                    <span>{isUploading ? 'Đang tải lên...' : 'Chọn ảnh máy tính'}</span>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      disabled={isUploading}
                      onChange={handleMultipleImageFiles}
                      className="hidden"
                    />
                  </label>
                </div>
                <textarea
                  rows={2}
                  placeholder="Mỗi link ảnh một dòng..."
                  value={photosInput}
                  onChange={(e) => setPhotosInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-pink-50/50 dark:bg-zinc-800/60 border border-pink-200 dark:border-zinc-700 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-300 mb-1">
                  Tags (phân cách bởi dấu phẩy)
                </label>
                <input
                  type="text"
                  placeholder="Đà Lạt, Du lịch, Mùa đông"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl bg-pink-50/50 dark:bg-zinc-800/60 border border-pink-200 dark:border-zinc-700 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-300 mb-1">
                  Ghi chú riêng tư (Notes)
                </label>
                <input
                  type="text"
                  placeholder="Chi tiết nhỏ muốn lưu lại..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl bg-pink-50/50 dark:bg-zinc-800/60 border border-pink-200 dark:border-zinc-700 text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-pink-100 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-full text-zinc-600 dark:text-zinc-300 hover:bg-pink-50 text-xs font-medium"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold shadow-md shadow-pink-300/50"
                >
                  {editingMemory ? 'Cập nhật' : 'Thêm vào album'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

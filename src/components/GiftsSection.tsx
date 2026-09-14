import React, { useState } from 'react';
import { Gift, CoupleProfile } from '../types';
import { soundFx } from '../utils/soundEffects';
import { Sticker } from './Sticker';
import {
  Gift as GiftIcon,
  Heart,
  Plus,
  Calendar,
  Sparkles,
  X,
  Camera,
  Trash2,
  Edit3,
  Loader2,
} from 'lucide-react';
import { uploadImage } from '../utils/cloudinary';

interface GiftsSectionProps {
  gifts: Gift[];
  profile: CoupleProfile;
  onAddGift: (gift: Omit<Gift, 'id'>) => void;
  onUpdateGift: (gift: Gift) => void;
  onDeleteGift: (id: string) => void;
  isEditMode: boolean;
}

export const GiftsSection: React.FC<GiftsSectionProps> = ({
  gifts,
  profile,
  onAddGift,
  onUpdateGift,
  onDeleteGift,
  isEditMode,
}) => {
  const [filterType, setFilterType] = useState('all');
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingGift, setEditingGift] = useState<Gift | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [photosInput, setPhotosInput] = useState('');
  const [giver, setGiver] = useState(profile.partner1.name);
  const [receiver, setReceiver] = useState(profile.partner2.name);
  const [date, setDate] = useState('');
  const [occasion, setOccasion] = useState('Anniversary');
  const [description, setDescription] = useState('');
  const [story, setStory] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const occasions = ['Anniversary', 'Sinh nhật', 'Valentine', 'Giáng sinh', 'Không nhân dịp gì'];

  const handleImageFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        setIsUploading(true);
        const url = await uploadImage(file);
        setPhotosInput(url);
      } catch (err) {
        console.error('Failed to upload gift image', err);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const filteredGifts = gifts
    .filter((g) => {
      if (filterType === 'all') return true;
      if (filterType === 'from-p1') return g.giver === profile.partner1.name;
      if (filterType === 'from-p2') return g.giver === profile.partner2.name;
      return g.occasion === filterType;
    })
    .filter((g) => (onlyFavorites ? g.favorite : true));

  const handleToggleFavorite = (gift: Gift) => {
    soundFx.playHeartChime();
    onUpdateGift({
      ...gift,
      favorite: !gift.favorite,
    });
  };

  const openAddModal = () => {
    setEditingGift(null);
    setName('');
    setPhotosInput('');
    setGiver(profile.partner1.name);
    setReceiver(profile.partner2.name);
    setDate(new Date().toISOString().split('T')[0]);
    setOccasion('Anniversary');
    setDescription('');
    setStory('');
    setIsAddModalOpen(true);
  };

  const openEditModal = (gift: Gift) => {
    setEditingGift(gift);
    setName(gift.name);
    setPhotosInput(gift.photos.join('\n'));
    setGiver(gift.giver);
    setReceiver(gift.receiver);
    setDate(gift.date);
    setOccasion(gift.occasion);
    setDescription(gift.description);
    setStory(gift.story);
    setIsAddModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !date) return;

    const photos = photosInput
      .split('\n')
      .map((p) => p.trim())
      .filter(Boolean);

    if (editingGift) {
      onUpdateGift({
        ...editingGift,
        name,
        photos: photos.length ? photos : ['https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800'],
        giver,
        receiver,
        date,
        occasion,
        description,
        story,
      });
    } else {
      onAddGift({
        name,
        photos: photos.length ? photos : ['https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800'],
        giver,
        receiver,
        date,
        occasion,
        description,
        story,
        favorite: false,
      });
    }

    soundFx.playCelebration();
    setIsAddModalOpen(false);
  };

  return (
    <section id="gifts" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-100/80 dark:bg-pink-950/60 text-pink-600 dark:text-pink-300 text-xs font-semibold mb-2">
          <GiftIcon className="w-3.5 h-3.5 text-pink-500" />
          <span>Những món quà trao gửi</span>
        </div>
        <h2 className="font-romantic text-4xl sm:text-5xl text-rose-600 dark:text-rose-400 font-bold mb-3">
          Our Gifts
        </h2>
        <p className="font-handwriting text-2xl text-pink-700/80 dark:text-pink-300/80 max-w-lg mx-auto">
          Không chỉ là quà, đó là từng sự quan tâm, thấu hiểu và tình yêu trao trọn.
        </p>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              filterType === 'all'
                ? 'bg-rose-500 text-white'
                : 'bg-pink-100/60 dark:bg-zinc-800 text-pink-700 dark:text-pink-300 hover:bg-pink-200/60'
            }`}
          >
            Tất cả quà ({gifts.length})
          </button>
          <button
            onClick={() => setFilterType('from-p1')}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              filterType === 'from-p1'
                ? 'bg-rose-500 text-white'
                : 'bg-pink-100/60 dark:bg-zinc-800 text-pink-700 dark:text-pink-300 hover:bg-pink-200/60'
            }`}
          >
            Quà từ {profile.partner1.name}
          </button>
          <button
            onClick={() => setFilterType('from-p2')}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              filterType === 'from-p2'
                ? 'bg-rose-500 text-white'
                : 'bg-pink-100/60 dark:bg-zinc-800 text-pink-700 dark:text-pink-300 hover:bg-pink-200/60'
            }`}
          >
            Quà từ {profile.partner2.name}
          </button>
          {occasions.map((occ) => (
            <button
              key={occ}
              onClick={() => setFilterType(occ)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                filterType === occ
                  ? 'bg-rose-500 text-white'
                  : 'bg-pink-100/60 dark:bg-zinc-800 text-pink-700 dark:text-pink-300 hover:bg-pink-200/60'
              }`}
            >
              {occ}
            </button>
          ))}
          <button
            onClick={() => setOnlyFavorites(!onlyFavorites)}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
              onlyFavorites
                ? 'bg-rose-100 dark:bg-rose-950/60 border-rose-300 text-rose-600'
                : 'border-pink-200 dark:border-zinc-700 text-pink-600 dark:text-pink-400'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${onlyFavorites ? 'fill-rose-500' : ''}`} />
            <span>Yêu thích</span>
          </button>

          <button
            onClick={openAddModal}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-rose-500 hover:bg-rose-600 text-white text-xs font-semibold shadow-sm ml-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm món quà</span>
          </button>
        </div>
      </div>

      {/* Gifts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGifts.map((gift, idx) => (
          <div
            key={gift.id}
            className="polaroid-card group relative bg-white dark:bg-zinc-900 p-5 rounded-3xl border border-pink-200/80 dark:border-zinc-800 shadow-md flex flex-col justify-between"
          >
            {/* Scrap tape */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5 tape-effect border-dashed border-t border-b border-pink-300 z-10" />

            <div>
              {/* Photo */}
              {gift.photos[0] && (
                <div className="relative aspect-[16/11] rounded-2xl overflow-hidden bg-pink-100 mb-4">
                  <img
                    src={gift.photos[0]}
                    alt={gift.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 right-2.5">
                    <Sticker type="bow" size="sm" />
                  </div>
                  <button
                    onClick={() => handleToggleFavorite(gift)}
                    className="absolute bottom-2.5 right-2.5 p-2 rounded-full bg-white/80 dark:bg-zinc-800/80 text-rose-500 hover:scale-115 transition-transform"
                  >
                    <Heart className={`w-4 h-4 ${gift.favorite ? 'fill-rose-500' : ''}`} />
                  </button>
                </div>
              )}

              {/* Tag & Date */}
              <div className="flex items-center justify-between gap-2 mb-2 text-xs">
                <span className="px-2.5 py-0.5 rounded-full bg-pink-100 dark:bg-pink-900/40 text-pink-700 dark:text-pink-300 font-medium">
                  {gift.occasion}
                </span>
                <div className="flex items-center gap-1 text-pink-500 dark:text-pink-400">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{new Date(gift.date).toLocaleDateString('vi-VN')}</span>
                </div>
              </div>

              <h3 className="font-sans font-bold text-lg text-pink-950 dark:text-pink-100 mb-2">
                {gift.name}
              </h3>

              <div className="flex items-center gap-1.5 text-xs text-rose-600 dark:text-rose-400 font-semibold mb-3">
                <span>{gift.giver}</span>
                <span className="text-pink-300">➔</span>
                <span>{gift.receiver}</span>
              </div>

              <p className="text-xs text-pink-700/90 dark:text-pink-300/90 leading-relaxed mb-3">
                {gift.description}
              </p>

              {gift.story && (
                <div className="p-3 rounded-2xl bg-pink-50/70 dark:bg-zinc-800/70 border border-dashed border-pink-200 dark:border-zinc-700">
                  <div className="text-[11px] font-bold uppercase text-pink-400 mb-1">
                    Câu chuyện đằng sau:
                  </div>
                  <p className="font-handwriting text-lg text-pink-900 dark:text-pink-100 leading-snug">
                    "{gift.story}"
                  </p>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-1 pt-3 mt-3 border-t border-pink-50 dark:border-zinc-800">
              <button
                onClick={() => openEditModal(gift)}
                className="p-1.5 rounded-lg text-pink-400 hover:text-pink-600 hover:bg-pink-50"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
              {isEditMode && (
                <button
                  onClick={() => onDeleteGift(gift.id)}
                  className="p-1.5 rounded-lg text-rose-400 hover:text-rose-600 hover:bg-rose-50"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Gift Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-lg bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-pink-200 dark:border-zinc-800 shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-pink-100 text-zinc-500"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-romantic text-3xl text-rose-600 dark:text-rose-400 font-bold mb-4">
              {editingGift ? 'Chỉnh sửa món quà' : 'Lưu thêm món quà kỷ niệm 🎁'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-3 text-sm">
              <div>
                <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-300 mb-1">
                  Tên món quà *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Máy ảnh chụp lấy liền..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-pink-50/50 dark:bg-zinc-800/60 border border-pink-200 dark:border-zinc-700 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-300 mb-1">
                    Người tặng
                  </label>
                  <input
                    type="text"
                    value={giver}
                    onChange={(e) => setGiver(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-pink-50/50 dark:bg-zinc-800/60 border border-pink-200 dark:border-zinc-700 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-300 mb-1">
                    Người nhận
                  </label>
                  <input
                    type="text"
                    value={receiver}
                    onChange={(e) => setReceiver(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-pink-50/50 dark:bg-zinc-800/60 border border-pink-200 dark:border-zinc-700 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-300 mb-1">
                    Ngày tặng
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
                    Dịp đặc biệt
                  </label>
                  <select
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-pink-50/50 dark:bg-zinc-800/60 border border-pink-200 dark:border-zinc-700 text-xs"
                  >
                    {occasions.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-300 mb-1">
                  Mô tả món quà
                </label>
                <input
                  type="text"
                  placeholder="Mô tả chi tiết..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-pink-50/50 dark:bg-zinc-800/60 border border-pink-200 dark:border-zinc-700 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-300 mb-1">
                  Câu chuyện đằng sau món quà
                </label>
                <textarea
                  rows={2}
                  placeholder="Cảm xúc lúc trao và nhận..."
                  value={story}
                  onChange={(e) => setStory(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-pink-50/50 dark:bg-zinc-800/60 border border-pink-200 dark:border-zinc-700 text-xs font-handwriting text-lg"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-300">
                    Ảnh món quà
                  </label>
                  <label className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs font-semibold cursor-pointer shadow-sm hover:opacity-90 active:scale-95 transition-all ${isUploading ? 'opacity-60 pointer-events-none' : ''}`}>
                    {isUploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Camera className="w-3.5 h-3.5" />}
                    <span>{isUploading ? 'Đang tải ảnh...' : 'Tải ảnh từ điện thoại'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      disabled={isUploading}
                      onChange={handleImageFile}
                      className="hidden"
                    />
                  </label>
                </div>

                {photosInput && (
                  <div className="relative mb-2 w-full h-40 rounded-xl overflow-hidden border border-pink-200 dark:border-zinc-700 bg-pink-50/50 dark:bg-zinc-800/60 group">
                    <img
                      src={photosInput.split('\n')[0]}
                      alt="Ảnh món quà"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setPhotosInput('')}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white hover:bg-rose-500 transition-colors shadow-sm"
                      title="Xóa ảnh này"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                <input
                  type="text"
                  value={photosInput}
                  onChange={(e) => setPhotosInput(e.target.value)}
                  placeholder="Hoặc dán link ảnh https://... (tùy chọn)"
                  className="w-full px-3 py-2 rounded-xl bg-pink-50/50 dark:bg-zinc-800/60 border border-pink-200 dark:border-zinc-700 text-xs text-zinc-600 dark:text-zinc-300"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-1.5 rounded-full text-xs text-zinc-600"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-rose-500 text-white text-xs font-bold"
                >
                  {editingGift ? 'Cập nhật' : 'Lưu món quà'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

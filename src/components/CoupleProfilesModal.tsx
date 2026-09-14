import React, { useState } from 'react';
import { CoupleProfile, PartnerProfile } from '../types';
import { soundFx } from '../utils/soundEffects';
import { Sticker } from './Sticker';
import {
  Heart,
  X,
  Edit3,
  Utensils,
  Coffee,
  MapPin,
  Film,
  Music,
  Palette,
  Sparkles,
  Calendar,
} from 'lucide-react';

interface CoupleProfilesModalProps {
  profile: CoupleProfile;
  isOpen: boolean;
  onClose: () => void;
  onUpdateProfile: (profile: CoupleProfile) => void;
  isEditMode: boolean;
}

export const CoupleProfilesModal: React.FC<CoupleProfilesModalProps> = ({
  profile,
  isOpen,
  onClose,
  onUpdateProfile,
  isEditMode,
}) => {
  const [activePartner, setActivePartner] = useState<'p1' | 'p2'>('p1');
  const [isEditing, setIsEditing] = useState(false);

  // Form states for current partner
  const p1 = profile.partner1;
  const p2 = profile.partner2;

  const current = activePartner === 'p1' ? p1 : p2;

  const [name, setName] = useState(current.name);
  const [nickname, setNickname] = useState(current.nickname);
  const [avatar, setAvatar] = useState(current.avatar);
  const [birthday, setBirthday] = useState(current.birthday);
  const [favFood, setFavFood] = useState(current.favFood);
  const [favDrink, setFavDrink] = useState(current.favDrink);
  const [favPlace, setFavPlace] = useState(current.favPlace);
  const [favMovie, setFavMovie] = useState(current.favMovie);
  const [favSong, setFavSong] = useState(current.favSong);
  const [favColor, setFavColor] = useState(current.favColor);
  const [favThingAboutOther, setFavThingAboutOther] = useState(current.favoriteThingAboutOther || '');
  const [quote, setQuote] = useState(current.quote);

  if (!isOpen) return null;

  const handleSwitch = (partner: 'p1' | 'p2') => {
    setActivePartner(partner);
    setIsEditing(false);
    const target = partner === 'p1' ? p1 : p2;
    setName(target.name);
    setNickname(target.nickname);
    setAvatar(target.avatar);
    setBirthday(target.birthday);
    setFavFood(target.favFood);
    setFavDrink(target.favDrink);
    setFavPlace(target.favPlace);
    setFavMovie(target.favMovie);
    setFavSong(target.favSong);
    setFavColor(target.favColor);
    setFavThingAboutOther(target.favoriteThingAboutOther || '');
    setQuote(target.quote);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedPartner: PartnerProfile = {
      name,
      nickname,
      avatar,
      birthday,
      favFood,
      favDrink,
      favPlace,
      favMovie,
      favSong,
      favColor,
      favoriteThingAboutOther: favThingAboutOther,
      quote,
    };

    if (activePartner === 'p1') {
      onUpdateProfile({ ...profile, partner1: updatedPartner });
    } else {
      onUpdateProfile({ ...profile, partner2: updatedPartner });
    }

    soundFx.playCelebration();
    setIsEditing(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 border-2 border-pink-200 dark:border-zinc-800 shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Scrap tape */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 tape-effect border-dashed border-t border-b border-pink-300 z-10" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-pink-50 text-zinc-500"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-pink-600 text-xs font-bold mb-2">
            <Heart className="w-3.5 h-3.5 fill-pink-500" />
            <span>Hồ sơ tình yêu</span>
          </div>
          <h3 className="font-romantic text-3xl sm:text-4xl text-rose-600 dark:text-rose-400 font-bold">
            Couple Profile
          </h3>

          {/* Switch tabs */}
          <div className="flex items-center justify-center gap-3 mt-4">
            <button
              onClick={() => handleSwitch('p1')}
              className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
                activePartner === 'p1'
                  ? 'bg-rose-500 text-white shadow-md'
                  : 'bg-pink-100 text-pink-700 hover:bg-pink-200'
              }`}
            >
              <img
                src={p1.avatar}
                alt={p1.name}
                referrerPolicy="no-referrer"
                className="w-5 h-5 rounded-full object-cover"
              />
              <span>{p1.name} ({p1.nickname})</span>
            </button>
            <button
              onClick={() => handleSwitch('p2')}
              className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
                activePartner === 'p2'
                  ? 'bg-rose-500 text-white shadow-md'
                  : 'bg-pink-100 text-pink-700 hover:bg-pink-200'
              }`}
            >
              <img
                src={p2.avatar}
                alt={p2.name}
                referrerPolicy="no-referrer"
                className="w-5 h-5 rounded-full object-cover"
              />
              <span>{p2.name} ({p2.nickname})</span>
            </button>
          </div>
        </div>

        {/* View Mode */}
        {!isEditing ? (
          <div>
            <div className="flex flex-col sm:flex-row items-center gap-6 p-6 rounded-3xl bg-pink-50/50 dark:bg-zinc-800/40 border border-pink-100 dark:border-zinc-800 mb-6">
              <div className="relative shrink-0">
                <img
                  src={current.avatar}
                  alt={current.name}
                  referrerPolicy="no-referrer"
                  className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl object-cover shadow-md border-4 border-white dark:border-zinc-700"
                />
                <div className="absolute -bottom-2 -right-2">
                  <Sticker type="heart" size="sm" />
                </div>
              </div>

              <div className="text-center sm:text-left flex-1">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <h4 className="font-sans font-bold text-2xl text-zinc-900 dark:text-zinc-100">
                    {current.name}
                  </h4>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-600 font-bold">
                    {current.nickname}
                  </span>
                </div>
                <div className="flex items-center justify-center sm:justify-start gap-1 text-xs text-zinc-500 mt-1">
                  <Calendar className="w-3.5 h-3.5 text-rose-400" />
                  <span>Sinh nhật: {new Date(current.birthday).toLocaleDateString('vi-VN')}</span>
                </div>

                <p className="font-handwriting text-2xl text-rose-600 dark:text-rose-300 mt-3 leading-snug">
                  "{current.quote}"
                </p>
              </div>
            </div>

            {/* Favorite items grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-white dark:bg-zinc-800/80 border border-pink-100 dark:border-zinc-700 text-xs">
                <Utensils className="w-4 h-4 text-orange-500 shrink-0" />
                <div>
                  <div className="text-[10px] text-zinc-400 uppercase font-bold">Món ăn yêu thích</div>
                  <div className="font-semibold text-zinc-800 dark:text-zinc-200">{current.favFood}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-2xl bg-white dark:bg-zinc-800/80 border border-pink-100 dark:border-zinc-700 text-xs">
                <Coffee className="w-4 h-4 text-amber-600 shrink-0" />
                <div>
                  <div className="text-[10px] text-zinc-400 uppercase font-bold">Đồ uống ruột</div>
                  <div className="font-semibold text-zinc-800 dark:text-zinc-200">{current.favDrink}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-2xl bg-white dark:bg-zinc-800/80 border border-pink-100 dark:border-zinc-700 text-xs">
                <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
                <div>
                  <div className="text-[10px] text-zinc-400 uppercase font-bold">Nơi thích đến nhất</div>
                  <div className="font-semibold text-zinc-800 dark:text-zinc-200">{current.favPlace}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-2xl bg-white dark:bg-zinc-800/80 border border-pink-100 dark:border-zinc-700 text-xs">
                <Film className="w-4 h-4 text-purple-500 shrink-0" />
                <div>
                  <div className="text-[10px] text-zinc-400 uppercase font-bold">Bộ phim thích xem</div>
                  <div className="font-semibold text-zinc-800 dark:text-zinc-200">{current.favMovie}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-2xl bg-white dark:bg-zinc-800/80 border border-pink-100 dark:border-zinc-700 text-xs">
                <Music className="w-4 h-4 text-emerald-500 shrink-0" />
                <div>
                  <div className="text-[10px] text-zinc-400 uppercase font-bold">Bài hát hay nghe</div>
                  <div className="font-semibold text-zinc-800 dark:text-zinc-200">{current.favSong}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-2xl bg-white dark:bg-zinc-800/80 border border-pink-100 dark:border-zinc-700 text-xs">
                <Palette className="w-4 h-4 text-pink-500 shrink-0" />
                <div>
                  <div className="text-[10px] text-zinc-400 uppercase font-bold">Màu sắc ưa thích</div>
                  <div className="font-semibold text-zinc-800 dark:text-zinc-200">{current.favColor}</div>
                </div>
              </div>
            </div>

            {/* Favorite thing about other person */}
            <div className="p-4 rounded-2xl bg-rose-50 dark:bg-zinc-800/60 border border-rose-200 dark:border-zinc-700">
              <div className="flex items-center gap-1.5 text-xs font-bold text-rose-500 mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Điều thích nhất ở người ấy:</span>
              </div>
              <p className="font-handwriting text-2xl text-pink-950 dark:text-pink-100 leading-snug">
                "{current.favoriteThingAboutOther}"
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-4">
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-1 px-4 py-1.5 rounded-full bg-pink-100 hover:bg-pink-200 text-pink-700 text-xs font-semibold"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Chỉnh sửa hồ sơ</span>
              </button>
            </div>
          </div>
        ) : (
          /* Edit Mode Form */
          <form onSubmit={handleSave} className="space-y-3 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-zinc-700 dark:text-zinc-300 block mb-1">Tên</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 rounded-xl bg-pink-50/50 border border-pink-200 dark:bg-zinc-800 dark:border-zinc-700"
                />
              </div>
              <div>
                <label className="font-bold text-zinc-700 dark:text-zinc-300 block mb-1">Biệt danh</label>
                <input
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  className="w-full p-2 rounded-xl bg-pink-50/50 border border-pink-200 dark:bg-zinc-800 dark:border-zinc-700"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-zinc-700 dark:text-zinc-300 block mb-1">Sinh nhật</label>
                <input
                  type="date"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                  className="w-full p-2 rounded-xl bg-pink-50/50 border border-pink-200 dark:bg-zinc-800 dark:border-zinc-700"
                />
              </div>
              <div>
                <label className="font-bold text-zinc-700 dark:text-zinc-300 block mb-1">Link Avatar</label>
                <input
                  type="text"
                  value={avatar}
                  onChange={(e) => setAvatar(e.target.value)}
                  className="w-full p-2 rounded-xl bg-pink-50/50 border border-pink-200 dark:bg-zinc-800 dark:border-zinc-700"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-zinc-700 dark:text-zinc-300 block mb-1">Món ăn thích</label>
                <input
                  type="text"
                  value={favFood}
                  onChange={(e) => setFavFood(e.target.value)}
                  className="w-full p-2 rounded-xl bg-pink-50/50 border border-pink-200 dark:bg-zinc-800 dark:border-zinc-700"
                />
              </div>
              <div>
                <label className="font-bold text-zinc-700 dark:text-zinc-300 block mb-1">Đồ uống thích</label>
                <input
                  type="text"
                  value={favDrink}
                  onChange={(e) => setFavDrink(e.target.value)}
                  className="w-full p-2 rounded-xl bg-pink-50/50 border border-pink-200 dark:bg-zinc-800 dark:border-zinc-700"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-zinc-700 dark:text-zinc-300 block mb-1">Điều thích nhất ở người ấy</label>
              <input
                type="text"
                value={favThingAboutOther}
                onChange={(e) => setFavThingAboutOther(e.target.value)}
                className="w-full p-2 rounded-xl bg-pink-50/50 border border-pink-200 dark:bg-zinc-800 dark:border-zinc-700"
              />
            </div>

            <div>
              <label className="font-bold text-zinc-700 dark:text-zinc-300 block mb-1">Câu nói yêu thích (Quote)</label>
              <input
                type="text"
                value={quote}
                onChange={(e) => setQuote(e.target.value)}
                className="w-full p-2 rounded-xl bg-pink-50/50 border border-pink-200 dark:border-zinc-700 font-handwriting text-lg"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-1.5 rounded-full text-zinc-500"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-full bg-rose-500 text-white font-bold"
              >
                Lưu hồ sơ
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

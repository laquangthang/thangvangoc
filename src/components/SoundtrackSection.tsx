import React, { useState } from 'react';
import { Song } from '../types';
import { soundFx } from '../utils/soundEffects';
import { Sticker } from './Sticker';
import { uploadImage } from '../utils/cloudinary';
import {
  Music,
  Heart,
  Play,
  Pause,
  ExternalLink,
  Plus,
  Disc3,
  X,
  Trash2,
  Volume2,
  Camera,
  Loader2,
  Edit3,
} from 'lucide-react';

interface SoundtrackSectionProps {
  songs: Song[];
  onAddSong: (song: Omit<Song, 'id'>) => void;
  onUpdateSong?: (song: Song) => void;
  onDeleteSong: (id: string) => void;
  isEditMode: boolean;
}

export const SoundtrackSection: React.FC<SoundtrackSectionProps> = ({
  songs,
  onAddSong,
  onUpdateSong,
  onDeleteSong,
  isEditMode,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(soundFx.getIsBgmPlaying());
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingSong, setEditingSong] = useState<Song | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [cover, setCover] = useState('');
  const [url, setUrl] = useState('https://open.spotify.com');
  const [note, setNote] = useState('');
  const [isOurSong, setIsOurSong] = useState(false);

  const ourSong = songs.find((s) => s.isOurSong) || songs[0];

  const handleToggleBgm = () => {
    const nextState = soundFx.toggleBgm((playing) => setIsPlayingAudio(playing));
    setIsPlayingAudio(nextState);
  };

  const handleImageFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        setIsUploading(true);
        const uploadedUrl = await uploadImage(file);
        setCover(uploadedUrl);
      } catch (err) {
        alert((err as Error).message);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const openAddModal = () => {
    setEditingSong(null);
    setTitle('');
    setArtist('');
    setCover('');
    setUrl('https://open.spotify.com');
    setNote('');
    setIsOurSong(false);
    setIsAddModalOpen(true);
  };

  const openEditModal = (song: Song) => {
    setEditingSong(song);
    setTitle(song.title);
    setArtist(song.artist);
    setCover(song.cover || '');
    setUrl(song.url || '');
    setNote(song.note || '');
    setIsOurSong(!!song.isOurSong);
    setIsAddModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !artist.trim()) return;

    const finalCover = cover.trim() || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800';

    if (editingSong && onUpdateSong) {
      onUpdateSong({
        ...editingSong,
        title,
        artist,
        cover: finalCover,
        url,
        note,
        isOurSong,
      });
    } else {
      onAddSong({
        title,
        artist,
        cover: finalCover,
        url,
        note,
        isOurSong,
      });
    }

    soundFx.playCelebration();
    setIsAddModalOpen(false);
    setEditingSong(null);
  };

  return (
    <section id="soundtrack" className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-100/80 dark:bg-rose-950/60 text-rose-600 dark:text-rose-300 text-xs font-semibold mb-2">
          <Music className="w-3.5 h-3.5 text-rose-500" />
          <span>Giai điệu của hai đứa</span>
        </div>
        <h2 className="font-romantic text-4xl sm:text-5xl text-rose-600 dark:text-rose-400 font-bold mb-1">
          Our Soundtrack
        </h2>
        <p className="font-handwriting text-2xl text-pink-700/80 dark:text-pink-300/80 italic max-w-lg mx-auto">
          "Songs That Remind Me of You"
        </p>

        <div className="flex items-center justify-center gap-3 mt-4">
          <button
            onClick={handleToggleBgm}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all shadow-md ${
              isPlayingAudio
                ? 'bg-rose-500 text-white animate-pulse'
                : 'bg-white dark:bg-zinc-800 border border-pink-200 dark:border-zinc-700 text-rose-600 dark:text-rose-300'
            }`}
          >
            {isPlayingAudio ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isPlayingAudio ? 'Đang phát giai điệu lãng mạn' : 'Bật nhạc nền lãng mạn (BGM)'}</span>
            <Volume2 className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={openAddModal}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-rose-500 text-white text-xs font-semibold shadow-sm cursor-pointer hover:bg-rose-600 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm bài hát</span>
          </button>
        </div>
      </div>

      {/* Featured "Our Song" Record Player Banner */}
      {ourSong && (
        <div className="relative rounded-3xl bg-gradient-to-r from-zinc-900 via-rose-950 to-zinc-900 text-white p-6 sm:p-8 mb-8 border border-rose-900/50 shadow-2xl overflow-hidden">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Spinning Vinyl Record Visual */}
            <div className="relative shrink-0">
              <div
                className={`w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-black border-4 border-zinc-700 shadow-xl flex items-center justify-center ${
                  isPlayingAudio ? 'animate-spin' : ''
                }`}
                style={{ animationDuration: '6s' }}
              >
                {/* Grooves */}
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-zinc-800 flex items-center justify-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-zinc-700 flex items-center justify-center">
                    <img
                      src={ourSong.cover}
                      alt={ourSong.title}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-rose-400"
                    />
                  </div>
                </div>
              </div>
              <div className="absolute top-0 right-0 p-1.5 rounded-full bg-rose-500 text-white shadow-md">
                <Heart className="w-3.5 h-3.5 fill-white" />
              </div>
            </div>

            {/* Song details */}
            <div className="flex-1 text-center sm:text-left min-w-0">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/30 text-rose-300 text-xs font-bold uppercase tracking-wider mb-2 border border-rose-500/40">
                <Heart className="w-3 h-3 fill-rose-400 text-rose-400" />
                <span>Our Song ❤️</span>
              </div>
              <h3 className="font-sans font-bold text-2xl sm:text-3xl text-white truncate">
                {ourSong.title}
              </h3>
              <p className="text-sm text-pink-300 font-medium mb-3">
                {ourSong.artist}
              </p>
              <p className="font-handwriting text-2xl text-pink-100/90 leading-relaxed max-w-xl">
                "{ourSong.note}"
              </p>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-4">
                <button
                  onClick={handleToggleBgm}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold transition-transform hover:scale-105"
                >
                  {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{isPlayingAudio ? 'Tạm dừng nhạc' : 'Phát giai điệu'}</span>
                </button>
                {ourSong.url && (
                  <a
                    href={ourSong.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-medium border border-white/20"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Nghe trên Spotify / YouTube</span>
                  </a>
                )}
                {isEditMode && onUpdateSong && (
                  <button
                    onClick={() => openEditModal(ourSong)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-medium border border-white/20 transition-colors"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Sửa bài hát này</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Playlist Grid */}
      <div className="space-y-3">
        {songs.map((song) => (
          <div
            key={song.id}
            className="flex items-center justify-between gap-4 p-3 sm:p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-pink-200/70 dark:border-zinc-800 shadow-sm hover:border-pink-300 transition-colors"
          >
            <div className="flex items-center gap-3 min-w-0">
              <img
                src={song.cover}
                alt={song.title}
                referrerPolicy="no-referrer"
                className="w-12 h-12 rounded-xl object-cover shrink-0"
              />
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-sans font-bold text-sm text-zinc-900 dark:text-zinc-100 truncate">
                    {song.title}
                  </h4>
                  {song.isOurSong && (
                    <span className="px-2 py-0.2 rounded-full bg-rose-100 text-rose-600 text-[10px] font-bold">
                      Our Song ❤️
                    </span>
                  )}
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                  {song.artist}
                </p>
                {song.note && (
                  <p className="font-handwriting text-base text-pink-700 dark:text-pink-300 truncate hidden sm:block">
                    "{song.note}"
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {song.url && (
                <a
                  href={song.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl text-zinc-400 hover:text-rose-500 hover:bg-pink-50 transition-colors"
                  title="Mở liên kết bài hát"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
              {isEditMode && (
                <>
                  <button
                    onClick={() => openEditModal(song)}
                    className="p-2 rounded-xl text-zinc-400 hover:text-pink-500 hover:bg-pink-50 transition-colors"
                    title="Chỉnh sửa bài hát"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDeleteSong(song.id)}
                    className="p-2 rounded-xl text-zinc-400 hover:text-rose-500 hover:bg-rose-50 transition-colors"
                    title="Xóa bài hát"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Song Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-md bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-pink-200 dark:border-zinc-800 shadow-2xl">
            <button
              onClick={() => {
                setIsAddModalOpen(false);
                setEditingSong(null);
              }}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-pink-50 text-zinc-500"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-romantic text-3xl text-rose-600 dark:text-rose-400 font-bold mb-4">
              {editingSong ? 'Chỉnh sửa bài hát 🎵' : 'Thêm bài hát mới 🎵'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-sm">
              <div>
                <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-300 mb-1">
                  Tên bài hát *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Until I Found You..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-pink-50/50 dark:bg-zinc-800/60 border border-pink-200 dark:border-zinc-700 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-300 mb-1">
                  Nghệ sĩ thể hiện *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Stephen Sanchez..."
                  value={artist}
                  onChange={(e) => setArtist(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-pink-50/50 dark:bg-zinc-800/60 border border-pink-200 dark:border-zinc-700 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-300 mb-1">
                  Kỷ niệm / Lời nhắn gắn với bài hát
                </label>
                <textarea
                  rows={2}
                  placeholder="Bài hát này làm anh nhớ đến lúc..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-pink-50/50 dark:bg-zinc-800/60 border border-pink-200 dark:border-zinc-700 text-xs font-handwriting text-lg"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-300">
                    Ảnh bìa bài hát (Cover)
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

                {cover && (
                  <div className="relative mb-2 w-full h-36 rounded-xl overflow-hidden border border-pink-200 dark:border-zinc-700 bg-pink-50/50 dark:bg-zinc-800/60 group">
                    <img
                      src={cover}
                      alt="Cover preview"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setCover('')}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white hover:bg-rose-500 transition-colors shadow-sm"
                      title="Xóa ảnh này"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                <input
                  type="text"
                  value={cover}
                  onChange={(e) => setCover(e.target.value)}
                  placeholder="Hoặc dán link ảnh https://... (tùy chọn)"
                  className="w-full px-3 py-2 rounded-xl bg-pink-50/50 dark:bg-zinc-800/60 border border-pink-200 dark:border-zinc-700 text-xs text-zinc-600 dark:text-zinc-300"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-300 mb-1">
                  Link Spotify / YouTube
                </label>
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://open.spotify.com/..."
                  className="w-full px-3 py-2 rounded-xl bg-pink-50/50 dark:bg-zinc-800/60 border border-pink-200 dark:border-zinc-700 text-xs"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="ourSongCheck"
                  checked={isOurSong}
                  onChange={(e) => setIsOurSong(e.target.checked)}
                  className="rounded text-rose-500 focus:ring-rose-400"
                />
                <label htmlFor="ourSongCheck" className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                  Đặt làm "Our Song ❤️" (Bài hát tình yêu của hai đứa)
                </label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setEditingSong(null);
                  }}
                  className="px-4 py-1.5 rounded-full text-xs text-zinc-600"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-rose-500 text-white text-xs font-bold shadow-sm hover:bg-rose-600 transition-colors"
                >
                  {editingSong ? 'Lưu thay đổi' : 'Thêm vào playlist'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

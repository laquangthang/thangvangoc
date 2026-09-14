import React, { useState } from 'react';
import { LoveLetter, FutureLetter } from '../types';
import { soundFx } from '../utils/soundEffects';
import { Sticker } from './Sticker';
import {
  Mail,
  Heart,
  Plus,
  Calendar,
  Lock,
  Unlock,
  X,
  Clock,
  Sparkles,
  Smile,
  Eye,
} from 'lucide-react';

interface LettersSectionProps {
  letters: LoveLetter[];
  futureLetters: FutureLetter[];
  onAddLetter: (letter: Omit<LoveLetter, 'id'>) => void;
  onAddFutureLetter: (letter: Omit<FutureLetter, 'id'>) => void;
  isEditMode: boolean;
}

export const LettersSection: React.FC<LettersSectionProps> = ({
  letters,
  futureLetters,
  onAddLetter,
  onAddFutureLetter,
  isEditMode,
}) => {
  const [activeTab, setActiveTab] = useState<'open-when' | 'future'>('open-when');
  const [selectedLetter, setSelectedLetter] = useState<LoveLetter | null>(null);
  const [selectedFutureLetter, setSelectedFutureLetter] = useState<FutureLetter | null>(null);

  const [isAddLetterModalOpen, setIsAddLetterModalOpen] = useState(false);
  const [isAddFutureModalOpen, setIsAddFutureModalOpen] = useState(false);

  // Add letter form
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState("Open when you're sad");
  const [sender, setSender] = useState('Thế Vinh');
  const [recipient, setRecipient] = useState('Khánh An');
  const [content, setContent] = useState('');
  const [mood, setMood] = useState('Ấm áp');

  // Add future letter form
  const [futureTitle, setFutureTitle] = useState('');
  const [unlockDate, setUnlockDate] = useState('');
  const [futureContent, setFutureContent] = useState('');

  const categories = [
    "Open when you're sad",
    "Open when you miss me",
    "Open when you can't sleep",
    "Open when we had a fight",
    "Open on our anniversary",
    "Open on your birthday",
    "Thư tình bình thường",
  ];

  const handleOpenLetter = (letter: LoveLetter) => {
    soundFx.playCelebration();
    setSelectedLetter(letter);
  };

  const handleOpenFutureLetter = (fl: FutureLetter) => {
    const isUnlocked = new Date(fl.unlockDate).getTime() <= new Date().getTime();
    if (isUnlocked) {
      soundFx.playCelebration();
      setSelectedFutureLetter(fl);
    } else {
      alert(`Bức thư này được khóa niêm phong đến ngày ${new Date(fl.unlockDate).toLocaleDateString('vi-VN')}! Hãy kiên nhẫn đợi đến ngày đó nhé 💕`);
    }
  };

  const handleCreateLetter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    onAddLetter({
      title,
      category,
      sender,
      recipient,
      content,
      mood,
      date: new Date().toISOString().split('T')[0],
      isOpened: false,
    });

    soundFx.playCelebration();
    setIsAddLetterModalOpen(false);
  };

  const handleCreateFutureLetter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!futureTitle.trim() || !unlockDate || !futureContent.trim()) return;

    onAddFutureLetter({
      title: futureTitle,
      unlockDate,
      writeDate: new Date().toISOString().split('T')[0],
      sender,
      recipient,
      content: futureContent,
      sealed: true,
    });

    soundFx.playCelebration();
    setIsAddFutureModalOpen(false);
  };

  return (
    <section id="letters" className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-100/80 dark:bg-rose-950/60 text-rose-600 dark:text-rose-300 text-xs font-semibold mb-2">
          <Mail className="w-3.5 h-3.5 text-rose-500" />
          <span>Hòm thư tình bí mật</span>
        </div>
        <h2 className="font-romantic text-4xl sm:text-5xl text-rose-600 dark:text-rose-400 font-bold mb-3">
          Love Letters & "Open When..."
        </h2>
        <p className="font-handwriting text-2xl text-pink-700/80 dark:text-pink-300/80 max-w-lg mx-auto">
          Những lá thư mở ra khi em cần một cái ôm vô hình từ phương xa.
        </p>

        {/* Tab switcher */}
        <div className="flex items-center justify-center gap-2 mt-6">
          <button
            onClick={() => setActiveTab('open-when')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              activeTab === 'open-when'
                ? 'bg-rose-500 text-white shadow-md shadow-rose-300/40'
                : 'bg-pink-100/60 dark:bg-zinc-800 text-pink-700 dark:text-pink-300'
            }`}
          >
            💌 Thư "Open When..." ({letters.length})
          </button>
          <button
            onClick={() => setActiveTab('future')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              activeTab === 'future'
                ? 'bg-rose-500 text-white shadow-md shadow-rose-300/40'
                : 'bg-pink-100/60 dark:bg-zinc-800 text-pink-700 dark:text-pink-300'
            }`}
          >
            ⏳ Thư gửi tương lai ({futureLetters.length})
          </button>

          <button
            onClick={() => (activeTab === 'open-when' ? setIsAddLetterModalOpen(true) : setIsAddFutureModalOpen(true))}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white dark:bg-zinc-800 border border-pink-200 dark:border-zinc-700 text-rose-600 dark:text-rose-300 text-xs font-semibold hover:bg-pink-50 cursor-pointer ml-2"
          >
            <Plus className="w-4 h-4" />
            <span>Viết thư mới</span>
          </button>
        </div>
      </div>

      {/* Open When... Envelopes Grid */}
      {activeTab === 'open-when' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {letters.map((letter) => (
            <div
              key={letter.id}
              onClick={() => handleOpenLetter(letter)}
              className="group relative cursor-pointer"
            >
              {/* Envelope Design */}
              <div className="relative rounded-3xl bg-gradient-to-b from-rose-50 via-white to-pink-50/80 dark:from-zinc-900 dark:to-rose-950/40 p-6 border-2 border-pink-200 dark:border-zinc-700 shadow-md group-hover:shadow-xl group-hover:-translate-y-1 transition-all">
                {/* Envelope Flap visual */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-rose-200/50 dark:bg-rose-900/40 rounded-b-2xl border-b border-rose-300/50 flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-xs text-xs font-bold">
                    ❤️
                  </div>
                </div>

                <div className="pt-4 text-center">
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-pink-100 dark:bg-pink-900/50 text-rose-600 dark:text-rose-300 text-[11px] font-semibold mb-2">
                    {letter.category}
                  </span>

                  <h3 className="font-handwriting text-2xl font-bold text-pink-950 dark:text-pink-100 group-hover:text-rose-600 transition-colors mb-2">
                    {letter.title}
                  </h3>

                  <div className="flex items-center justify-center gap-2 text-xs text-pink-500 dark:text-pink-400 mb-4">
                    <span>Gửi: {letter.recipient}</span>
                    <span>•</span>
                    <span>Từ: {letter.sender}</span>
                  </div>

                  {/* Stamp & Ribbon */}
                  <div className="flex items-center justify-between pt-3 border-t border-dashed border-pink-200 dark:border-zinc-800 text-xs text-pink-600 dark:text-pink-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {letter.date}
                    </span>
                    <span className="font-semibold text-rose-500 group-hover:underline flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" />
                      <span>Nhấp để mở thư</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Future Letters Grid */}
      {activeTab === 'future' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {futureLetters.map((fl) => {
            const unlockTime = new Date(fl.unlockDate).getTime();
            const nowTime = new Date().getTime();
            const isUnlocked = unlockTime <= nowTime;
            const daysRemaining = Math.max(0, Math.ceil((unlockTime - nowTime) / (1000 * 60 * 60 * 24)));

            return (
              <div
                key={fl.id}
                onClick={() => handleOpenFutureLetter(fl)}
                className={`relative rounded-3xl p-6 border-2 transition-all cursor-pointer ${
                  isUnlocked
                    ? 'bg-white dark:bg-zinc-900 border-emerald-300 dark:border-emerald-700 shadow-lg hover:-translate-y-1'
                    : 'bg-zinc-50/90 dark:bg-zinc-900/60 border-dashed border-zinc-300 dark:border-zinc-700 hover:border-pink-300'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div
                      className={`p-2 rounded-xl ${
                        isUnlocked
                          ? 'bg-emerald-100 text-emerald-600'
                          : 'bg-amber-100 text-amber-600'
                      }`}
                    >
                      {isUnlocked ? <Unlock className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
                    </div>
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                        {isUnlocked ? 'Đã mở khóa' : 'Hộp thư thời gian (Niêm phong)'}
                      </span>
                      <h4 className="font-sans font-bold text-base text-zinc-900 dark:text-zinc-100">
                        {fl.title}
                      </h4>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-zinc-600 dark:text-zinc-400 mb-4">
                  <div className="flex items-center justify-between">
                    <span>Ngày viết:</span>
                    <strong>{new Date(fl.writeDate).toLocaleDateString('vi-VN')}</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Ngày mở niêm phong:</span>
                    <strong className="text-rose-500">
                      {new Date(fl.unlockDate).toLocaleDateString('vi-VN')}
                    </strong>
                  </div>
                </div>

                {isUnlocked ? (
                  <button className="w-full py-2 rounded-xl bg-emerald-500 text-white text-xs font-bold">
                    Mở đọc thư ngay 💌
                  </button>
                ) : (
                  <div className="flex items-center justify-center gap-1.5 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-xs text-zinc-500 font-semibold">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Còn {daysRemaining} ngày nữa mới được mở</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Letter Reading Modal (Handwritten Parchment Overlay) */}
      {selectedLetter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-2xl bg-[#fdfbf7] dark:bg-zinc-900 rounded-3xl p-8 sm:p-10 border-2 border-pink-200 dark:border-zinc-800 shadow-2xl max-h-[90vh] overflow-y-auto">
            {/* Scrap tape */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 tape-effect border-dashed border-t border-b border-pink-300 z-10" />

            <button
              onClick={() => setSelectedLetter(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-pink-100 dark:hover:bg-zinc-800 text-zinc-500"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Letter Header */}
            <div className="text-center pb-6 border-b border-pink-200/60 dark:border-zinc-800 mb-6">
              <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-600 text-xs font-bold">
                {selectedLetter.category}
              </span>
              <h3 className="font-handwriting text-3xl sm:text-4xl text-rose-600 dark:text-rose-400 font-bold mt-2">
                {selectedLetter.title}
              </h3>
              <div className="text-xs text-zinc-500 mt-2">
                Ngày gửi: {new Date(selectedLetter.date).toLocaleDateString('vi-VN')} • Dành riêng cho{' '}
                <strong className="text-rose-600">{selectedLetter.recipient}</strong>
              </div>
            </div>

            {/* Letter Parchment Body */}
            <div className="relative font-handwriting text-2xl sm:text-3xl text-zinc-800 dark:text-zinc-100 leading-relaxed whitespace-pre-line px-2 sm:px-4 py-2">
              {selectedLetter.content}
            </div>

            {/* Letter Signature */}
            <div className="mt-8 text-right pr-4">
              <p className="font-romantic text-2xl text-rose-500 font-bold">
                Yêu thương vô cùng,
              </p>
              <p className="font-handwriting text-2xl text-zinc-700 dark:text-zinc-300">
                {selectedLetter.sender} 💕
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Future Letter Reading Modal */}
      {selectedFutureLetter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-2xl bg-[#fdfbf7] dark:bg-zinc-900 rounded-3xl p-8 sm:p-10 border-2 border-emerald-300 dark:border-emerald-800 shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedFutureLetter(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-zinc-100 text-zinc-500"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center pb-6 border-b border-zinc-200 mb-6">
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">
                Thư từ quá khứ gửi đến hôm nay
              </span>
              <h3 className="font-handwriting text-3xl sm:text-4xl text-emerald-700 dark:text-emerald-400 font-bold mt-2">
                {selectedFutureLetter.title}
              </h3>
            </div>

            <div className="font-handwriting text-2xl sm:text-3xl text-zinc-800 dark:text-zinc-100 leading-relaxed whitespace-pre-line px-2 sm:px-4 py-2">
              {selectedFutureLetter.content}
            </div>
          </div>
        </div>
      )}

      {/* Add Open When Letter Modal */}
      {isAddLetterModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-lg bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-pink-200 dark:border-zinc-800 shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsAddLetterModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-pink-50 text-zinc-500"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-romantic text-3xl text-rose-600 dark:text-rose-400 font-bold mb-4">
              Viết thư tình mới 💌
            </h3>

            <form onSubmit={handleCreateLetter} className="space-y-3.5 text-sm">
              <div>
                <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-300 mb-1">
                  Chủ đề thư (Title) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Open when you're sad..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-pink-50/50 dark:bg-zinc-800/60 border border-pink-200 dark:border-zinc-700 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-300 mb-1">
                  Danh mục Open When...
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-pink-50/50 dark:bg-zinc-800/60 border border-pink-200 dark:border-zinc-700 text-xs"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-300 mb-1">
                    Người viết
                  </label>
                  <input
                    type="text"
                    value={sender}
                    onChange={(e) => setSender(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-pink-50/50 dark:bg-zinc-800/60 border border-pink-200 dark:border-zinc-700 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-300 mb-1">
                    Gửi cho
                  </label>
                  <input
                    type="text"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-pink-50/50 dark:bg-zinc-800/60 border border-pink-200 dark:border-zinc-700 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-300 mb-1">
                  Nội dung bức thư *
                </label>
                <textarea
                  rows={6}
                  required
                  placeholder="Viết những lời chân thành từ trái tim..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-pink-50/50 dark:bg-zinc-800/60 border border-pink-200 dark:border-zinc-700 text-xs font-handwriting text-2xl"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddLetterModalOpen(false)}
                  className="px-4 py-1.5 rounded-full text-xs text-zinc-600"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-rose-500 text-white text-xs font-bold shadow-sm"
                >
                  Gửi vào hòm thư
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Future Letter Modal */}
      {isAddFutureModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-lg bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-pink-200 dark:border-zinc-800 shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsAddFutureModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-pink-50 text-zinc-500"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-romantic text-3xl text-rose-600 dark:text-rose-400 font-bold mb-4">
              Gửi thư cho tương lai ⏳
            </h3>

            <form onSubmit={handleCreateFutureLetter} className="space-y-3.5 text-sm">
              <div>
                <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-300 mb-1">
                  Tiêu đề bức thư *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Gửi sinh nhật tuổi 25 của em..."
                  value={futureTitle}
                  onChange={(e) => setFutureTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-pink-50/50 dark:bg-zinc-800/60 border border-pink-200 dark:border-zinc-700 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-300 mb-1">
                  Ngày mở niêm phong (Khóa cho đến ngày này) *
                </label>
                <input
                  type="date"
                  required
                  value={unlockDate}
                  onChange={(e) => setUnlockDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-pink-50/50 dark:bg-zinc-800/60 border border-pink-200 dark:border-zinc-700 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-300 mb-1">
                  Nội dung gửi gắm *
                </label>
                <textarea
                  rows={5}
                  required
                  placeholder="Chào bạn ở tương lai..."
                  value={futureContent}
                  onChange={(e) => setFutureContent(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-pink-50/50 dark:bg-zinc-800/60 border border-pink-200 dark:border-zinc-700 text-xs font-handwriting text-2xl"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddFutureModalOpen(false)}
                  className="px-4 py-1.5 rounded-full text-xs text-zinc-600"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-rose-500 text-white text-xs font-bold shadow-sm"
                >
                  Niêm phong thư
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

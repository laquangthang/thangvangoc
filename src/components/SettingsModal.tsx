import React, { useState } from 'react';
import { CoupleProfile, LoveStoryData } from '../types';
import { soundFx } from '../utils/soundEffects';
import {
  Settings,
  X,
  Lock,
  Download,
  Upload,
  RotateCcw,
  Heart,
  Save,
} from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  fullData: LoveStoryData;
  onUpdateSettings: (newProfile: CoupleProfile, newPasscode: string, newSecretMessage: string) => void;
  onRestoreData: (data: LoveStoryData) => void;
  onResetData: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  fullData,
  onUpdateSettings,
  onRestoreData,
  onResetData,
}) => {
  const [partner1Name, setPartner1Name] = useState(fullData.profile.partner1.name);
  const [partner2Name, setPartner2Name] = useState(fullData.profile.partner2.name);
  const [relationshipStart, setRelationshipStart] = useState(fullData.profile.relationshipStart);
  const [couplePhoto, setCouplePhoto] = useState(fullData.profile.couplePhoto);
  const [passcode, setPasscode] = useState(fullData.passcode || '');
  const [secretMessage, setSecretMessage] = useState(fullData.secretMessage);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedProfile: CoupleProfile = {
      ...fullData.profile,
      relationshipStart,
      couplePhoto,
      partner1: {
        ...fullData.profile.partner1,
        name: partner1Name,
      },
      partner2: {
        ...fullData.profile.partner2,
        name: partner2Name,
      },
    };

    onUpdateSettings(updatedProfile, passcode, secretMessage);
    soundFx.playCelebration();
    onClose();
  };

  const handleExportData = () => {
    const dataStr = JSON.stringify(fullData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `our-love-story-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    soundFx.playHeartChime();
  };

  const handleImportData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.profile && parsed.memories) {
          onRestoreData(parsed);
          soundFx.playCelebration();
          alert('Khôi phục dữ liệu nhật ký thành công! 💕');
          onClose();
        } else {
          alert('Tệp dữ liệu không hợp lệ!');
        }
      } catch (err) {
        alert('Lỗi khi đọc file backup JSON!');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-lg bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 border-2 border-pink-200 dark:border-zinc-800 shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Scrap tape */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 tape-effect border-dashed border-t border-b border-pink-300 z-10" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-pink-50 text-zinc-500"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-pink-600 text-xs font-bold mb-2">
            <Settings className="w-3.5 h-3.5" />
            <span>Tùy chỉnh & Bảo mật</span>
          </div>
          <h3 className="font-romantic text-3xl sm:text-4xl text-rose-600 dark:text-rose-400 font-bold">
            Cài đặt cuốn sổ tình yêu
          </h3>
        </div>

        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
                Tên Bạn (Partner 1)
              </label>
              <input
                type="text"
                value={partner1Name}
                onChange={(e) => setPartner1Name(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-pink-50/50 border border-pink-200 dark:bg-zinc-800 dark:border-zinc-700 font-medium"
              />
            </div>
            <div>
              <label className="font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
                Tên Người Ấy (Partner 2)
              </label>
              <input
                type="text"
                value={partner2Name}
                onChange={(e) => setPartner2Name(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-pink-50/50 border border-pink-200 dark:bg-zinc-800 dark:border-zinc-700 font-medium"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
              Ngày chính thức yêu nhau (Relationship Start Date)
            </label>
            <input
              type="datetime-local"
              value={relationshipStart.slice(0, 16)}
              onChange={(e) => setRelationshipStart(new Date(e.target.value).toISOString())}
              className="w-full p-2.5 rounded-xl bg-pink-50/50 border border-pink-200 dark:bg-zinc-800 dark:border-zinc-700 font-medium"
            />
          </div>

          <div>
            <label className="font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
              Link ảnh bìa của hai đứa
            </label>
            <input
              type="text"
              value={couplePhoto}
              onChange={(e) => setCouplePhoto(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-pink-50/50 border border-pink-200 dark:bg-zinc-800 dark:border-zinc-700"
            />
          </div>

          <div>
            <label className="font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
              Mã PIN bảo vệ riêng tư (Để trống nếu không khóa)
            </label>
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-zinc-400" />
              <input
                type="password"
                maxLength={6}
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Ví dụ: 0520 hoặc 1314"
                className="flex-1 p-2.5 rounded-xl bg-pink-50/50 border border-pink-200 dark:bg-zinc-800 dark:border-zinc-700 font-mono tracking-widest"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
              Lời nhắn bí mật (Ẩn sau chú gấu bông bông 🧸)
            </label>
            <textarea
              rows={2}
              value={secretMessage}
              onChange={(e) => setSecretMessage(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-pink-50/50 border border-pink-200 dark:bg-zinc-800 dark:border-zinc-700 font-handwriting text-xl"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-full text-zinc-500"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-full bg-rose-500 text-white font-bold flex items-center gap-1.5 shadow-sm"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Lưu cài đặt</span>
            </button>
          </div>
        </form>

        {/* Data Backup & Restore */}
        <div className="mt-8 pt-6 border-t border-pink-100 dark:border-zinc-800 text-xs">
          <div className="font-bold text-zinc-800 dark:text-zinc-200 mb-3">
            Sao lưu & Khôi phục dữ liệu tình yêu:
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <button
              onClick={handleExportData}
              className="flex items-center justify-center gap-1.5 p-2.5 rounded-2xl bg-pink-50 dark:bg-zinc-800 text-pink-700 dark:text-pink-300 font-semibold border border-pink-200 dark:border-zinc-700 hover:bg-pink-100"
            >
              <Download className="w-4 h-4" />
              <span>Tải file Backup (JSON)</span>
            </button>

            <label className="flex items-center justify-center gap-1.5 p-2.5 rounded-2xl bg-pink-50 dark:bg-zinc-800 text-pink-700 dark:text-pink-300 font-semibold border border-pink-200 dark:border-zinc-700 hover:bg-pink-100 cursor-pointer">
              <Upload className="w-4 h-4" />
              <span>Nạp file dữ liệu</span>
              <input
                type="file"
                accept=".json"
                onChange={handleImportData}
                className="hidden"
              />
            </label>
          </div>

          <button
            onClick={() => {
              if (window.confirm('Bạn có chắc muốn đặt lại dữ liệu mặc định ban đầu không?')) {
                onResetData();
                onClose();
              }
            }}
            className="w-full flex items-center justify-center gap-1.5 p-2 rounded-xl text-zinc-400 hover:text-rose-500 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Khôi phục dữ liệu mẫu ban đầu</span>
          </button>
        </div>
      </div>
    </div>
  );
};

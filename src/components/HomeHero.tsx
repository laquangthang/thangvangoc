import React from 'react';
import {
  CoupleProfile,
  Memory,
  Recipe,
  Gift,
  LoveLetter,
  Song,
  BucketItem,
  LoveLocation,
  SpecialDay,
  DailyNote,
} from '../types';
import { RelationshipCounter } from './RelationshipCounter';
import { Sticker } from './Sticker';
import {
  Sparkles,
  Calendar,
  MapPin,
  UtensilsCrossed,
  Gift as GiftIcon,
  Mail,
  Music,
  CheckCircle2,
  Image as ImageIcon,
  HeartHandshake,
  ArrowRight,
  Clock,
  Quote,
} from 'lucide-react';

interface HomeHeroProps {
  profile: CoupleProfile;
  memories: Memory[];
  locations: LoveLocation[];
  recipes: Recipe[];
  gifts: Gift[];
  letters: LoveLetter[];
  songs: Song[];
  bucketList: BucketItem[];
  specialDays: SpecialDay[];
  dailyNotes: DailyNote[];
  onNavigate: (section: string) => void;
  onOpenSurprise: () => void;
  onOpenProfiles: () => void;
}

export const HomeHero: React.FC<HomeHeroProps> = ({
  profile,
  memories,
  locations,
  recipes,
  gifts,
  letters,
  songs,
  bucketList,
  specialDays,
  dailyNotes,
  onNavigate,
  onOpenSurprise,
  onOpenProfiles,
}) => {
  // Relationship days count
  const startDate = new Date(profile.relationshipStart);
  const now = new Date();
  const diffDays = Math.max(0, Math.floor((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)));
  const completedDreams = bucketList.filter((b) => b.completed).length;

  // Format date helper: "08 • 11 • 2023"
  const formattedStartDate = `${String(startDate.getDate()).padStart(2, '0')} • ${String(
    startDate.getMonth() + 1
  ).padStart(2, '0')} • ${startDate.getFullYear()}`;

  // Find next special day
  const nextSpecialDay = (() => {
    if (!specialDays.length) return null;
    const currentYear = now.getFullYear();
    const sorted = [...specialDays]
      .map((item) => {
        const itemDate = new Date(item.date);
        let targetThisYear = new Date(currentYear, itemDate.getMonth(), itemDate.getDate());
        if (targetThisYear.getTime() < now.getTime() - 24 * 60 * 60 * 1000) {
          targetThisYear = new Date(currentYear + 1, itemDate.getMonth(), itemDate.getDate());
        }
        const daysLeft = Math.ceil((targetThisYear.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        return { ...item, daysLeft, targetDate: targetThisYear };
      })
      .sort((a, b) => a.daysLeft - b.daysLeft);
    return sorted[0];
  })();

  // Today in our story (memories on same month/day or closest milestone)
  const todayMonth = now.getMonth();
  const todayDate = now.getDate();
  const thisDayMemory = memories.find((m) => {
    const d = new Date(m.date);
    return d.getMonth() === todayMonth && d.getDate() === todayDate;
  }) || memories[0];

  // Latest daily note
  const todayNote = dailyNotes[dailyNotes.length - 1] || {
    note: 'Yêu thương không phải là nhìn nhau, mà là cùng nhìn về một hướng.',
    author: 'Hai đứa mình 💕',
  };

  return (
    <section className="relative pt-6 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Decorative Floating Stickers */}
      <div className="absolute top-10 left-4 sm:left-12 opacity-80 pointer-events-none hidden sm:block animate-float-slow">
        <Sticker type="bow" size="lg" rotate={-10} />
      </div>
      <div className="absolute top-28 right-4 sm:right-16 opacity-80 pointer-events-none hidden sm:block animate-float-slow" style={{ animationDelay: '1.5s' }}>
        <Sticker type="flower" size="lg" rotate={12} />
      </div>
      <div className="absolute bottom-20 left-10 opacity-70 pointer-events-none hidden md:block animate-float-slow" style={{ animationDelay: '2s' }}>
        <Sticker type="coffee" size="md" rotate={-8} />
      </div>

      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100/90 dark:bg-pink-950/60 text-pink-600 dark:text-pink-300 text-xs sm:text-sm font-semibold mb-4 border border-pink-200 dark:border-pink-800 shadow-xs">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Together since {formattedStartDate}</span>
          <Sticker type="sparkle" size="sm" />
        </div>

        <h1 className="font-romantic text-5xl sm:text-7xl lg:text-8xl text-rose-600 dark:text-rose-400 font-bold tracking-tight mb-3 drop-shadow-xs">
          Our Little Love Story
        </h1>

        <p className="font-handwriting text-2xl sm:text-3xl text-pink-700/80 dark:text-pink-200/90 italic max-w-xl mx-auto">
          "A little corner of the internet that belongs to us."
        </p>
      </div>

      {/* Hero Main Card: Couple Polaroid & Quote */}
      <div className="relative max-w-4xl mx-auto mb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-white/70 dark:bg-rose-950/30 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-pink-200/70 dark:border-pink-900/40 shadow-xl shadow-pink-100/50 dark:shadow-black/20">
          
          {/* Couple Polaroid Photo */}
          <div className="md:col-span-5 flex justify-center">
            <div className="relative group cursor-pointer" onClick={onOpenProfiles}>
              {/* Tape sticker */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 tape-effect border-dashed border-t border-b border-pink-300 -rotate-2 z-20" />
              
              <div className="polaroid-card bg-white dark:bg-zinc-900 p-3 pb-5 rounded-2xl border border-pink-100 dark:border-zinc-800 max-w-[280px] sm:max-w-[310px] transform -rotate-1 transition-all group-hover:rotate-0">
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-pink-100">
                  <img
                    src={profile.couplePhoto}
                    alt={`${profile.partner1.name} & ${profile.partner2.name}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                    <span className="text-white text-xs font-medium flex items-center gap-1">
                      <HeartHandshake className="w-3.5 h-3.5" /> Xem hồ sơ hai đứa
                    </span>
                  </div>
                </div>

                <div className="mt-3 text-center">
                  <div className="font-handwriting text-2xl font-bold text-rose-600 dark:text-rose-400">
                    {profile.partner1.name} & {profile.partner2.name}
                  </div>
                  <div className="text-xs text-pink-400 dark:text-pink-500 font-medium">
                    {profile.partner1.nickname} 💕 {profile.partner2.nickname}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Romantic Quote & Quick Action */}
          <div className="md:col-span-7 flex flex-col justify-center space-y-5 text-left">
            <div className="relative pl-6 border-l-2 border-rose-300 dark:border-rose-700">
              <Quote className="absolute -top-3 -left-3 w-6 h-6 text-rose-300 dark:text-rose-600 fill-rose-100" />
              <p className="font-handwriting text-2xl sm:text-3xl text-pink-900 dark:text-pink-100 leading-relaxed">
                "{profile.romanticQuote}"
              </p>
              <span className="block mt-2 text-sm text-pink-500 dark:text-pink-400 font-medium">
                — Viết riêng cho chúng mình
              </span>
            </div>

            {/* Next Special Day banner */}
            {nextSpecialDay && (
              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-950/50 dark:to-rose-950/40 border border-pink-200/80 dark:border-pink-800/40">
                <div className="w-10 h-10 rounded-xl bg-rose-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Calendar className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold uppercase tracking-wider text-rose-500 dark:text-rose-400">
                    Dịp đặc biệt tiếp theo
                  </div>
                  <div className="font-medium text-pink-900 dark:text-pink-100 text-sm truncate">
                    {nextSpecialDay.title}
                  </div>
                </div>
                <div className="px-3 py-1 rounded-full bg-rose-500 text-white text-xs font-bold shrink-0">
                  Còn {nextSpecialDay.daysLeft} ngày
                </div>
              </div>
            )}

            {/* Things We Love chip tags */}
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-pink-400 dark:text-pink-500 mb-2">
                Những điều chúng mình cùng mê:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {profile.thingsWeLove.slice(0, 5).map((item, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-pink-100/70 dark:bg-pink-900/30 text-pink-800 dark:text-pink-200 border border-pink-200/50 dark:border-pink-800/30"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOpenSurprise}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-medium text-sm shadow-md shadow-pink-300/40 dark:shadow-none hover:scale-103 transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-yellow-300" />
                <span>Mở kỷ niệm bất ngờ (Surprise Me)</span>
              </button>
              <button
                onClick={() => onNavigate('timeline')}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white dark:bg-zinc-800 hover:bg-pink-50 dark:hover:bg-zinc-700 text-pink-700 dark:text-pink-200 font-medium text-sm border border-pink-200 dark:border-zinc-700 transition-colors"
              >
                <span>Dòng thời gian</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Live Relationship Counter Component */}
      <div className="mb-14">
        <RelationshipCounter
          startDate={profile.relationshipStart}
          partner1Name={profile.partner1.nickname}
          partner2Name={profile.partner2.nickname}
        />
      </div>

      {/* Love Stats Grid */}
      <div className="mb-14">
        <div className="text-center mb-6">
          <h2 className="font-romantic text-3xl sm:text-4xl text-rose-600 dark:text-rose-400 font-bold">
            Con số tình yêu của hai đứa (Love Stats)
          </h2>
          <p className="text-xs sm:text-sm text-pink-500 dark:text-pink-400">
            Từng con số là một mảnh ghép dịu dàng trong bức tranh tình yêu
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
          {[
            { label: 'Ngày yêu', count: diffDays, icon: Clock, color: 'text-rose-500', section: 'home' },
            { label: 'Kỷ niệm', count: memories.length, icon: ImageIcon, color: 'text-pink-500', section: 'memories' },
            { label: 'Địa điểm', count: locations.length, icon: MapPin, color: 'text-amber-500', section: 'love-map' },
            { label: 'Món đã nấu', count: recipes.length, icon: UtensilsCrossed, color: 'text-orange-500', section: 'kitchen' },
            { label: 'Món quà', count: gifts.length, icon: GiftIcon, color: 'text-purple-500', section: 'gifts' },
            { label: 'Lá thư tình', count: letters.length, icon: Mail, color: 'text-indigo-500', section: 'letters' },
            { label: 'Bài hát chung', count: songs.length, icon: Music, color: 'text-sky-500', section: 'soundtrack' },
            { label: 'Ước mơ xong', count: completedDreams, icon: CheckCircle2, color: 'text-emerald-500', section: 'bucket-list' },
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                onClick={() => onNavigate(stat.section)}
                className="cursor-pointer group flex flex-col items-center justify-center p-4 rounded-2xl bg-white/80 dark:bg-rose-950/30 backdrop-blur-xs border border-pink-100 dark:border-pink-900/40 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all"
              >
                <div className={`p-2 rounded-xl bg-pink-50 dark:bg-pink-900/30 ${stat.color} mb-2 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="font-bold text-xl sm:text-2xl text-pink-950 dark:text-pink-100 tabular-nums">
                  {stat.count}
                </div>
                <div className="text-xs font-medium text-pink-500/80 dark:text-pink-400/80 text-center mt-0.5">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Row of Two Romantic Widgets: "This Day in Our Story" & "Daily Love Note" */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* This Day in Our Story */}
        <div className="relative rounded-3xl bg-gradient-to-br from-pink-50/90 to-rose-100/70 dark:from-pink-950/40 dark:to-rose-950/30 p-6 border border-pink-200/80 dark:border-pink-800/40 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-rose-500 text-white">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-pink-900 dark:text-pink-100 text-sm">
                  This Day in Our Story 📅
                </h3>
                <p className="text-xs text-pink-500 dark:text-pink-400">
                  Kỷ niệm đáng nhớ ngày này
                </p>
              </div>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/80 dark:bg-zinc-800 text-rose-600 dark:text-rose-300">
              {thisDayMemory.date}
            </span>
          </div>

          {thisDayMemory && (
            <div
              onClick={() => onNavigate('memories')}
              className="group cursor-pointer flex gap-4 bg-white/80 dark:bg-zinc-900/60 p-3 rounded-2xl border border-pink-100 dark:border-pink-900/30 hover:bg-white transition-colors"
            >
              {thisDayMemory.photos[0] && (
                <img
                  src={thisDayMemory.photos[0]}
                  alt={thisDayMemory.title}
                  referrerPolicy="no-referrer"
                  className="w-20 h-20 rounded-xl object-cover shrink-0 group-hover:scale-105 transition-transform"
                />
              )}
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-pink-950 dark:text-pink-100 text-sm truncate group-hover:text-rose-600">
                  {thisDayMemory.title}
                </h4>
                <p className="text-xs text-pink-600/80 dark:text-pink-400 line-clamp-2 mt-1">
                  {thisDayMemory.description}
                </p>
                <div className="flex items-center gap-2 mt-2 text-xs text-rose-500 font-medium">
                  <MapPin className="w-3 h-3" />
                  <span>{thisDayMemory.location}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Daily Love Note */}
        <div className="relative rounded-3xl bg-gradient-to-br from-amber-50/80 to-pink-50/80 dark:from-amber-950/20 dark:to-pink-950/30 p-6 border border-amber-200/60 dark:border-amber-900/40 shadow-md flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-xl">💌</span>
              <div>
                <h3 className="font-bold text-pink-900 dark:text-pink-100 text-sm">
                  Daily Love Note
                </h3>
                <p className="text-xs text-amber-600/80 dark:text-amber-400">
                  Lời nhắn gửi ngọt ngào hôm nay
                </p>
              </div>
            </div>
            <Sticker type="heart" size="sm" />
          </div>

          <div className="bg-white/80 dark:bg-zinc-900/60 p-4 rounded-2xl border border-dashed border-pink-200 dark:border-pink-900/50 my-auto">
            <p className="font-handwriting text-xl sm:text-2xl text-pink-950 dark:text-pink-100 leading-relaxed">
              "{todayNote.note}"
            </p>
            <div className="text-right mt-2 text-xs font-medium text-rose-500 dark:text-rose-400">
              — {todayNote.author}
            </div>
          </div>

          <div className="flex justify-end mt-2">
            <button
              onClick={() => onNavigate('letters')}
              className="text-xs font-semibold text-rose-600 hover:text-rose-700 dark:text-rose-400 flex items-center gap-1 cursor-pointer"
            >
              <span>Xem tất cả thư tình</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

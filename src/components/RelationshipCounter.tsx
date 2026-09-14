import React, { useState, useEffect } from 'react';
import { Heart, Clock, Calendar, Sparkles } from 'lucide-react';

interface RelationshipCounterProps {
  startDate: string; // ISO string
  partner1Name: string;
  partner2Name: string;
}

interface TimeBreakdown {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalDays: number;
  totalHours: number;
  totalMinutes: number;
  totalSeconds: number;
}

export const RelationshipCounter: React.FC<RelationshipCounterProps> = ({
  startDate,
  partner1Name,
  partner2Name,
}) => {
  const [breakdown, setBreakdown] = useState<TimeBreakdown>({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalDays: 0,
    totalHours: 0,
    totalMinutes: 0,
    totalSeconds: 0,
  });

  const [showTotals, setShowTotals] = useState(false);

  useEffect(() => {
    const calculateTime = () => {
      const start = new Date(startDate);
      const now = new Date();

      if (isNaN(start.getTime())) return;

      const diffMs = Math.max(0, now.getTime() - start.getTime());
      const totalSeconds = Math.floor(diffMs / 1000);
      const totalMinutes = Math.floor(totalSeconds / 60);
      const totalHours = Math.floor(totalMinutes / 60);
      const totalDays = Math.floor(totalHours / 24);

      // Calculate calendar years, months, days
      let years = now.getFullYear() - start.getFullYear();
      let months = now.getMonth() - start.getMonth();
      let days = now.getDate() - start.getDate();

      if (days < 0) {
        months -= 1;
        // days in previous month
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += prevMonth.getDate();
      }

      if (months < 0) {
        years -= 1;
        months += 12;
      }

      const hours = now.getHours() - start.getHours() + (now.getHours() < start.getHours() ? 24 : 0);
      const normalizedHours = (now.getHours() - start.getHours() + 24) % 24;
      const normalizedMinutes = (now.getMinutes() - start.getMinutes() + 60) % 60;
      const normalizedSeconds = (now.getSeconds() - start.getSeconds() + 60) % 60;

      setBreakdown({
        years: Math.max(0, years),
        months: Math.max(0, months),
        days: Math.max(0, days),
        hours: normalizedHours,
        minutes: normalizedMinutes,
        seconds: normalizedSeconds,
        totalDays,
        totalHours,
        totalMinutes,
        totalSeconds,
      });
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [startDate]);

  const units = [
    { label: 'Năm', value: breakdown.years },
    { label: 'Tháng', value: breakdown.months },
    { label: 'Ngày', value: breakdown.days },
    { label: 'Giờ', value: breakdown.hours },
    { label: 'Phút', value: breakdown.minutes },
    { label: 'Giây', value: breakdown.seconds },
  ];

  return (
    <div className="relative w-full max-w-3xl mx-auto rounded-3xl bg-white/80 dark:bg-rose-950/40 backdrop-blur-md p-6 sm:p-8 border border-pink-200/80 dark:border-pink-800/40 shadow-xl shadow-pink-200/30 dark:shadow-rose-950/30">
      {/* Decorative scrap tape top */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 tape-effect border-dashed border-t border-b border-pink-300/60 -rotate-1 rounded-sm z-10" />

      {/* Header with beating heart */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-50 dark:bg-pink-900/40 text-pink-600 dark:text-pink-300 text-sm font-medium border border-pink-200/60 dark:border-pink-700/40 mb-3">
          <Heart className="w-4 h-4 fill-rose-500 text-rose-500 animate-ping" />
          <span>Chúng mình đã bên nhau được</span>
          <Heart className="w-4 h-4 fill-rose-500 text-rose-500 animate-pulse" />
        </div>
        <h3 className="font-handwriting text-3xl sm:text-4xl text-rose-600 dark:text-rose-400 font-bold tracking-wide">
          {partner1Name} & {partner2Name}
        </h3>
      </div>

      {/* Main Counter Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3 mb-6">
        {units.map((unit, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-gradient-to-b from-pink-50/90 to-rose-50/70 dark:from-pink-900/30 dark:to-rose-950/40 border border-pink-100 dark:border-pink-800/30 shadow-sm hover:scale-103 transition-transform"
          >
            <span className="font-sans font-bold text-2xl sm:text-3xl lg:text-4xl text-rose-600 dark:text-rose-300 tabular-nums">
              {String(unit.value).padStart(2, '0')}
            </span>
            <span className="text-xs sm:text-sm font-medium text-pink-500/80 dark:text-pink-300/80 mt-1">
              {unit.label}
            </span>
          </div>
        ))}
      </div>

      {/* Toggle between Breakdown & Total Stats */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-pink-100 dark:border-pink-900/40 text-sm text-pink-700 dark:text-pink-300">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-rose-400" />
          <span>
            Bắt đầu từ: <strong className="font-semibold text-rose-600 dark:text-rose-300">{new Date(startDate).toLocaleDateString('vi-VN')}</strong>
          </span>
        </div>

        <button
          onClick={() => setShowTotals(!showTotals)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-pink-100/80 hover:bg-pink-200/80 dark:bg-pink-900/40 dark:hover:bg-pink-900/70 text-xs font-semibold text-rose-600 dark:text-rose-300 transition-colors"
        >
          <Clock className="w-3.5 h-3.5" />
          <span>{showTotals ? 'Thu gọn thống kê' : 'Xem tổng số ngày/giờ'}</span>
          <Sparkles className="w-3 h-3 text-amber-400" />
        </button>
      </div>

      {/* Expanded Totals */}
      {showTotals && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-4 p-4 rounded-2xl bg-pink-50/60 dark:bg-pink-950/50 border border-pink-200/50 dark:border-pink-800/30 text-center animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="p-2">
            <div className="text-lg font-bold text-rose-600 dark:text-rose-300 tabular-nums">
              {breakdown.totalDays.toLocaleString()}
            </div>
            <div className="text-xs text-pink-500 dark:text-pink-400">Tổng số ngày</div>
          </div>
          <div className="p-2">
            <div className="text-lg font-bold text-rose-600 dark:text-rose-300 tabular-nums">
              {breakdown.totalHours.toLocaleString()}
            </div>
            <div className="text-xs text-pink-500 dark:text-pink-400">Tổng số giờ</div>
          </div>
          <div className="p-2">
            <div className="text-lg font-bold text-rose-600 dark:text-rose-300 tabular-nums">
              {breakdown.totalMinutes.toLocaleString()}
            </div>
            <div className="text-xs text-pink-500 dark:text-pink-400">Tổng số phút</div>
          </div>
          <div className="p-2">
            <div className="text-lg font-bold text-rose-600 dark:text-rose-300 tabular-nums">
              {breakdown.totalSeconds.toLocaleString()}
            </div>
            <div className="text-xs text-pink-500 dark:text-pink-400">Tổng số giây</div>
          </div>
        </div>
      )}
    </div>
  );
};

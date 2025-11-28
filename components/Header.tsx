'use client';

import { useUserStore } from '@/stores/userStore';
import { Flame, Zap, Coins, Trophy } from 'lucide-react';

export default function Header() {
  const { xp, streak, coins, energy } = useUserStore();

  return (
    <header className="flex w-full border-b-2 border-[var(--border)] bg-[var(--card-bg)] shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 w-full">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img src="/logo.svg" alt="MOVE" className="h-8" />
        </div>

        {/* Stats */}
        <div className="flex items-center gap-3 sm:gap-6">
          {/* XP */}
          <div className="flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/30 px-3 py-1.5 shadow-sm transition-transform hover:scale-105">
            <Trophy className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            <span className="text-sm font-bold text-amber-700 dark:text-amber-300">
              {xp.toLocaleString()}
            </span>
          </div>

          {/* Streak */}
          <div className="flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/30 dark:to-red-950/30 px-3 py-1.5 shadow-sm transition-transform hover:scale-105">
            <Flame className="h-4 w-4 text-orange-500" />
            <span className="text-sm font-bold text-orange-600 dark:text-orange-400">
              {streak}
            </span>
          </div>

          {/* Coins */}
          <div className="flex items-center gap-2 rounded-full bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-950/30 dark:to-amber-950/30 px-3 py-1.5 shadow-sm transition-transform hover:scale-105">
            <Coins className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
            <span className="text-sm font-bold text-yellow-700 dark:text-yellow-300">
              {coins}
            </span>
          </div>

          {/* Hearts/Energy */}
          <div className="flex items-center gap-2 rounded-full bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-950/30 dark:to-pink-950/30 px-3 py-1.5 shadow-sm transition-transform hover:scale-105">
            <Zap className="h-4 w-4 fill-red-500 text-red-500" />
            <span className="text-sm font-bold text-red-600 dark:text-red-400">
              {energy}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

'use client';

import { useUserStore } from '@/stores/userStore';
import { Crown, Medal, Trophy } from 'lucide-react';
import Image from 'next/image';

interface RankingUser {
  id: number;
  name: string;
  avatar: string;
  xp: number;
  rank: number;
}

const topUsers: RankingUser[] = [
  {
    id: 1,
    name: 'María González',
    avatar: 'https://picsum.photos/seed/user1/200/200',
    xp: 3450,
    rank: 1,
  },
  {
    id: 2,
    name: 'Carlos Rodríguez',
    avatar: 'https://picsum.photos/seed/user2/200/200',
    xp: 2890,
    rank: 2,
  },
  {
    id: 3,
    name: 'Ana Martínez',
    avatar: 'https://picsum.photos/seed/user3/200/200',
    xp: 2650,
    rank: 3,
  },
  {
    id: 4,
    name: 'Luis Fernández',
    avatar: 'https://picsum.photos/seed/user4/200/200',
    xp: 2340,
    rank: 4,
  },
  {
    id: 5,
    name: 'Sofia López',
    avatar: 'https://picsum.photos/seed/user5/200/200',
    xp: 2120,
    rank: 5,
  },
];

export default function Ranking() {
  const { name, avatar, xp } = useUserStore();
  
  // Simular el puesto del usuario (en este caso, puesto 12)
  const userRank = 12;

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 fill-yellow-400 text-yellow-400" />;
      case 2:
        return <Medal className="h-6 w-6 fill-gray-400 text-gray-400" />;
      case 3:
        return <Medal className="h-6 w-6 fill-amber-600 text-amber-600" />;
      default:
        return null;
    }
  };

  const getRankBadge = (rank: number) => {
    if (rank === 1) {
      return 'bg-gradient-to-br from-yellow-400 to-amber-500 text-white shadow-lg';
    } else if (rank === 2) {
      return 'bg-gradient-to-br from-gray-300 to-gray-400 text-white shadow-md';
    } else if (rank === 3) {
      return 'bg-gradient-to-br from-amber-600 to-amber-700 text-white shadow-md';
    }
    return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
  };

  return (
    <div className="flex h-full flex-col overflow-y-auto px-4 py-8">
      <div className="mx-auto w-full max-w-3xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <Trophy className="h-16 w-16 text-[#58cc02]" />
          </div>
          <h2 className="text-3xl font-black text-[var(--foreground)]">
            Tabla de Clasificación
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Compite con otros estudiantes de física
          </p>
        </div>

        {/* Top 3 Podium */}
        <div className="mb-8 flex items-end justify-center gap-4">
          {/* 2nd Place */}
          <div className="flex flex-col items-center">
            <div className="relative mb-2">
              <div className="h-20 w-20 overflow-hidden rounded-full border-4 border-gray-300 shadow-lg">
                <Image
                  src={topUsers[1].avatar}
                  alt={topUsers[1].name}
                  width={80}
                  height={80}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-2 -right-2">
                <Medal className="h-8 w-8 fill-gray-400 text-gray-400" />
              </div>
            </div>
            <div className="rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 px-4 py-6 dark:from-gray-800 dark:to-gray-900">
              <p className="text-center text-sm font-bold">{topUsers[1].name}</p>
              <p className="text-center text-xs text-gray-600 dark:text-gray-400">
                {topUsers[1].xp.toLocaleString()} XP
              </p>
            </div>
          </div>

          {/* 1st Place */}
          <div className="flex flex-col items-center">
            <div className="relative mb-2">
              <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-yellow-400 shadow-xl">
                <Image
                  src={topUsers[0].avatar}
                  alt={topUsers[0].name}
                  width={96}
                  height={96}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-2 -right-2">
                <Crown className="h-10 w-10 fill-yellow-400 text-yellow-400" />
              </div>
            </div>
            <div className="rounded-xl bg-gradient-to-br from-yellow-400 to-amber-500 px-4 py-8 shadow-lg">
              <p className="text-center text-sm font-bold text-white">{topUsers[0].name}</p>
              <p className="text-center text-xs text-yellow-100">
                {topUsers[0].xp.toLocaleString()} XP
              </p>
            </div>
          </div>

          {/* 3rd Place */}
          <div className="flex flex-col items-center">
            <div className="relative mb-2">
              <div className="h-20 w-20 overflow-hidden rounded-full border-4 border-amber-600 shadow-lg">
                <Image
                  src={topUsers[2].avatar}
                  alt={topUsers[2].name}
                  width={80}
                  height={80}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-2 -right-2">
                <Medal className="h-8 w-8 fill-amber-600 text-amber-600" />
              </div>
            </div>
            <div className="rounded-xl bg-gradient-to-br from-amber-100 to-amber-200 px-4 py-6 dark:from-amber-900 dark:to-amber-950">
              <p className="text-center text-sm font-bold">{topUsers[2].name}</p>
              <p className="text-center text-xs text-gray-600 dark:text-gray-400">
                {topUsers[2].xp.toLocaleString()} XP
              </p>
            </div>
          </div>
        </div>

        {/* Rest of Top 5 */}
        <div className="mb-6 space-y-3">
          {topUsers.slice(3).map((user, index) => (
            <div
              key={user.id}
              className="flex items-center gap-4 rounded-2xl border-2 border-[var(--border)] bg-[var(--card-bg)] p-4 shadow-sm transition-all hover:shadow-md"
            >
              <div className={`flex h-10 w-10 items-center justify-center rounded-full font-bold ${getRankBadge(user.rank)}`}>
                {user.rank}
              </div>
              <div className="h-12 w-12 overflow-hidden rounded-full border-2 border-gray-200 dark:border-gray-700">
                <Image
                  src={user.avatar}
                  alt={user.name}
                  width={48}
                  height={48}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="font-bold text-[var(--foreground)]">{user.name}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {user.xp.toLocaleString()} XP
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* User's Position */}
        <div className="rounded-2xl border-4 border-[#58cc02] bg-gradient-to-br from-green-50 to-emerald-50 p-4 shadow-lg dark:from-green-950/30 dark:to-emerald-950/30">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#58cc02] font-bold text-white">
              {userRank}
            </div>
            <div className="h-12 w-12 overflow-hidden rounded-full border-2 border-[#58cc02]">
              <Image
                src={avatar}
                alt={name}
                width={48}
                height={48}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex-1">
              <p className="font-bold text-[var(--foreground)]">{name} (Tú)</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {xp.toLocaleString()} XP
              </p>
            </div>
            <div className="rounded-full bg-[#58cc02] px-4 py-2 text-sm font-bold text-white">
              Tu posición
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

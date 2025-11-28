'use client';

import { useUserStore } from '@/stores/userStore';
import { Trophy, Flame, Coins, Zap, Calendar, Award, Target } from 'lucide-react';
import Image from 'next/image';

export default function Profile() {
  const { name, avatar, xp, streak, coins, energy } = useUserStore();

  const stats = [
    {
      icon: Trophy,
      label: 'Experiencia Total',
      value: xp.toLocaleString(),
      color: 'from-amber-400 to-yellow-500',
      textColor: 'text-amber-600 dark:text-amber-400',
    },
    {
      icon: Flame,
      label: 'Racha Actual',
      value: `${streak} días`,
      color: 'from-orange-400 to-red-500',
      textColor: 'text-orange-600 dark:text-orange-400',
    },
    {
      icon: Coins,
      label: 'Monedas',
      value: coins.toLocaleString(),
      color: 'from-yellow-400 to-amber-500',
      textColor: 'text-yellow-600 dark:text-yellow-400',
    },
    {
      icon: Zap,
      label: 'Energía',
      value: energy,
      color: 'from-red-400 to-pink-500',
      textColor: 'text-red-600 dark:text-red-400',
    },
  ];

  const achievements = [
    { id: 1, title: 'Primera Lección', description: 'Completaste tu primera lección', earned: true },
    { id: 2, title: 'Racha de 5 días', description: 'Mantén una racha de 5 días', earned: true },
    { id: 3, title: 'Maestro de Cinemática', description: 'Completa todas las lecciones de cinemática', earned: true },
    { id: 4, title: 'Racha de 10 días', description: 'Mantén una racha de 10 días', earned: false },
    { id: 5, title: '1000 XP', description: 'Alcanza 1000 puntos de experiencia', earned: true },
    { id: 6, title: 'Top 10', description: 'Entra en el top 10 del ranking', earned: false },
  ];

  return (
    <div className="flex h-full flex-col overflow-y-auto px-4 py-8">
      <div className="mx-auto w-full max-w-4xl">
        {/* Profile Header */}
        <div className="mb-8 rounded-3xl bg-gradient-to-br from-[#58cc02] to-[#46a302] p-8 shadow-xl">
          <div className="flex flex-col items-center gap-6 sm:flex-row">
            <div className="relative">
              <div className="h-32 w-32 overflow-hidden rounded-full border-4 border-white shadow-2xl">
                <Image
                  src={avatar}
                  alt={name}
                  width={128}
                  height={128}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 rounded-full bg-white p-2 shadow-lg">
                <Award className="h-8 w-8 fill-[#58cc02] text-[#58cc02]" />
              </div>
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-3xl font-black text-white">{name}</h2>
              <p className="mt-2 text-lg text-green-100">Estudiante de Física</p>
              <div className="mt-4 flex flex-wrap gap-2 justify-center sm:justify-start">
                <span className="rounded-full bg-white/20 px-4 py-1 text-sm font-bold text-white backdrop-blur-sm">
                  Nivel 12
                </span>
                <span className="rounded-full bg-white/20 px-4 py-1 text-sm font-bold text-white backdrop-blur-sm">
                  Miembro desde Nov 2025
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mb-8">
          <h3 className="mb-4 text-2xl font-black text-[var(--foreground)]">
            Estadísticas
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="group rounded-2xl border-2 border-[var(--border)] bg-[var(--card-bg)] p-6 shadow-sm transition-all hover:scale-105 hover:shadow-lg"
                >
                  <div className={`mb-3 inline-flex rounded-xl bg-gradient-to-br ${stat.color} p-3 shadow-md`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                  <p className={`mt-1 text-2xl font-black ${stat.textColor}`}>
                    {stat.value}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Progress */}
        <div className="mb-8 rounded-2xl border-2 border-[var(--border)] bg-[var(--card-bg)] p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <Target className="h-6 w-6 text-[#58cc02]" />
            <h3 className="text-xl font-black text-[var(--foreground)]">
              Progreso hacia Nivel 13
            </h3>
          </div>
          <div className="relative h-4 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
            <div
              className="h-full bg-gradient-to-r from-[#58cc02] to-[#46a302] shadow-md transition-all duration-500"
              style={{ width: '62%' }}
            />
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            1,240 / 2,000 XP
          </p>
        </div>

        {/* Achievements */}
        <div>
          <h3 className="mb-4 text-2xl font-black text-[var(--foreground)]">
            Logros
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`rounded-2xl border-2 p-4 transition-all ${
                  achievement.earned
                    ? 'border-[#58cc02] bg-gradient-to-br from-green-50 to-emerald-50 shadow-md dark:from-green-950/30 dark:to-emerald-950/30'
                    : 'border-[var(--border)] bg-[var(--card-bg)] opacity-60'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`rounded-lg p-2 ${
                      achievement.earned
                        ? 'bg-[#58cc02]'
                        : 'bg-gray-300 dark:bg-gray-700'
                    }`}
                  >
                    <Award
                      className={`h-6 w-6 ${
                        achievement.earned
                          ? 'fill-white text-white'
                          : 'text-gray-500'
                      }`}
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-[var(--foreground)]">
                      {achievement.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {achievement.description}
                    </p>
                  </div>
                  {achievement.earned && (
                    <div className="rounded-full bg-[#58cc02] px-3 py-1 text-xs font-bold text-white">
                      ✓
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

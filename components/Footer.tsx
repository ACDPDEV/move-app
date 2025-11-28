'use client';

import { BookOpen, Trophy, User, Settings } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', icon: BookOpen, label: 'Lecciones' },
    { href: '/ranking', icon: Trophy, label: 'Ranking' },
    { href: '/profile', icon: User, label: 'Perfil' },
    { href: '/settings', icon: Settings, label: 'Ajustes' },
  ];

  const isActive = (href: string) => {
    if (href === '/' && pathname === '/') return true;
    if (href !== '/' && pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <footer className="flex border-t-2 border-[var(--border)] bg-[var(--card-bg)] shadow-lg">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-around px-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex flex-col items-center gap-1 rounded-xl px-6 py-2 transition-all duration-200 ${
                active
                  ? 'scale-105'
                  : 'hover:scale-105 hover:bg-[var(--hover-bg)]'
              }`}
            >
              <div
                className={`rounded-lg p-2 transition-all duration-200 ${
                  active
                    ? 'bg-gradient-to-br from-[#58cc02] to-[#46a302] shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-800 group-hover:bg-gray-200 dark:group-hover:bg-gray-700'
                }`}
              >
                <Icon
                  className={`h-5 w-5 transition-colors ${
                    active
                      ? 'text-white'
                      : 'text-gray-600 dark:text-gray-400'
                  }`}
                />
              </div>
              <span
                className={`text-xs font-bold transition-colors ${
                  active
                    ? 'text-[#58cc02]'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </footer>
  );
}

'use client';

import { useState } from 'react';
import { useUserStore } from '@/stores/userStore';
import { useThemeStore } from '@/stores/themeStore';
import PremiumModal from './PremiumModal';
import EditProfileModal from './EditProfileModal';
import {
  Moon,
  Sun,
  User,
  Image as ImageIcon,
  Trash2,
  CreditCard,
  Bell,
  Globe,
  Shield,
  HelpCircle,
  LogOut,
  ChevronRight,
  LucideIcon,
} from 'lucide-react';

interface SettingsItem {
  icon: LucideIcon;
  label: string;
  description: string;
  action: () => void;
  highlight?: boolean;
  toggle?: boolean;
  danger?: boolean;
}

export default function Settings() {
  const { name } = useUserStore();
  const { theme, toggleTheme } = useThemeStore();
  const isDarkMode = theme === 'dark';
  
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);

  const settingsSections: { title: string; items: SettingsItem[] }[] = [
    {
      title: 'Cuenta',
      items: [
        {
          icon: User,
          label: 'Editar perfil',
          description: 'Actualiza tu información personal',
          action: () => setShowEditProfileModal(true),
        },
        {
          icon: ImageIcon,
          label: 'Cambiar foto de perfil',
          description: 'Actualiza tu imagen de perfil',
          action: () => alert('Función próximamente disponible'),
        },
        {
          icon: CreditCard,
          label: 'Cambiar de plan',
          description: 'Actualiza a MOVE Premium',
          action: () => setShowPremiumModal(true),
          highlight: true,
        },
      ],
    },
    {
      title: 'Preferencias',
      items: [
        {
          icon: isDarkMode ? Moon : Sun,
          label: 'Tema',
          description: isDarkMode ? 'Modo oscuro activado' : 'Modo claro activado',
          action: toggleTheme,
          toggle: true,
        },
        {
          icon: Bell,
          label: 'Notificaciones',
          description: 'Configura tus recordatorios',
          action: () => alert('Función próximamente disponible'),
        },
        {
          icon: Globe,
          label: 'Idioma',
          description: 'Español',
          action: () => alert('Función próximamente disponible'),
        },
      ],
    },
    {
      title: 'Soporte',
      items: [
        {
          icon: HelpCircle,
          label: 'Ayuda y soporte',
          description: 'Obtén ayuda con MOVE',
          action: () => alert('Función próximamente disponible'),
        },
        {
          icon: Shield,
          label: 'Privacidad y seguridad',
          description: 'Gestiona tus datos',
          action: () => alert('Función próximamente disponible'),
        },
      ],
    },
    {
      title: 'Zona de peligro',
      items: [
        {
          icon: Trash2,
          label: 'Borrar cuenta',
          description: 'Elimina permanentemente tu cuenta',
          action: () => {
            if (confirm('¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.')) {
              alert('Cuenta eliminada (simulado)');
            }
          },
          danger: true,
        },
        {
          icon: LogOut,
          label: 'Cerrar sesión',
          description: 'Sal de tu cuenta',
          action: () => {
            if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
              alert('Sesión cerrada (simulado)');
            }
          },
        },
      ],
    },
  ];

  return (
    <div className="flex h-full flex-col overflow-y-auto px-4 py-8">
      <div className="mx-auto w-full max-w-3xl">
        <h2 className="mb-8 text-3xl font-black text-[var(--foreground)]">
          Configuración
        </h2>

        <div className="space-y-8">
          {settingsSections.map((section) => (
            <div key={section.title}>
              <h3 className="mb-4 text-lg font-bold text-gray-600 dark:text-gray-400">
                {section.title}
              </h3>
              <div className="space-y-2">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.label}
                      onClick={item.action}
                      className={`group w-full rounded-2xl border-2 p-4 text-left transition-all hover:scale-[1.02] hover:shadow-lg ${
                        item.danger
                          ? 'border-red-200 bg-red-50 hover:border-red-300 dark:border-red-900 dark:bg-red-950/30'
                          : item.highlight
                          ? 'border-[#58cc02] bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-700 dark:to-blue-700'
                          : 'border-[var(--border)] bg-[var(--card-bg)] hover:bg-[var(--hover-bg)]'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`rounded-xl p-3 transition-colors ${
                            item.danger
                              ? 'bg-red-100 dark:bg-red-900/50'
                              : item.highlight
                              ? 'bg-[#58cc02]'
                              : 'bg-gray-100 dark:bg-gray-800'
                          }`}
                        >
                          <Icon
                            className={`h-6 w-6 ${
                              item.danger
                                ? 'text-red-600 dark:text-red-400'
                                : item.highlight
                                ? 'text-white'
                                : 'text-gray-600 dark:text-gray-400'
                            }`}
                          />
                        </div>
                        <div className="flex-1">
                          <p
                            className={`font-bold ${
                              item.danger
                                ? 'text-red-600 dark:text-red-400'
                                : 'text-[var(--foreground)]'
                            }`}
                          >
                            {item.label}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {item.description}
                          </p>
                        </div>
                        {item.toggle ? (
                          <div
                            className={`relative h-8 w-14 rounded-full transition-colors ${
                              isDarkMode ? 'bg-[#58cc02]' : 'bg-gray-300'
                            }`}
                          >
                            <div
                              className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow-md transition-transform ${
                                isDarkMode ? 'translate-x-7' : 'translate-x-1'
                              }`}
                            />
                          </div>
                        ) : (
                          <ChevronRight className="h-5 w-5 text-gray-400 transition-transform group-hover:translate-x-1" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* App Info */}
        <div className="mt-12 rounded-2xl border-2 border-[var(--border)] bg-[var(--card-bg)] p-6 text-center">
          <div className="mb-2 flex justify-center">
            <img src="/logo.svg" alt="MOVE" className="h-8" />
          </div>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Versión 1.0.0
          </p>
          <p className="mt-4 text-xs text-gray-500 dark:text-gray-500">
            © 2025 MOVE. Aprende física de manera divertida.
          </p>
        </div>
      </div>

      {/* Modales */}
      <PremiumModal isOpen={showPremiumModal} onClose={() => setShowPremiumModal(false)} />
      <EditProfileModal isOpen={showEditProfileModal} onClose={() => setShowEditProfileModal(false)} />
    </div>
  );
}

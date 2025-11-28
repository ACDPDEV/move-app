'use client';

import { X, Check, Zap, Crown, Infinity, TrendingUp } from 'lucide-react';

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PremiumModal({ isOpen, onClose }: PremiumModalProps) {
  if (!isOpen) return null;

  const features = [
    {
      icon: Infinity,
      title: 'Energía Ilimitada',
      description: 'Practica sin límites, sin esperar recargas'
    },
    {
      icon: Crown,
      title: 'Contenido Exclusivo',
      description: 'Acceso a lecciones avanzadas y experimentos'
    },
    {
      icon: TrendingUp,
      title: 'Análisis Detallado',
      description: 'Estadísticas avanzadas de tu progreso'
    },
    {
      icon: Zap,
      title: 'Sin Anuncios',
      description: 'Experiencia de aprendizaje sin interrupciones'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[var(--card-bg)] shadow-2xl">
        {/* Header con gradiente */}
        <div className="relative overflow-hidden rounded-t-3xl bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 p-8 text-white">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full bg-white/20 p-2 backdrop-blur-sm transition-all hover:bg-white/30"
          >
            <X className="h-5 w-5" />
          </button>
          
          <div className="flex items-center gap-3 mb-4">
            <Crown className="h-12 w-12" />
            <h2 className="text-4xl font-black">MOVE Premium</h2>
          </div>
          <p className="text-lg opacity-90">
            Lleva tu aprendizaje al siguiente nivel
          </p>
        </div>

        {/* Contenido */}
        <div className="p-8">
          {/* Precio */}
          <div className="mb-8 text-center">
            <div className="mb-2 flex items-baseline justify-center gap-2">
              <span className="text-5xl font-black text-[var(--foreground)]">$9.99</span>
              <span className="text-xl text-[var(--text-muted)]">/mes</span>
            </div>
            <p className="text-sm text-[var(--text-muted)]">
              Cancela cuando quieras
            </p>
          </div>

          {/* Features */}
          <div className="mb-8 grid gap-4 sm:grid-cols-2">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="flex gap-4 rounded-2xl border-2 border-[var(--border)] bg-[var(--card-bg-secondary)] p-4 transition-all hover:border-purple-300 dark:hover:border-purple-700"
                >
                  <div className="flex-none rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 p-3">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[var(--foreground)]">{feature.title}</h3>
                    <p className="text-sm text-[var(--text-muted)]">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-3">
            <button className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 py-4 text-lg font-bold text-white shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl active:scale-100">
              Comenzar Prueba Gratuita de 7 Días
            </button>
            <button
              onClick={onClose}
              className="w-full rounded-xl border-2 border-[var(--border)] bg-[var(--card-bg)] py-4 text-lg font-bold text-[var(--foreground)] transition-all hover:bg-[var(--hover-bg)]"
            >
              Tal vez después
            </button>
          </div>

          {/* Disclaimer */}
          <p className="mt-6 text-center text-xs text-[var(--text-muted)]">
            Después de la prueba gratuita, se cobrará $9.99/mes. Cancela en cualquier momento desde la configuración de tu cuenta.
          </p>
        </div>
      </div>
    </div>
  );
}

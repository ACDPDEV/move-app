'use client';

import { useState } from 'react';
import { X, User, Mail, Calendar } from 'lucide-react';
import { useUserStore } from '@/stores/userStore';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EditProfileModal({ isOpen, onClose }: EditProfileModalProps) {
  const { name, setName } = useUserStore();
  const [formData, setFormData] = useState({
    name: name,
    email: 'usuario@ejemplo.com',
    birthdate: '2000-01-01'
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setName(formData.name);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-3xl bg-[var(--card-bg)] shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-[var(--border)] p-6">
          <h2 className="text-2xl font-black text-[var(--foreground)]">Editar Perfil</h2>
          <button
            onClick={onClose}
            className="rounded-full p-2 transition-all hover:bg-[var(--hover-bg)]"
          >
            <X className="h-5 w-5 text-[var(--text-muted)]" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-5">
            {/* Nombre */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-bold text-[var(--foreground)]">
                <User className="h-4 w-4" />
                Nombre
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded-xl border-2 border-[var(--border)] bg-[var(--card-bg)] px-4 py-3 text-[var(--foreground)] transition-all focus:border-[#58cc02] focus:outline-none focus:ring-2 focus:ring-[#58cc02]/20"
                placeholder="Tu nombre"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-bold text-[var(--foreground)]">
                <Mail className="h-4 w-4" />
                Correo Electrónico
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full rounded-xl border-2 border-[var(--border)] bg-[var(--card-bg)] px-4 py-3 text-[var(--foreground)] transition-all focus:border-[#58cc02] focus:outline-none focus:ring-2 focus:ring-[#58cc02]/20"
                placeholder="tu@email.com"
                required
              />
            </div>

            {/* Fecha de Nacimiento */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-bold text-[var(--foreground)]">
                <Calendar className="h-4 w-4" />
                Fecha de Nacimiento
              </label>
              <input
                type="date"
                value={formData.birthdate}
                onChange={(e) => setFormData({ ...formData, birthdate: e.target.value })}
                className="w-full rounded-xl border-2 border-[var(--border)] bg-[var(--card-bg)] px-4 py-3 text-[var(--foreground)] transition-all focus:border-[#58cc02] focus:outline-none focus:ring-2 focus:ring-[#58cc02]/20"
                required
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-8 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border-2 border-[var(--border)] bg-[var(--card-bg)] py-3 font-bold text-[var(--foreground)] transition-all hover:bg-[var(--hover-bg)]"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 rounded-xl bg-gradient-to-r from-[#58cc02] to-[#46a302] py-3 font-bold text-white shadow-lg transition-all hover:scale-[1.02] active:scale-100"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

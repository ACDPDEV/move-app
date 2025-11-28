import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface UserState {
  name: string;
  avatar: string;
  xp: number;
  streak: number;
  coins: number;
  energy: number;
  setName: (name: string) => void;
  setAvatar: (avatar: string) => void;
  addXp: (amount: number) => void;
  setStreak: (streak: number) => void;
  incrementStreak: () => void;
  addCoins: (amount: number) => void;
  spendCoins: (amount: number) => boolean;
  addEnergy: (amount: number) => void;
  loseEnergy: () => boolean;
  resetUser: () => void;
}

const initialState = {
  name: 'Estudiante Física',
  avatar: 'https://picsum.photos/200/200',
  xp: 1240,
  streak: 5,
  coins: 450,
  energy: 20,
};

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setName: (name) => set({ name }),

      setAvatar: (avatar) => set({ avatar }),

      addXp: (amount) => set((state) => ({ xp: state.xp + amount })),

      setStreak: (streak) => set({ streak }),

      incrementStreak: () => set((state) => ({ streak: state.streak + 1 })),

      addCoins: (amount) => set((state) => ({ coins: state.coins + amount })),

      spendCoins: (amount) => {
        const { coins } = get();
        if (coins >= amount) {
          set({ coins: coins - amount });
          return true;
        }
        return false;
      },

      addEnergy: (amount) => set((state) => ({ energy: Math.min(state.energy + amount, 20) })),

      loseEnergy: () => {
        const { energy } = get();
        if (energy > 0) {
          set({ energy: energy - 1 });
          return true;
        }
        return false;
      },

      resetUser: () => set(initialState),
    }),
    {
      name: 'user-storage', // name of the item in localStorage
    }
  )
);

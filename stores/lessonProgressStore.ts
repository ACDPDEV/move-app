import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LessonProgress {
  [lessonId: string]: {
    isCompleted: boolean;
    isLocked: boolean;
    stars: number;
    bestScore: number;
  };
}

interface LessonProgressState {
  progress: LessonProgress;
  completeLesson: (lessonId: string, stars: number, score: number) => void;
  unlockLesson: (lessonId: string) => void;
  isLessonCompleted: (lessonId: string) => boolean;
  isLessonLocked: (lessonId: string) => boolean;
  getLessonStars: (lessonId: string) => number;
  resetProgress: () => void;
}

export const useLessonProgressStore = create<LessonProgressState>()(
  persist(
    (set, get) => ({
      progress: {
        // Primera lección desbloqueada por defecto
        'l1': {
          isCompleted: false,
          isLocked: false,
          stars: 0,
          bestScore: 0
        }
      },

      completeLesson: (lessonId, stars, score) => {
        set((state) => ({
          progress: {
            ...state.progress,
            [lessonId]: {
              isCompleted: true,
              isLocked: false,
              stars: Math.max(state.progress[lessonId]?.stars || 0, stars),
              bestScore: Math.max(state.progress[lessonId]?.bestScore || 0, score)
            }
          }
        }));
      },

      unlockLesson: (lessonId) => {
        set((state) => ({
          progress: {
            ...state.progress,
            [lessonId]: {
              isCompleted: false,
              isLocked: false,
              stars: 0,
              bestScore: 0
            }
          }
        }));
      },

      isLessonCompleted: (lessonId) => {
        return get().progress[lessonId]?.isCompleted || false;
      },

      isLessonLocked: (lessonId) => {
        const progress = get().progress[lessonId];
        // Si no existe en el progreso, está bloqueada (excepto l1)
        if (!progress) return lessonId !== 'l1';
        return progress.isLocked;
      },

      getLessonStars: (lessonId) => {
        return get().progress[lessonId]?.stars || 0;
      },

      resetProgress: () => {
        set({
          progress: {
            'l1': {
              isCompleted: false,
              isLocked: false,
              stars: 0,
              bestScore: 0
            }
          }
        });
      }
    }),
    {
      name: 'lesson-progress-storage',
    }
  )
);

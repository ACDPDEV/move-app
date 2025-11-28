'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, CheckCircle, Play, Star } from 'lucide-react';
import lessonsData from '@/app/mock/lessons.json';
import { useLessonProgressStore } from '@/stores/lessonProgressStore';

interface Exercise {
  id: string;
  type: string;
  question?: string;
  options?: string[];
  correctAnswer?: number;
}

interface Lesson {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  isLocked: boolean;
  stars: number;
  xpReward: number;
  exercises: Exercise[];
}

interface Section {
  id: string;
  title: string;
  description: string;
  color: string;
  lessons: Lesson[];
}

export default function Lessons() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const sections = lessonsData.sections as Section[];
  const { isLessonCompleted, isLessonLocked, getLessonStars } = useLessonProgressStore();

  // Crear lecciones con progreso real
  const sectionsWithProgress = sections.map(section => ({
    ...section,
    lessons: section.lessons.map(lesson => ({
      ...lesson,
      isCompleted: isLessonCompleted(lesson.id),
      isLocked: isLessonLocked(lesson.id),
      stars: getLessonStars(lesson.id)
    }))
  }));

  useEffect(() => {
    // Scroll to the first incomplete lesson across all sections
    if (scrollRef.current) {
      // Find the first section with an incomplete lesson
      const activeSectionIndex = sectionsWithProgress.findIndex(s => s.lessons.some(l => !l.isCompleted && !l.isLocked));
      
      if (activeSectionIndex >= 0) {
        const element = scrollRef.current.children[activeSectionIndex] as HTMLElement;
        element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [sections]);

  const getSectionColor = (color: string) => {
    switch (color) {
      case 'blue':
        return 'from-blue-500 to-cyan-500';
      case 'green':
        return 'from-[#58cc02] to-[#46a302]';
      case 'purple':
        return 'from-purple-500 to-violet-500';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const handleStartLesson = (lessonId: string) => {
    router.push(`/lesson/${lessonId}`);
  };

  return (
    <div className="flex h-full flex-col items-center overflow-y-auto px-4 py-8">
      <div className="w-full max-w-2xl" ref={scrollRef}>
        <h2 className="mb-8 text-center text-3xl font-black text-[var(--foreground)]">
          Tu Camino de Aprendizaje
        </h2>
        
        {sectionsWithProgress.map((section) => (
          <div key={section.id} className="mb-12">
            {/* Section Header */}
            <div className={`mb-6 rounded-2xl bg-gradient-to-r ${getSectionColor(section.color)} p-6 text-white shadow-lg`}>
              <h3 className="text-2xl font-black">{section.title}</h3>
              <p className="opacity-90">{section.description}</p>
            </div>

            <div className="relative space-y-4 pl-4">
              {/* Path line for this section */}
              <div className="absolute left-12 top-0 h-full w-1 bg-gray-200 dark:bg-gray-700" />
              
              {section.lessons.map((lesson, index) => (
                <div
                  key={lesson.id}
                  className="animate-slide-up relative z-10"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div
                    className={`ml-16 rounded-2xl border-2 p-6 transition-all duration-300 ${
                      lesson.isLocked
                        ? 'border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/50'
                        : lesson.isCompleted
                        ? 'border-[#58cc02] bg-gradient-to-br from-green-50 to-emerald-50 shadow-md hover:shadow-lg dark:from-green-950/30 dark:to-emerald-950/30'
                        : 'border-[#1cb0f6] bg-gradient-to-br from-blue-50 to-cyan-50 shadow-md hover:scale-[1.02] hover:shadow-xl dark:from-blue-950/30 dark:to-cyan-950/30'
                    }`}
                  >
                    {/* Icon */}
                    <div
                      className={`absolute -left-8 top-1/2 flex h-16 w-16 -translate-y-1/2 items-center justify-center rounded-full border-4 shadow-lg transition-transform ${
                        lesson.isLocked
                          ? 'border-gray-300 bg-gray-200 dark:border-gray-700 dark:bg-gray-800'
                          : lesson.isCompleted
                          ? 'border-white bg-gradient-to-br from-[#58cc02] to-[#46a302]'
                          : 'border-white bg-gradient-to-br from-[#1cb0f6] to-[#0e8ac7]'
                      }`}
                    >
                      {lesson.isLocked ? (
                        <Lock className="h-7 w-7 text-gray-500" />
                      ) : lesson.isCompleted ? (
                        <CheckCircle className="h-7 w-7 text-white" />
                      ) : (
                        <Play className="h-7 w-7 fill-white text-white" />
                      )}
                    </div>

                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3
                          className={`text-xl font-bold ${
                            lesson.isLocked
                              ? 'text-gray-400'
                              : 'text-[var(--foreground)]'
                          }`}
                        >
                          {lesson.title}
                        </h3>
                        <p
                          className={`mt-1 text-sm ${
                            lesson.isLocked
                              ? 'text-gray-400'
                              : 'text-gray-600 dark:text-gray-400'
                          }`}
                        >
                          {lesson.description}
                        </p>

                        {/* Stars */}
                        {lesson.isCompleted && (
                          <div className="mt-3 flex gap-1">
                            {[1, 2, 3].map((star) => (
                              <Star
                                key={star}
                                className={`h-5 w-5 ${
                                  star <= lesson.stars
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-300 dark:text-gray-600'
                                }`}
                              />
                            ))}
                          </div>
                        )}
                      </div>

                      {/* XP Badge */}
                      <div
                        className={`rounded-full px-3 py-1 text-sm font-bold ${
                          lesson.isLocked
                            ? 'bg-gray-200 text-gray-500 dark:bg-gray-700'
                            : 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300'
                        }`}
                      >
                        +{lesson.xpReward} XP
                      </div>
                    </div>

                    {/* Action Button */}
                    {!lesson.isLocked && (
                      <button
                        onClick={() => handleStartLesson(lesson.id)}
                        className={`mt-4 w-full rounded-xl py-3 font-bold text-white transition-all ${
                          lesson.isCompleted
                            ? 'bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600'
                            : 'bg-gradient-to-r from-[#58cc02] to-[#46a302] shadow-lg hover:scale-[1.02] hover:shadow-xl'
                        }`}
                      >
                        {lesson.isCompleted ? 'Practicar de nuevo' : 'Comenzar'}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

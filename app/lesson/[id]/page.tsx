'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { X, Check } from 'lucide-react';
import lessonsData from '@/app/mock/lessons.json';
import { useUserStore } from '@/stores/userStore';
import Link from 'next/link';
import confetti from 'canvas-confetti';

interface Exercise {
  id: string;
  type: string;
  question?: string;
  options?: string[];
  correctAnswer?: number;
  explanation?: string;
}

interface Lesson {
  id: string;
  title: string;
  exercises: Exercise[];
  xpReward: number;
}

export default function LessonPage() {
  const router = useRouter();
  const params = useParams();
  const { addXp, addCoins, incrementStreak, loseEnergy, energy } = useUserStore();
  
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [status, setStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [isCompleted, setIsCompleted] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);

  useEffect(() => {
    // Buscar la lección en el mock data
    const lessonId = params.id;
    let foundLesson: Lesson | null = null;

    for (const section of lessonsData.sections) {
      const l = section.lessons.find((l) => l.id === lessonId);
      if (l) {
        foundLesson = l as unknown as Lesson;
        break;
      }
    }

    if (foundLesson && foundLesson.exercises && foundLesson.exercises.length > 0) {
      setLesson(foundLesson);
    } else {
      router.push('/');
    }
  }, [params.id, router]);

  const handleCheck = () => {
    if (!lesson || selectedOption === null) return;

    const currentExercise = lesson.exercises[currentExerciseIndex];
    
    if (selectedOption === currentExercise.correctAnswer) {
      setStatus('correct');
      setCorrectAnswers(prev => prev + 1);
    } else {
      setStatus('wrong');
      setWrongAnswers(prev => prev + 1);
      loseEnergy();
    }
  };

  const handleNext = () => {
    if (!lesson) return;

    if (currentExerciseIndex < lesson.exercises.length - 1) {
      setCurrentExerciseIndex((prev) => prev + 1);
      setSelectedOption(null);
      setStatus('idle');
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    if (!lesson) return;
    
    setIsCompleted(true);
    addXp(lesson.xpReward);
    addCoins(10);
    incrementStreak();
    
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  if (!lesson) return null;

  if (energy <= 0 && !isCompleted) {
    return (
      <div className="flex h-screen flex-col items-center justify-center p-4 text-center">
        <h2 className="mb-4 text-2xl font-black text-red-500">¡Te quedaste sin energía!</h2>
        <p className="mb-8 text-gray-600">Espera a que se recargue o usa monedas para comprar más.</p>
        <Link href="/" className="rounded-xl bg-gray-200 px-8 py-3 font-bold text-gray-700">
          Volver al inicio
        </Link>
      </div>
    );
  }

  if (isCompleted) {
    const totalQuestions = lesson.exercises.length;
    const accuracy = Math.round((correctAnswers / totalQuestions) * 100);
    const stars = accuracy >= 90 ? 3 : accuracy >= 70 ? 2 : 1;

    return (
      <div className="flex h-screen flex-col items-center justify-center bg-[var(--background)] p-4">
        <div className="mb-8 rounded-3xl bg-yellow-400 p-8 shadow-xl">
          <Check className="h-24 w-24 text-white" />
        </div>
        <h2 className="mb-2 text-3xl font-black text-[var(--foreground)]">¡Lección Completada!</h2>
        
        {/* Estrellas ganadas */}
        <div className="mb-4 flex gap-2">
          {[1, 2, 3].map((star) => (
            <div
              key={star}
              className={`text-4xl ${star <= stars ? 'text-yellow-400' : 'text-gray-300'}`}
            >
              ★
            </div>
          ))}
        </div>

        {/* Estadísticas */}
        <div className="mb-6 rounded-2xl bg-[var(--card-bg)] p-6 shadow-lg">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-3xl font-black text-[#58cc02]">{correctAnswers}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Correctas</div>
            </div>
            <div>
              <div className="text-3xl font-black text-red-500">{wrongAnswers}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Incorrectas</div>
            </div>
            <div>
              <div className="text-3xl font-black text-blue-500">{accuracy}%</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Precisión</div>
            </div>
          </div>
        </div>

        {/* Recompensas */}
        <div className="mb-8 flex gap-4">
          <div className="rounded-xl bg-amber-100 px-6 py-3 text-amber-700">
            <span className="block text-xs font-bold uppercase">Total XP</span>
            <span className="text-2xl font-black">+{lesson.xpReward}</span>
          </div>
          <div className="rounded-xl bg-yellow-100 px-6 py-3 text-yellow-700">
            <span className="block text-xs font-bold uppercase">Monedas</span>
            <span className="text-2xl font-black">+10</span>
          </div>
        </div>
        <Link 
          href="/"
          className="w-full max-w-sm rounded-xl bg-[#58cc02] py-4 text-center text-lg font-bold text-white shadow-[0_4px_0_#46a302] transition-all hover:bg-[#46a302] active:translate-y-1 active:shadow-none"
        >
          Continuar
        </Link>
      </div>
    );
  }

  const currentExercise = lesson.exercises[currentExerciseIndex];
  const progress = ((currentExerciseIndex) / lesson.exercises.length) * 100;

  return (
    <div className="flex h-full flex-col bg-[var(--background)]">
      {/* Header */}
      <div className="flex-none items-center gap-4 px-4 py-6 flex">
        <Link href="/" className="text-gray-400 hover:text-gray-600">
          <X className="h-6 w-6" />
        </Link>
        <div className="h-4 flex-1 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
          <div 
            className="h-full bg-[#58cc02] transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex items-center gap-1 text-red-500">
          <span className="font-bold">{energy}</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4">
        <div className="mx-auto flex min-h-full w-full max-w-2xl flex-col justify-center py-8">
          <h2 className="mb-8 text-2xl font-bold text-[var(--foreground)] sm:text-3xl">
            {currentExercise.question}
          </h2>

          <div className="space-y-3">
            {currentExercise.options?.map((option, index) => (
              <button
                key={index}
                onClick={() => !status.match(/correct|wrong/) && setSelectedOption(index)}
                disabled={status !== 'idle'}
                className={`w-full rounded-2xl border-2 p-4 text-left text-lg transition-all ${
                  selectedOption === index
                    ? status === 'correct'
                      ? 'border-[#58cc02] bg-green-50 text-[#58cc02] dark:bg-green-900/20'
                      : status === 'wrong'
                      ? 'border-red-500 bg-red-50 text-red-500 dark:bg-red-900/20'
                      : 'border-[#1cb0f6] bg-blue-50 text-[#1cb0f6] dark:bg-blue-900/20'
                    : 'border-[var(--border)] hover:bg-[var(--hover-bg)]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  {selectedOption === index && (
                    <div className={`rounded-full border-2 p-1 ${
                      status === 'correct' ? 'border-[#58cc02] bg-[#58cc02] text-white' :
                      status === 'wrong' ? 'border-red-500 bg-red-500 text-white' :
                      'border-[#1cb0f6] bg-[#1cb0f6] text-white'
                    }`}>
                      {status === 'correct' ? <Check className="h-4 w-4" /> :
                       status === 'wrong' ? <X className="h-4 w-4" /> :
                       <div className="h-4 w-4" />}
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className={`flex-none border-t-2 transition-colors ${
        status === 'correct' ? 'bg-green-100 dark:bg-green-900/30 border-green-200' :
        status === 'wrong' ? 'bg-red-100 dark:bg-red-900/30 border-red-200' :
        'bg-[var(--card-bg)] border-[var(--border)]'
      }`}>
        <div className="mx-auto w-full max-w-2xl p-4 pb-safe">
          {/* Feedback */}
          {status === 'correct' && (
            <div className="mb-3 flex items-center gap-2 text-[#58cc02]">
              <div className="flex-none rounded-full bg-white p-1.5">
                <Check className="h-4 w-4" />
              </div>
              <span className="text-base font-bold">¡Excelente!</span>
            </div>
          )}
          {status === 'wrong' && (
            <div className="mb-3 flex items-start gap-2 text-red-500">
              <div className="flex-none rounded-full bg-white p-1.5">
                <X className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <span className="block text-base font-bold">Respuesta incorrecta</span>
                <span className="block text-xs">Correcta: {currentExercise.options?.[currentExercise.correctAnswer || 0]}</span>
              </div>
            </div>
          )}

          {/* Explicación (solo si hay feedback) */}
          {status !== 'idle' && currentExercise.explanation && (
            <div className="mb-3 max-h-24 overflow-y-auto rounded-lg bg-white p-2.5 text-xs text-gray-700 dark:bg-gray-800 dark:text-gray-300">
              <p className="font-semibold mb-1">💡 Explicación:</p>
              <p className="leading-relaxed">{currentExercise.explanation}</p>
            </div>
          )}
          
          {/* Botón */}
          {status === 'idle' ? (
            <button
              onClick={handleCheck}
              disabled={selectedOption === null}
              className="w-full rounded-xl bg-[#58cc02] py-3.5 text-base font-bold text-white shadow-[0_4px_0_#46a302] transition-all hover:bg-[#46a302] active:translate-y-1 active:shadow-none disabled:bg-gray-300 disabled:shadow-none disabled:text-gray-500"
            >
              COMPROBAR
            </button>
          ) : (
            <button
              onClick={handleNext}
              className={`w-full rounded-xl py-3.5 text-base font-bold text-white shadow-[0_4px_0_rgba(0,0,0,0.2)] transition-all active:translate-y-1 active:shadow-none ${
                status === 'correct' ? 'bg-[#58cc02] hover:bg-[#46a302]' : 'bg-red-500 hover:bg-red-600'
              }`}
            >
              CONTINUAR
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

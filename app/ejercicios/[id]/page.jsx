'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Clock, ChevronLeft, ChevronRight, RotateCcw, Check } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import Icon from '@/components/Icon';
import { getExerciseById, getCategory } from '@/data/exercises';

/**
 * EJERCICIO PNL — Detalle paso a paso
 * -------------------------------------------------------------
 * Interfaz limpia y guiada:
 *   Pantalla 0        -> introducción + botón "Comenzar"
 *   Pantallas 1..n    -> un paso a la vez, con barra de progreso
 *   Pantalla final    -> mensaje de cierre y opciones para repetir
 */
export default function EjercicioDetallePage() {
  const { id } = useParams();
  const exercise = getExerciseById(id);
  const [screen, setScreen] = useState(0); // 0 = intro
  const [done, setDone] = useState(false);

  // Ejercicio inexistente (por si el enlace es antiguo)
  if (!exercise) {
    return (
      <main>
        <PageHeader title="Ejercicio no encontrado" />
        <div className="px-5">
          <p className="text-sm text-ink-soft">
            No hemos encontrado este ejercicio. Vuelve al listado para elegir otro.
          </p>
          <Link href="/ejercicios" className="btn-primary mt-4">
            Ver ejercicios
          </Link>
        </div>
      </main>
    );
  }

  const category = getCategory(exercise.categoria);
  // Mapa estático de acentos (Tailwind no admite clases construidas dinámicamente).
  const accent = {
    sage: 'bg-sage-100 text-sage-600',
    terracotta: 'bg-terracotta-100 text-terracotta-500',
    sand: 'bg-sand-200 text-sand-500',
  }[category?.color || 'sage'];
  const total = exercise.pasos.length;
  const enIntro = screen === 0;
  const pasoActual = exercise.pasos[screen - 1];
  const progreso = done ? 100 : Math.round(((screen - 1) / total) * 100);

  const avanzar = () => {
    if (screen >= total) setDone(true);
    else setScreen((s) => s + 1);
  };
  const retroceder = () => setScreen((s) => Math.max(0, s - 1));
  const reiniciar = () => {
    setScreen(0);
    setDone(false);
  };

  return (
    <main className="flex min-h-[calc(100vh-6rem)] flex-col">
      <PageHeader title={exercise.titulo} subtitle={category?.nombre} />

      <div className="flex flex-1 flex-col px-5 pb-6">
        {/* PANTALLA DE CIERRE */}
        {done ? (
          <div className="flex flex-1 flex-col items-center justify-center text-center animate-fade-up">
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-sage-100 text-sage-600">
              <Check className="h-10 w-10" strokeWidth={2.5} />
            </span>
            <h2 className="mt-6 text-2xl font-bold text-ink">Lo lograste</h2>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-soft">
              {exercise.cierre}
            </p>
            <div className="mt-8 flex w-full flex-col gap-3">
              <button onClick={reiniciar} className="btn-secondary">
                <RotateCcw className="h-4 w-4" />
                Repetir el ejercicio
              </button>
              <Link href="/ejercicios" className="btn-primary">
                Explorar otros ejercicios
              </Link>
            </div>
          </div>
        ) : enIntro ? (
          /* PANTALLA DE INTRODUCCIÓN */
          <div className="flex flex-1 flex-col animate-fade-up">
            <div className="card flex-1">
              <div className="flex items-center gap-3">
                <span className={`flex h-14 w-14 items-center justify-center rounded-2xl ${accent}`}>
                  <Icon name={exercise.icon} className="h-7 w-7" />
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-sand-100 px-3 py-1 text-xs font-medium text-ink-soft">
                  <Clock className="h-3.5 w-3.5" />
                  {exercise.duracion}
                </span>
              </div>
              <p className="mt-5 font-serif text-lg leading-relaxed text-ink">
                {exercise.intro}
              </p>
              <p className="mt-4 text-sm text-ink-light">
                Son {total} pasos. Ve a tu ritmo, no hay prisa.
              </p>
            </div>
            <button onClick={avanzar} className="btn-primary mt-4 w-full">
              Comenzar
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        ) : (
          /* PANTALLA DE UN PASO */
          <div className="flex flex-1 flex-col">
            {/* Barra de progreso */}
            <div className="mb-6">
              <div className="mb-2 flex items-center justify-between text-xs font-medium text-ink-light">
                <span>Paso {screen} de {total}</span>
                <span>{progreso}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-sand-200">
                <div
                  className="h-full rounded-full bg-sage-500 transition-all duration-500"
                  style={{ width: `${(screen / total) * 100}%` }}
                />
              </div>
            </div>

            {/* Contenido del paso */}
            <div key={screen} className="card flex-1 animate-fade-up">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sage-500 font-display text-lg font-bold text-white">
                {screen}
              </span>
              <h2 className="mt-4 text-xl font-bold text-ink">{pasoActual.titulo}</h2>
              <p className="mt-3 text-base leading-relaxed text-ink-soft">
                {pasoActual.texto}
              </p>
            </div>

            {/* Navegación */}
            <div className="mt-4 flex gap-3">
              <button
                onClick={retroceder}
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-sand-200 bg-white text-ink-soft transition hover:bg-sand-100"
                aria-label="Paso anterior"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button onClick={avanzar} className="btn-primary flex-1">
                {screen >= total ? 'Terminar' : 'Siguiente'}
                {screen >= total ? <Check className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

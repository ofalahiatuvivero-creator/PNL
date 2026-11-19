import { Headphones } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import AudioPlayer from '@/components/AudioPlayer';
import { audios, categoriasAudio } from '@/data/audios';

/**
 * AUDIOTECA
 * -------------------------------------------------------------
 * Audios originales de PNL y bienestar, narrados con voz cálida. Reemplaza
 * a la antigua biblioteca de PDF. Agrupa por categoría; cada audio usa el
 * reproductor con sus controles.
 */
export default function AudiotecaPage() {
  const grupos = categoriasAudio
    .map((c) => ({ ...c, items: audios.filter((a) => a.categoria === c.id) }))
    .filter((g) => g.items.length > 0);

  return (
    <main>
      <PageHeader
        title="Audioteca"
        subtitle="Escucha y aprende: PNL y bienestar, en audio."
        back={false}
      />

      <section className="space-y-8 px-5 pb-6">
        {grupos.map((g) => (
          <div key={g.id}>
            <h2 className="mb-3 flex items-center gap-2 px-1 font-serif text-xl font-light text-ink">
              <Headphones className="h-5 w-5 text-sage-500" strokeWidth={1.8} />
              {g.label}
            </h2>
            <div className="space-y-3">
              {g.items.map((a) => (
                <div key={a.id} className="card">
                  <div className="mb-3">
                    <h3 className="font-serif text-lg font-medium leading-tight text-ink">
                      {a.titulo}
                    </h3>
                    <p className="mt-1 text-sm leading-snug text-ink-soft">
                      {a.descripcion}
                    </p>
                  </div>
                  <AudioPlayer src={a.src} />
                </div>
              ))}
            </div>
          </div>
        ))}

        <p className="rounded-2xl bg-sand-100 px-4 py-3 text-center text-xs leading-relaxed text-ink-light">
          Audios originales de Raíces, narrados con una voz cálida. Iremos sumando
          más guías poco a poco. 🌿
        </p>
      </section>
    </main>
  );
}

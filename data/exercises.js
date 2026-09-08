/**
 * EJERCICIOS DE PNL
 * -------------------------------------------------------------
 * Cada ejercicio pertenece a una "necesidad" (categoría) y se muestra
 * paso a paso. El administrador puede:
 *   - Añadir nuevos ejercicios copiando la estructura de uno existente.
 *   - Editar los pasos (cada paso es un objeto { titulo, texto }).
 *   - Cambiar la categoría para reagrupar tarjetas.
 *
 * "icon" es el nombre de un icono de lucide-react (https://lucide.dev/icons).
 */

// Categorías / necesidades. El color se usa como acento de la tarjeta.
export const categories = [
  { id: 'ansiedad', nombre: 'Reducir Ansiedad', color: 'sage', icon: 'Waves' },
  { id: 'motivacion', nombre: 'Aumentar Motivación', color: 'terracotta', icon: 'Sun' },
  { id: 'miedos', nombre: 'Superar Miedos', color: 'sand', icon: 'Shield' },
  { id: 'autoestima', nombre: 'Fortalecer la Autoestima', color: 'sage', icon: 'Heart' },
];

export const exercises = [
  {
    id: 'cambio-submodalidades',
    titulo: 'Cambio de Submodalidades',
    categoria: 'ansiedad',
    duracion: '8 min',
    icon: 'Sliders',
    resumen:
      'Transforma la intensidad de un pensamiento que te genera ansiedad cambiando cómo lo ves y lo escuchas por dentro.',
    intro:
      'Nuestra mente guarda los recuerdos con "cualidades": tamaño, color, brillo, sonido. Al cambiar esas cualidades, cambia también lo que sentimos. Vamos a hacerlo juntos, sin prisa.',
    pasos: [
      { titulo: 'Encuentra un lugar tranquilo', texto: 'Siéntate cómodamente y respira profundo tres veces. Estamos aquí para ti.' },
      { titulo: 'Trae la imagen', texto: 'Piensa en esa situación que te genera ansiedad. Obsérvala como si fuera una foto o un video en tu mente.' },
      { titulo: 'Observa sus cualidades', texto: '¿La imagen es grande o pequeña? ¿A color o en blanco y negro? ¿Cercana o lejana? ¿Hay sonidos, son fuertes?' },
      { titulo: 'Reduce su intensidad', texto: 'Ahora, poco a poco, haz la imagen más pequeña. Aléjala. Quítale el color hasta dejarla en blanco y negro. Baja el volumen de cualquier sonido.' },
      { titulo: 'Añade calma', texto: 'Si quieres, ponle un marco suave, una música tranquila de fondo, una luz cálida. Hazla tan lejana como necesites.' },
      { titulo: 'Regresa y comprueba', texto: 'Abre los ojos. Vuelve a pensar en la situación. Nota cómo la sensación ahora es más manejable. Repite cuando lo necesites.' },
    ],
    cierre: 'Recuerda: tú diriges tu cine interior. Cuantas más veces lo practiques, más fácil será.',
  },
  {
    id: 'ancla-de-recursos',
    titulo: 'Ancla de Recursos (Anclaje)',
    categoria: 'motivacion',
    duracion: '10 min',
    icon: 'Anchor',
    resumen:
      'Crea un "botón" físico que puedas activar cuando necesites recuperar tu energía, seguridad o motivación al instante.',
    intro:
      'Un ancla conecta un gesto sencillo con un estado emocional poderoso. Es como guardar tu mejor versión y poder llamarla cuando quieras.',
    pasos: [
      { titulo: 'Elige tu estado', texto: 'Decide qué quieres sentir: motivación, confianza, calma. Elige uno para empezar.' },
      { titulo: 'Recuerda un momento real', texto: 'Trae a tu mente un recuerdo en el que sentiste eso con fuerza. Revívelo: ¿qué veías, qué oías, qué sentías en el cuerpo?' },
      { titulo: 'Sube la intensidad', texto: 'Haz ese recuerdo más grande, más brillante, más cercano. Deja que la emoción crezca en tu pecho.' },
      { titulo: 'Crea el ancla', texto: 'Justo cuando la emoción esté en su punto máximo, presiona el pulgar con el índice (o aprieta tu puño). Mantén 5 segundos y suelta.' },
      { titulo: 'Rompe el estado', texto: 'Mira a tu alrededor, mueve el cuerpo, piensa en otra cosa durante un momento.' },
      { titulo: 'Prueba tu ancla', texto: 'Repite el gesto (pulgar con índice). Nota cómo regresa la emoción. Repite los pasos 2 a 4 varias veces para reforzarla.' },
    ],
    cierre: 'Ahora tienes un recurso portátil. Úsalo antes de un reto, una reunión o cuando necesites recordarte quién eres.',
  },
  {
    id: 'tecnica-del-swish',
    titulo: 'Técnica del Swish',
    categoria: 'miedos',
    duracion: '9 min',
    icon: 'Sparkles',
    resumen:
      'Sustituye una imagen mental que te limita o te asusta por otra que te potencia, de forma rápida y automática.',
    intro:
      'El Swish reeduca a tu mente para que, ante un disparador, salte directa hacia tu versión más segura y capaz.',
    pasos: [
      { titulo: 'Identifica el disparador', texto: 'Piensa en la imagen que aparece justo antes del miedo o del hábito que quieres cambiar. Hazla grande y brillante.' },
      { titulo: 'Crea tu imagen deseada', texto: 'Ahora imagina cómo quieres ser: seguro/a, tranquilo/a, capaz. Créate una imagen inspiradora de esa versión tuya.' },
      { titulo: 'Coloca las imágenes', texto: 'Deja la imagen del disparador grande frente a ti. Coloca la imagen deseada pequeña y oscura en una esquina.' },
      { titulo: 'Haz el "Swish"', texto: 'Di "¡swish!" mientras la imagen pequeña crece y se vuelve brillante, tapando por completo a la imagen antigua, que se encoge y desaparece.' },
      { titulo: 'Limpia la pantalla', texto: 'Abre los ojos un instante, borra todo. Vuelve a empezar.' },
      { titulo: 'Repite rápido', texto: 'Haz el Swish 5 o 6 veces, cada vez más rápido. Al final, intenta traer la imagen antigua: te costará, porque tu mente ya prefiere la nueva.' },
    ],
    cierre: 'La velocidad es la clave. Con la repetición, tu cerebro elige por defecto tu mejor camino.',
  },
  {
    id: 'respiracion-cuadrada',
    titulo: 'Respiración Cuadrada',
    categoria: 'ansiedad',
    duracion: '5 min',
    icon: 'Square',
    resumen:
      'Una técnica sencilla para calmar el sistema nervioso en minutos, ideal para momentos de tensión o antes de dormir.',
    intro:
      'Respirar en cuatro tiempos iguales le indica a tu cuerpo que está a salvo. Puedes hacerlo en cualquier lugar.',
    pasos: [
      { titulo: 'Prepárate', texto: 'Siéntate con la espalda apoyada. Suelta los hombros. Estamos empezando tu momento de calma.' },
      { titulo: 'Inhala (4 tiempos)', texto: 'Toma aire por la nariz contando hasta 4, llenando el abdomen.' },
      { titulo: 'Sostén (4 tiempos)', texto: 'Retén el aire suavemente contando hasta 4. Sin tensión.' },
      { titulo: 'Exhala (4 tiempos)', texto: 'Suelta el aire por la boca contando hasta 4, despacio.' },
      { titulo: 'Sostén vacío (4 tiempos)', texto: 'Permanece con los pulmones vacíos contando hasta 4.' },
      { titulo: 'Repite el ciclo', texto: 'Completa entre 5 y 8 ciclos. Puedes acompañarte con la "Respiración Guiada" de la Zona Zen.' },
    ],
    cierre: 'Tu respiración es el mando a distancia de tu calma. Siempre está contigo.',
  },
  {
    id: 'espejo-amable',
    titulo: 'El Espejo Amable',
    categoria: 'autoestima',
    duracion: '7 min',
    icon: 'Heart',
    resumen:
      'Reeduca tu diálogo interno para hablarte con respeto y afecto, como le hablarías a alguien que quieres.',
    intro:
      'Muchas veces somos nuestro crítico más duro. Este ejercicio entrena una voz interior más amable y realista.',
    pasos: [
      { titulo: 'Frente al espejo', texto: 'Ponte frente a un espejo. Mírate a los ojos unos segundos, sin juzgar. Solo observa.' },
      { titulo: 'Escucha tu crítica', texto: 'Nota qué frases sueles decirte cuando te equivocas. Anótalas mentalmente sin pelear con ellas.' },
      { titulo: 'Traduce a una voz amable', texto: 'Reformula cada crítica como se la dirías a un buen amigo. "Soy un desastre" se convierte en "Estoy aprendiendo y hoy hice lo que pude".' },
      { titulo: 'Dilo en voz alta', texto: 'Mírate y di tres frases amables sobre ti. Aunque cueste, aunque no lo creas del todo todavía.' },
      { titulo: 'Ancla el gesto', texto: 'Pon una mano en tu pecho mientras lo dices. Que tu cuerpo aprenda que este es un lugar seguro.' },
      { titulo: 'Despídete con cariño', texto: 'Sonríe a tu reflejo. Regálate un gesto amable antes de irte.' },
    ],
    cierre: 'La forma en que te hablas construye la relación más importante de tu vida: la que tienes contigo.',
  },
  {
    id: 'circulo-de-excelencia',
    titulo: 'Círculo de Excelencia',
    categoria: 'motivacion',
    duracion: '8 min',
    icon: 'Target',
    resumen:
      'Diseña un espacio imaginario cargado con tus mejores estados para "entrar en él" antes de cualquier desafío.',
    intro:
      'Imagina un círculo en el suelo donde vive tu mejor energía. Vas a llenarlo y aprender a pisarlo cuando lo necesites.',
    pasos: [
      { titulo: 'Dibuja tu círculo', texto: 'Imagina un círculo de luz en el suelo, frente a ti. Dale un color que te transmita fuerza.' },
      { titulo: 'Recuerda tu excelencia', texto: 'Trae un momento en el que te sentiste imparable, capaz, pleno/a. Revívelo con todos los detalles.' },
      { titulo: 'Llena el círculo', texto: 'Con esa emoción en su punto alto, da un paso y entra al círculo. Deja que la sensación te envuelva por completo.' },
      { titulo: 'Amplíalo', texto: 'Suma más recuerdos de poder al mismo círculo. Cada uno lo hace brillar más.' },
      { titulo: 'Sal y observa', texto: 'Da un paso atrás, fuera del círculo. Respira. El círculo guarda toda esa energía por ti.' },
      { titulo: 'Vuelve a entrar', texto: 'Cuando necesites motivación, imagina el círculo y pisa dentro. Tu estado poderoso te estará esperando.' },
    ],
    cierre: 'Llevas tu círculo de excelencia siempre contigo. Es tuyo y nadie puede apagarlo.',
  },
];

/** Devuelve un ejercicio por su id (o undefined si no existe). */
export function getExerciseById(id) {
  return exercises.find((e) => e.id === id);
}

/** Devuelve la información de una categoría por su id. */
export function getCategory(id) {
  return categories.find((c) => c.id === id);
}

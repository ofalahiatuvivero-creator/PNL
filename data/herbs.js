/**
 * HERBOLARIA · MEDICINA BOTÁNICA
 * -------------------------------------------------------------
 * Fichas de plantas medicinales de uso tradicional. Contenido educativo
 * y de acompañamiento, NO es prescripción médica.
 *
 * El administrador puede ampliar la lista copiando la estructura. Campos:
 *   nombre        -> nombre común
 *   cientifico    -> nombre científico (en cursiva en la ficha)
 *   categoria     -> para agrupar/filtrar ('Calma y sueño', 'Digestión',
 *                    'Respiración y defensas', 'Ánimo y energía',
 *                    'Piel y heridas', 'Equilibrio general')
 *   beneficios    -> para qué se usa tradicionalmente
 *   preparacion   -> cómo se suele preparar
 *   precauciones  -> advertencias importantes (NO omitir)
 *
 * La herbolaria se irá ampliando con el tiempo.
 */

export const nota =
  'La información de esta sección es de carácter educativo y se basa en usos tradicionales de las plantas. NO sustituye el consejo, diagnóstico ni tratamiento de un profesional de la salud. Antes de usar cualquier planta, consulta con tu médico, sobre todo si estás embarazada o en lactancia, tomas medicamentos, tienes una enfermedad o es para niños. Las plantas también pueden tener efectos y contraindicaciones.';

export const categoriasHerbolaria = [
  'Calma y sueño',
  'Digestión',
  'Respiración y defensas',
  'Ánimo y energía',
  'Piel y heridas',
  'Equilibrio general',
];

export const herbs = [
  {
    id: 'manzanilla',
    nombre: 'Manzanilla',
    cientifico: 'Matricaria chamomilla',
    categoria: 'Calma y sueño',
    beneficios: 'Calma suave para los nervios, ayuda a conciliar el sueño y alivia molestias digestivas y cólicos leves.',
    preparacion: 'Infusión: 1 cucharadita de flores en una taza de agua caliente, reposar 5–10 minutos. Hasta 2–3 tazas al día.',
    precauciones: 'Evitar si hay alergia a plantas de la familia de las margaritas (asteráceas).',
  },
  {
    id: 'lavanda',
    nombre: 'Lavanda',
    cientifico: 'Lavandula angustifolia',
    categoria: 'Calma y sueño',
    beneficios: 'Relaja, reduce la ansiedad y favorece un sueño reparador. Su aroma es profundamente calmante.',
    preparacion: 'Infusión suave de flores, o aromaterapia: unas gotas de aceite esencial en un difusor.',
    precauciones: 'El aceite esencial es solo para uso externo o aromático; nunca se ingiere.',
  },
  {
    id: 'valeriana',
    nombre: 'Valeriana',
    cientifico: 'Valeriana officinalis',
    categoria: 'Calma y sueño',
    beneficios: 'Tradicionalmente usada para el insomnio y el nerviosismo; ayuda a soltar la tensión.',
    preparacion: 'Infusión de la raíz, preferiblemente por la noche.',
    precauciones: 'Produce somnolencia: no combinar con sedantes ni alcohol, ni antes de conducir. Evitar en embarazo y lactancia; no usar de forma prolongada sin control.',
  },
  {
    id: 'melisa',
    nombre: 'Melisa (Toronjil)',
    cientifico: 'Melissa officinalis',
    categoria: 'Calma y sueño',
    beneficios: 'Calma la ansiedad y la "digestión nerviosa"; ayuda a relajarse y dormir mejor.',
    preparacion: 'Infusión de hojas frescas o secas, 1 cucharadita por taza.',
    precauciones: 'En dosis altas podría afectar la tiroides; precaución en caso de hipotiroidismo.',
  },
  {
    id: 'pasiflora',
    nombre: 'Pasiflora',
    cientifico: 'Passiflora incarnata',
    categoria: 'Calma y sueño',
    beneficios: 'Apoyo tradicional para la ansiedad y el insomnio, con efecto relajante.',
    preparacion: 'Infusión de las partes aéreas, sobre todo por la tarde-noche.',
    precauciones: 'Puede dar somnolencia. Evitar en embarazo y con medicamentos sedantes.',
  },
  {
    id: 'tilo',
    nombre: 'Tilo',
    cientifico: 'Tilia spp.',
    categoria: 'Calma y sueño',
    beneficios: 'Relajante de los nervios, ayuda a dormir y acompaña en resfriados.',
    preparacion: 'Infusión de las flores, 1 cucharadita por taza.',
    precauciones: 'En exceso puede tener efecto diurético. Moderar el consumo muy frecuente.',
  },
  {
    id: 'menta',
    nombre: 'Menta / Hierbabuena',
    cientifico: 'Mentha piperita',
    categoria: 'Digestión',
    beneficios: 'Alivia gases, pesadez y náuseas; refrescante y digestiva.',
    preparacion: 'Infusión de hojas después de las comidas.',
    precauciones: 'Puede empeorar el reflujo o la acidez; evitar en reflujo gastroesofágico.',
  },
  {
    id: 'jengibre',
    nombre: 'Jengibre',
    cientifico: 'Zingiber officinale',
    categoria: 'Digestión',
    beneficios: 'Excelente para las náuseas y la digestión; antiinflamatorio y reconfortante en resfriados.',
    preparacion: 'Unas rodajas o rallado en agua caliente (infusión), con limón si gustas.',
    precauciones: 'En dosis altas puede interferir con anticoagulantes. Moderar en embarazo y con cálculos biliares.',
  },
  {
    id: 'hinojo',
    nombre: 'Hinojo',
    cientifico: 'Foeniculum vulgare',
    categoria: 'Digestión',
    beneficios: 'Ayuda con gases, cólicos y digestiones pesadas.',
    preparacion: 'Infusión de semillas ligeramente machacadas, 1 cucharadita por taza.',
    precauciones: 'Evitar dosis altas durante el embarazo.',
  },
  {
    id: 'anis',
    nombre: 'Anís verde',
    cientifico: 'Pimpinella anisum',
    categoria: 'Digestión',
    beneficios: 'Favorece la digestión, alivia gases y suaviza la tos.',
    preparacion: 'Infusión de semillas, sola o combinada con manzanilla.',
    precauciones: 'Moderar durante el embarazo.',
  },
  {
    id: 'boldo',
    nombre: 'Boldo',
    cientifico: 'Peumus boldus',
    categoria: 'Digestión',
    beneficios: 'Apoya al hígado y la digestión de las grasas.',
    preparacion: 'Infusión suave de hojas, por periodos cortos.',
    precauciones: 'NO usar en embarazo ni con obstrucción de las vías biliares. Evitar el uso prolongado.',
  },
  {
    id: 'diente-de-leon',
    nombre: 'Diente de león',
    cientifico: 'Taraxacum officinale',
    categoria: 'Digestión',
    beneficios: 'Digestivo y depurativo; diurético suave y apoyo del hígado.',
    preparacion: 'Infusión de hoja o raíz; también la hoja tierna en ensalada.',
    precauciones: 'Precaución con cálculos biliares. Por su efecto diurético, cuidado si tomas diuréticos.',
  },
  {
    id: 'cardamomo',
    nombre: 'Cardamomo',
    cientifico: 'Elettaria cardamomum',
    categoria: 'Digestión',
    beneficios: 'Digestivo, refresca el aliento y ayuda con las náuseas.',
    preparacion: 'Semillas ligeramente abiertas en infusión o añadidas al té.',
    precauciones: 'Generalmente seguro en cantidades culinarias.',
  },
  {
    id: 'romero',
    nombre: 'Romero',
    cientifico: 'Rosmarinus officinalis',
    categoria: 'Ánimo y energía',
    beneficios: 'Estimula la circulación, despeja la mente y levanta el ánimo; también digestivo.',
    preparacion: 'Infusión de hojas; su aroma también energiza.',
    precauciones: 'Evitar dosis medicinales altas en embarazo. Precaución con epilepsia e hipertensión si se abusa.',
  },
  {
    id: 'ashwagandha',
    nombre: 'Ashwagandha',
    cientifico: 'Withania somnifera',
    categoria: 'Ánimo y energía',
    beneficios: 'Planta adaptógena: ayuda al cuerpo a manejar el estrés y a recuperar energía y descanso.',
    preparacion: 'Polvo de la raíz, según la indicación del producto (a menudo con leche vegetal o agua tibia).',
    precauciones: 'Evitar en embarazo. Precaución con problemas de tiroides o enfermedades autoinmunes; consulta si tomas medicación.',
  },
  {
    id: 'hierba-de-san-juan',
    nombre: 'Hierba de San Juan (Hipérico)',
    cientifico: 'Hypericum perforatum',
    categoria: 'Ánimo y energía',
    beneficios: 'Usada tradicionalmente como apoyo del ánimo en estados de tristeza leve.',
    preparacion: 'Infusión o extracto estandarizado, según indicación.',
    precauciones: '⚠️ Muy importante: interfiere con MUCHOS medicamentos (antidepresivos, anticonceptivos, anticoagulantes y más) reduciendo su efecto, y puede causar sensibilidad al sol. NO la tomes si usas medicación sin hablar antes con tu médico.',
  },
  {
    id: 'tomillo',
    nombre: 'Tomillo',
    cientifico: 'Thymus vulgaris',
    categoria: 'Respiración y defensas',
    beneficios: 'Alivia la tos y despeja las vías respiratorias; antiséptico natural.',
    preparacion: 'Infusión de hojas; también en vapores para inhalar.',
    precauciones: 'Moderar durante el embarazo.',
  },
  {
    id: 'eucalipto',
    nombre: 'Eucalipto',
    cientifico: 'Eucalyptus globulus',
    categoria: 'Respiración y defensas',
    beneficios: 'Descongestiona y alivia las vías respiratorias, ideal en resfriados.',
    preparacion: 'Hojas en agua caliente para inhalar el vapor.',
    precauciones: 'NO ingerir el aceite esencial. No aplicar aceite esencial en bebés o niños pequeños ni cerca de su cara.',
  },
  {
    id: 'sauco',
    nombre: 'Saúco',
    cientifico: 'Sambucus nigra',
    categoria: 'Respiración y defensas',
    beneficios: 'Apoya las defensas en resfriados y gripes; favorece la sudoración y alivia la congestión.',
    preparacion: 'Infusión de las flores. Las bayas solo bien cocidas (jarabe).',
    precauciones: 'Las bayas crudas y el resto de la planta son tóxicas. Usa solo flores o bayas bien cocidas.',
  },
  {
    id: 'equinacea',
    nombre: 'Equinácea',
    cientifico: 'Echinacea purpurea',
    categoria: 'Respiración y defensas',
    beneficios: 'Apoyo del sistema inmune, sobre todo al inicio de un resfriado.',
    preparacion: 'Infusión o extracto, en periodos cortos (no continuo).',
    precauciones: 'Evitar en enfermedades autoinmunes. Posible alergia en sensibles a las asteráceas.',
  },
  {
    id: 'calendula',
    nombre: 'Caléndula',
    cientifico: 'Calendula officinalis',
    categoria: 'Piel y heridas',
    beneficios: 'Cicatrizante y calmante de la piel irritada; alivia pequeñas heridas y rozaduras.',
    preparacion: 'Uso externo: infusión para compresas, o en forma de crema o aceite.',
    precauciones: 'Principalmente de uso externo. Posible alergia en sensibles a las asteráceas.',
  },
  {
    id: 'aloe-vera',
    nombre: 'Aloe vera (Sábila)',
    cientifico: 'Aloe barbadensis',
    categoria: 'Piel y heridas',
    beneficios: 'El gel calma quemaduras leves, irritaciones y resequedad de la piel.',
    preparacion: 'Uso externo: aplicar el gel fresco de la hoja sobre la piel.',
    precauciones: 'El látex (la parte amarilla bajo la piel de la hoja) es un laxante fuerte e irritante; no lo ingieras. Evitar el uso interno en embarazo.',
  },
  {
    id: 'ortiga',
    nombre: 'Ortiga',
    cientifico: 'Urtica dioica',
    categoria: 'Equilibrio general',
    beneficios: 'Muy rica en minerales; remineralizante, antiinflamatoria y depurativa.',
    preparacion: 'Infusión de la hoja seca (la cocción elimina el escozor).',
    precauciones: 'Efecto diurético: precaución si tomas diuréticos o medicación para la tensión.',
  },
  {
    id: 'salvia',
    nombre: 'Salvia',
    cientifico: 'Salvia officinalis',
    categoria: 'Equilibrio general',
    beneficios: 'Digestiva, útil en sofocos y para hacer gárgaras en dolor de garganta.',
    preparacion: 'Infusión de hojas; para la garganta, en gárgaras ya tibia.',
    precauciones: 'Evitar en embarazo y lactancia (puede disminuir la leche). No usar en dosis altas de forma prolongada.',
  },
  {
    id: 'canela',
    nombre: 'Canela',
    cientifico: 'Cinnamomum verum',
    categoria: 'Equilibrio general',
    beneficios: 'Digestiva y reconfortante; acompaña el equilibrio del azúcar en sangre como apoyo.',
    preparacion: 'Una rama en infusión o espolvoreada sobre frutas y bebidas.',
    precauciones: 'No recomendada en dosis altas durante el embarazo. La canela cassia contiene cumarina: mejor con moderación.',
  },
];

export function getHerbById(id) {
  return herbs.find((h) => h.id === id);
}

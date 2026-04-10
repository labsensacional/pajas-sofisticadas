/** Definiciones de los ejes de puntuación para el form de acciones. */
export const SCORE_FIELDS = [
  {
    key: 'arousal', color: '#FF8C42', min: -10, max: 10,
    question: '¿Qué tanto activa o excita?',
    tech: 'Activación',
    tooltip: [
      'Activación del sistema nervioso simpático (arousal) — respuesta de "encendido".',
      '',
      '🔥 Alto (7–10): erección/lubricación espontánea, respiración acelerada, pulso elevado, tensión muscular involuntaria, urgencia de moverse o actuar.',
      '😐 Bajo (1–3): estado relajado, calma, sin respuesta genital notable, mente tranquila.',
      '❄️ Negativo: baja la activación activamente — respiración lenta 4-7-8, cold down, pausa.',
    ].join('\n'),
  },
  {
    key: 'trance', color: '#7B68EE', min: -10, max: 10,
    question: '¿Qué tan hipnótico o disociativo es?',
    tech: 'Trance',
    tooltip: [
      'Absorción atencional, pérdida de control consciente, estados alterados.',
      '',
      '🌀 Alto (7–10): mirada perdida o semicerrada, respuestas lentas, no escucha bien, pérdida de noción del tiempo, sensación de flotar o de que el cuerpo no es propio.',
      '👁️ Bajo (1–3): mente activa, consciente del entorno, pensamientos normales, presente.',
      '⚡ Negativo: aumenta el estado de alerta — miedo, ejercicio intenso, frío súbito.',
    ].join('\n'),
  },
  {
    key: 'pleasure', color: '#FF6B9D', min: -10, max: 10,
    question: '¿Cuánto placer físico directo produce?',
    tech: 'Placer',
    tooltip: [
      'Sensaciones hedónicas directas — cuánto "se siente bien" en el momento.',
      '',
      '💫 Alto (7–10): gemidos involuntarios, búsqueda activa de más estímulo, contracción muscular placentera, querer que no pare.',
      '😑 Bajo (1–3): sensación neutra o apenas placentera; el valor está en otro lado.',
      '😣 Negativo: produce incomodidad que puede reatribuirse como placer (dolor controlado, frío).',
    ].join('\n'),
  },
  {
    key: 'dopamine', color: '#FFD166', min: -10, max: 10,
    question: '¿Da ganas de repetirlo?',
    tech: 'Dopamina',
    tooltip: [
      'Sistema de anticipación y recompensa — el "querer" más que el "gustar".',
      '',
      '🎯 Alto (7–10): querer hacer exactamente lo mismo otra vez de inmediato, pensar en ello horas después, planificar la próxima vez durante la práctica.',
      '😌 Bajo (1–3): satisfactorio pero no genera "querer más", fácil de parar.',
      '📉 Negativo: reduce el impulso de repetición — puede ser regulador o reset.',
    ].join('\n'),
  },
  {
    key: 'endorphins', color: '#06D6A0', min: -10, max: 10,
    question: '¿Deja euforia o bienestar después?',
    tech: 'Endorfinas',
    tooltip: [
      'Euforia, analgesia y bienestar que aparecen durante o después, no en el momento pico.',
      '',
      '🏃 Alto (7–10): sensación de euforia o "high" al terminar, no sentir dolor que debería sentirse, sonrisa involuntaria, cuerpo liviano, efecto dura 30–60 min.',
      '😶 Bajo (1–3): sin efecto post-práctica notable, vuelta rápida al estado basal.',
      '😴 Negativo: genera fatiga, bajón o crash post-práctica.',
    ].join('\n'),
  },
  {
    key: 'oxytocin', color: '#74B0FF', min: -10, max: 10,
    question: '¿Genera conexión, ternura o sensación de vínculo?',
    tech: 'Oxitocina',
    tooltip: [
      'Hormona del apego y la confianza — conexión relacional o con uno mismo.',
      '',
      '🤗 Alto (7–10): ganas intensas de abrazar o ser abrazado, sensación de confianza profunda, querer quedarse cerca, ternura espontánea, apertura emocional.',
      '🧊 Bajo (1–3): práctica más individual o técnica, sin componente relacional fuerte.',
      '🚪 Negativo: puede generar distancia o disociación relacional temporaria.',
    ].join('\n'),
  },
  {
    key: 'energy', color: '#aaa', min: 0, max: 10,
    question: '¿Cuánta energía física o mental requiere?',
    tech: 'Energía requerida',
    tooltip: [
      'Esfuerzo físico necesario para realizarla — no la energía que produce.',
      '',
      '💪 Alto (8–10): agotamiento físico real al terminar, sudoración, necesita calentamiento, no se puede hacer cansado.',
      '🛋️ Bajo (0–2): se puede hacer tumbado sin moverse, cero esfuerzo físico, ideal para estados de baja energía.',
    ].join('\n'),
  },
];

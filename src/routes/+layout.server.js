const SITE_NAME = 'Recetario Sensacional';

function metaForPath(pathname) {
  if (pathname === '/') {
    return {
      title: SITE_NAME,
      description: 'Base de datos colaborativa para actividades recreativas y sexuales. Compartí y charlá sobre prácticas para alcanzar estados de inmersión, placer y/o excitación.'
    };
  }

  const section = pathname.split('/').filter(Boolean)[0] ?? '';

  if (section === 'concepto' || section === 'teoria') {
    return {
      title: `¿Qué es esto? · ${SITE_NAME}`,
      description: 'Introducción al laboratorio y a sus ejes de excitación, placer e inmersión.'
    };
  }

  if (section === 'practicas' || section === 'acciones') {
    return {
      title: `Prácticas · ${SITE_NAME}`,
      description: 'Catálogo de técnicas y prácticas con ejes de arousal, inmersión, placer y otros moduladores.'
    };
  }

  if (section === 'sesiones') {
    return {
      title: `Sesiones · ${SITE_NAME}`,
      description: 'Relatos y registros de sesiones reales compartidos por la comunidad.'
    };
  }

  if (section === 'login') {
    return {
      title: `Login · ${SITE_NAME}`,
      description: 'Entrá a Recetario Sensacional para compartir prácticas, sesiones e introducción.'
    };
  }

  if (section === 'perfil') {
    return {
      title: `Perfil · ${SITE_NAME}`,
      description: 'Explorá perfiles, aportes y actividad dentro de Recetario Sensacional.'
    };
  }

  return {
    title: SITE_NAME,
    description: 'Comunidad para explorar introducción, prácticas y sesiones de psiconáutica recreativa y sexual.'
  };
}

export function load({ url }) {
  const meta = metaForPath(url.pathname);
  const origin = url.origin;

  return {
    meta: {
      ...meta,
      canonical: `${origin}${url.pathname}`,
      image: `${origin}/social/social-card.png`,
      siteName: SITE_NAME
    }
  };
}

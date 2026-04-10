const SITE_NAME = 'Laboratorio Sensacional';

function metaForPath(pathname) {
  if (pathname === '/') {
    return {
      title: SITE_NAME,
      description: 'Teoria, acciones y sesiones para explorar estados de trance, placer y excitacion en comunidad.'
    };
  }

  const section = pathname.split('/').filter(Boolean)[0] ?? '';

  if (section === 'teoria') {
    return {
      title: `Teoria · ${SITE_NAME}`,
      description: 'Marco teorico sobre arousal, trance, placer y combinacion de practicas para estados alterados.'
    };
  }

  if (section === 'acciones') {
    return {
      title: `Acciones · ${SITE_NAME}`,
      description: 'Catalogo de tecnicas y practicas con ejes de arousal, trance, placer y otros moduladores.'
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
      description: 'Entrá a Laboratorio Sensacional para compartir acciones, sesiones y teoria.'
    };
  }

  if (section === 'perfil') {
    return {
      title: `Perfil · ${SITE_NAME}`,
      description: 'Explorá perfiles, aportes y actividad dentro de Laboratorio Sensacional.'
    };
  }

  return {
    title: SITE_NAME,
    description: 'Comunidad para explorar teoria, acciones y sesiones de psiconautica recreativa y sexual.'
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


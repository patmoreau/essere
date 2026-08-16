export type PageMeta = {
  title: string;
  description: string;
};

export const SITE_URL = 'https://essere.ca';

const DEFAULT_META: PageMeta = {
  title: 'Studio de pilates et yoga à Boucherville | essere',
  description:
    'essere — fusion pilates yoga à Boucherville. Cours de groupe de pilates et de yoga accessibles à tous, ateliers et retraites. Bouger, respirer, être.',
};

const META_BY_PATH: Record<string, PageMeta> = {
  '/accueil': DEFAULT_META,
  '/cours': {
    title: 'Cours de pilates et de yoga à Boucherville | essere',
    description:
      'Horaire des cours de groupe de pilates et de yoga du studio essere à Boucherville. Tous niveaux : mouvement, respiration, posture, mobilité.',
  },
  '/evenements': {
    title: 'Ateliers et retraites de yoga et de pilates | essere',
    description:
      "Ateliers, retraites et événements bien-être du studio essere à Boucherville. Une expérience d'approfondissement et de ralentissement, à son rythme.",
  },
  '/instructeurs': {
    title: 'Nos instructrices de pilates et de yoga | essere',
    description:
      'Rencontrez les professeures de pilates et de yoga du studio essere à Boucherville : un enseignement authentique, humain et professionnel.',
  },
  '/contact': {
    title: 'Nous joindre — studio de pilates et yoga à Boucherville | essere',
    description:
      'Contactez le studio essere, 107 rue Louis-Lacoste à Boucherville. Questions sur les cours de pilates et de yoga, les ateliers ou les collaborations.',
  },
};

export const PageMeta = {
  forPath: (pathname: string): PageMeta => META_BY_PATH[pathname] ?? DEFAULT_META,
};

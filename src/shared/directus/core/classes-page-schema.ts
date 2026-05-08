import type { ClassesPage } from '../../../schedule/core/classes-page.ts';

export type ClassesPageSchema = {
  hero_eyebrow: string;
  hero_image: string;
  hero_headline: string;
  hero_headline_accent: string;
  hero_subheading: string;
  classes_featured_headline: string;
};

const toClassesPage = (schema: ClassesPageSchema): ClassesPage => ({
  heroEyebrow: schema.hero_eyebrow,
  heroImage: schema.hero_image,
  heroHeadline: schema.hero_headline,
  heroHeadlineAccent: schema.hero_headline_accent,
  heroSubheading: schema.hero_subheading,
  classesFeaturedHeadline: schema.classes_featured_headline,
});

export const ClassesPageSchema = { toClassesPage } as const;

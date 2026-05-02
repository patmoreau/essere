import type { HomePage as HomePageModel } from '../../../home/core/home-page.ts';

export type HomePageSchema = {
  est_year: string;
  hero_image: string;
  hero_image_text: string;
  hero_headline_line1: string;
  hero_headline_line2: string;
  hero_subheading: string;
  hero_cta_primary_label: string;
  hero_cta_secondary_label: string;
  philosophy_section_label: string;
  philosophy_card_1_icon: string;
  philosophy_card_1_title: string;
  philosophy_card_1_body: string;
  philosophy_card_2_icon: string;
  philosophy_card_2_title: string;
  philosophy_card_2_body: string;
};

const toHomePage = (schema: HomePageSchema): HomePageModel => ({
  estYear: schema.est_year,
  heroImage: schema.hero_image,
  heroImageText: schema.hero_image_text,
  heroHeadlineLine1: schema.hero_headline_line1,
  heroHeadlineLine2: schema.hero_headline_line2,
  heroSubheading: schema.hero_subheading,
  heroCtaPrimaryLabel: schema.hero_cta_primary_label,
  heroCtaSecondaryLabel: schema.hero_cta_secondary_label,
  philosophySectionLabel: schema.philosophy_section_label,
  philosophyCard1Icon: schema.philosophy_card_1_icon,
  philosophyCard1Title: schema.philosophy_card_1_title,
  philosophyCard1Body: schema.philosophy_card_1_body,
  philosophyCard2Icon: schema.philosophy_card_2_icon,
  philosophyCard2Title: schema.philosophy_card_2_title,
  philosophyCard2Body: schema.philosophy_card_2_body,
});

export const HomePageSchema = { toHomePage: toHomePage } as const;

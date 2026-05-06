export type FooterLinkSchema = {
  label: string;
  href: string;
  category: string;
  order: number;
};

export type FooterLink = {
  label: string;
  href: string;
  category: string;
};

const toFooterLink = (schema: FooterLinkSchema): FooterLink => ({
  label: schema.label,
  href: schema.href,
  category: schema.category,
});

export const FooterLinkSchema = { toFooterLink } as const;

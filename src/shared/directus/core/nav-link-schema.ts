import type {NavLink} from "../../navbar/core/nav-link.ts";

export type NavLinkSchema = {
  key: string
  href: string
  order: number
  label: string
}

const toNavLink = (schema: NavLinkSchema): NavLink => ({
  ...schema,
});

export const NavLinkSchema = {toNavLink: toNavLink} as const;
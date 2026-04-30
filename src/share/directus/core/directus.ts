import {createDirectus, rest, readItems, readSingleton} from '@directus/sdk'
import {Config} from '../../config/core/config'
import type {NavLink} from "./nav-link.ts";
import type {HomePage} from "./home-page.ts";

type Schema = {
  nav_links: NavLink[]
  home_page: HomePage
}

export type Directus = {
  getNavLinks(): Promise<NavLink[]>
  getHomePage(): Promise<HomePage>
}

export const Directus = (config: Config): Directus => {
  const directus = createDirectus<Schema>(config.DIRECTUS_URL).with(rest())
  const getNavLinks = () => {
    return directus.request(readItems('nav_links', {sort: ['order']}))
  }

  const getHomePage = () => {
    return directus.request(readSingleton('home_page'))
  }

  return {
    getNavLinks: getNavLinks,
    getHomePage: getHomePage,
  }
}


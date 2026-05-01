import { createDirectus, rest, readItems, readSingleton } from '@directus/sdk'
import { Config } from '../../config/core/config'
import type { NavLink } from './nav-link.ts'
import type { HomePage } from './home-page.ts'
import type { Label } from './label.ts'

type Schema = {
  labels: Label[]
  nav_links: NavLink[]
  home_page: HomePage
}

export type Directus = {
  getLabels(): Promise<Record<string, string>>
  getNavLinks(): Promise<NavLink[]>
  getHomePage(): Promise<HomePage>
}

export const Directus = (config: Config): Directus => {
  const directus = createDirectus<Schema>(config.DIRECTUS_URL).with(rest())

  const getLabels = async (): Promise<Record<string, string>> => {
    const response = await directus.request(readItems('labels', { limit: -1 }))

    return response.reduce(
      (acc, item) => {
        const translation = item.value || item.key
        acc[item.key] = translation
        return acc
      },
      {} as Record<string, string>,
    )
  }

  const getNavLinks = () => {
    return directus.request(readItems('nav_links', { sort: ['order'] }))
  }

  const getHomePage = () => {
    return directus.request(readSingleton('home_page'))
  }

  return {
    getLabels: getLabels,
    getNavLinks: getNavLinks,
    getHomePage: getHomePage,
  }
}

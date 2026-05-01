import { type ReactNode } from 'react'
import { DirectusContext } from './DirectusContext.tsx'
import type { Directus } from '../core/directus.ts'

export const DirectusProvider = ({
  children,
  directus,
}: {
  children: ReactNode
  directus: Directus
}) => {
  return <DirectusContext.Provider value={directus}>{children}</DirectusContext.Provider>
}

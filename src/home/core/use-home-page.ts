import { use, useState } from 'react'
import { useDirectus } from '../../share/directus/core/use-directus.ts'

export const useHomePage = () => {
  const { getHomePage } = useDirectus()

  const [dataPromise] = useState(() => getHomePage())

  return use(dataPromise)
}

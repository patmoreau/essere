import { type ReactNode } from 'react'
import type { Config } from '../core/config.ts'
import { ConfigContext } from './ConfigContext'

export const ConfigProvider = ({ children, config }: { children: ReactNode; config: Config }) => {
  return <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>
}

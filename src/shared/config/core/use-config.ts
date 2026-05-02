import { useContext } from 'react';

import { ConfigContext } from '../ui/ConfigContext.tsx';
import type { Config } from './config.ts';

export const useConfig = (): Config => {
  return useContext(ConfigContext)!;
};

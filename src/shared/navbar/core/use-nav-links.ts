import { useCallback, useEffect, useState } from 'react';

import { useDirectus } from '../../directus/core/use-directus.ts';
import type { NavLink } from './nav-link.ts';

export const useNavLinks = () => {
  const [links, setLinks] = useState<NavLink[]>([]);
  const { getNavLinks } = useDirectus();

  const fetch = useCallback(async () => {
    const result = await getNavLinks();
    setLinks(result);
  }, [getNavLinks]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetch().then();
  }, [fetch]);

  return links;
};

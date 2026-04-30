import {useDirectus} from "../../directus/core/use-directus.ts";
import {useCallback, useEffect, useState} from "react";
import type {NavLink} from "../../directus/core/nav-link.ts";

export const useNavLinks = () => {
  const [links, setLinks] = useState<NavLink[]>([]);
  const {getNavLinks} = useDirectus();

  const fetch = useCallback(async () => {
    const result = await getNavLinks();
    setLinks(result);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetch().then();
  }, [fetch])

  return links;
}
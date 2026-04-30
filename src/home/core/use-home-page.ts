import {useCallback, useEffect, useState} from "react";
import {useDirectus} from "../../share/directus/core/use-directus.ts";
import type {HomePage} from "../../share/directus/core/home-page.ts";

export const useHomePage = () => {
  const [data, setData] = useState<HomePage | undefined>(undefined);
  const {getHomePage} = useDirectus();

  const fetch = useCallback(async () => {
    const result = await getHomePage();
    setData(result);
  }, []);

  useEffect(() => {
    fetch().then();
  }, [fetch])

  return data;
}
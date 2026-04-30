import {useCallback, useEffect, useState} from "react";
import {useDirectus} from "./use-directus.ts";

export const useLabels = () => {
  const [labels, setLabels] = useState<Record<string, string>>({});
  const {getLabels} = useDirectus();

  const fetch = useCallback(async () => {
    const result = await getLabels();
    setLabels(result);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetch().then();
  }, [fetch])

  return labels;
}
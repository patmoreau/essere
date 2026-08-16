import type { Directus } from './directus.ts';

export type DirectusResource<T> = {
  /** Starts the request (or returns the in-flight one) without reading it. */
  preload: (directus: Directus) => Promise<T>;
  /** The cached promise for this instance, for `use()` inside a component. */
  load: (directus: Directus) => Promise<T>;
};

/**
 * Caches one collection request per Directus instance, so a component reading it
 * and a boot-time preload share the same promise instead of firing twice.
 */
export const createDirectusResource = <T>(
  request: (directus: Directus) => Promise<T>,
): DirectusResource<T> => {
  const requests = new WeakMap<Directus, Promise<T>>();

  const load = (directus: Directus): Promise<T> => {
    let promise = requests.get(directus);

    if (!promise) {
      promise = request(directus);
      requests.set(directus, promise);
    }

    return promise;
  };

  return { preload: load, load: load };
};

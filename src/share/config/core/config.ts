export type Config = {
    DIRECTUS_URL: string;
};

const load = async (): Promise<Config> => {
    const response = await fetch('/config.json');
    return await response.json();
};

export const Config = {
    load: load,
};
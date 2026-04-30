import {createContext} from "react";
import type {Directus} from "../core/directus.ts";

export const DirectusContext = createContext<Directus | undefined>(undefined);
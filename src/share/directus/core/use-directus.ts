import {useContext} from "react";
import {DirectusContext} from "../ui/DirectusContext.tsx";
import type {Directus} from "./directus.ts";

export const useDirectus = (): Directus => {
  return useContext(DirectusContext)!;
};
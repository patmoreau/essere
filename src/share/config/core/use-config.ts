import type {Config} from "./config.ts";
import {useContext} from "react";
import {ConfigContext} from "../ui/ConfigContext.tsx";

export const useConfig = (): Config => {
  return useContext(ConfigContext)!;
};
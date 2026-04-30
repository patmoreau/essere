import {createContext} from "react";
import type {Config} from "../core/config";

export const ConfigContext = createContext<Config | undefined>(undefined);
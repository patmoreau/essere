import {type ReactNode} from "react";
import type {Config} from "../core/config.ts";
import {ConfigContext as ConfigContext1} from "./ConfigContext";

export const ConfigProvider = ({ children, config }: { children: ReactNode, config: Config }) => {
  return (
    <ConfigContext1 value={config}>
      {children}
    </ConfigContext1>
  );
};
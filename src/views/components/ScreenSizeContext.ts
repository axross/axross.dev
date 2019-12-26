import { createContext } from "react";

export enum ScreenSize {
  mobile,
  laptop,
}

export default createContext<ScreenSize>(null as any);

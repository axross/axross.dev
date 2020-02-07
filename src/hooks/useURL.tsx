import * as React from "react";

export const URLContext = React.createContext<URL>(null as any);

export default function useURL(): URL {
  return React.useContext(URLContext);
}

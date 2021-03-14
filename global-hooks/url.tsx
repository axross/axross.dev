import * as React from "react";

export const OriginContext = React.createContext<string>("");

export type OriginProviderProps = React.PropsWithChildren<
  React.Attributes & {
    origin: string;
  }
>;

export function OriginProvider({ origin, children }: OriginProviderProps) {
  return (
    <OriginContext.Provider value={origin}>{children}</OriginContext.Provider>
  );
}

export function useOrigin() {
  if (globalThis.location?.href) {
    return globalThis.location.origin;
  }

  return React.useContext(OriginContext);
}

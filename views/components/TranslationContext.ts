import * as React from "react";

const TranslationContext = React.createContext<Record<string, string>>(
  undefined as any
);

export default TranslationContext;

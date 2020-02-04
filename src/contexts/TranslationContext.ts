import * as React from "react";

interface TranslationContextData {
  translation: Record<string, string> | null;
  isLoading: boolean;
}

export default React.createContext<TranslationContextData>(null as any);

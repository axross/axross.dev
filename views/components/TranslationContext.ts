import * as React from "react";
import Translation from "../../translations/Translation";

const TranslationContext = React.createContext<Translation>(undefined as any);

export default TranslationContext;

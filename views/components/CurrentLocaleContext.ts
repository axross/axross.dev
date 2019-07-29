import * as React from "react";
import LocaleString from "../../entities/LocaleString";

const CurrentLocaleContext = React.createContext<LocaleString>(
  undefined as any
);

export default CurrentLocaleContext;

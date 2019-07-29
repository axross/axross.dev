import * as React from "react";
import LocaleString from "../../entities/LocaleString";

const AvailableLocalesContext = React.createContext<LocaleString[]>(
  undefined as any
);

export default AvailableLocalesContext;

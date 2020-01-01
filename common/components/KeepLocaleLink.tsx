import * as React from "react";
import LocaleContext from "../contexts/LocaleContext";
import Link, { Props as LinkProps } from "./Link";

interface Props extends Omit<LinkProps, "to"> {
  to: string;
  children?: any;
}

export default function KeepLocaleLink(props: Props) {
  const { currentLocale } = React.useContext(LocaleContext);
  const toURL = new URL(props.to, "https://example.com");

  toURL.searchParams.set("hl", currentLocale);

  return (
    <Link
      {...{
        ...props,
        to: toURL.pathname + toURL.search
      }}
    />
  );
}

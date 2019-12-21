import * as React from "react";
import LocaleContext from "../contexts/LocaleContext";
import Link, { Props as LinkProps } from "./Link";

interface Props extends Omit<Omit<LinkProps, "href">, "as"> {
  href: string;
  as: string;
  children?: any;
}

export default function KeepLocaleLink(props: Props) {
  const { currentLocale } = React.useContext(LocaleContext);
  const hrefURL = new URL(props.href, "https://example.com");
  const asURL = new URL(props.as, "https://example.com");

  hrefURL.searchParams.set("hl", currentLocale);
  asURL.searchParams.set("hl", currentLocale);

  return (
    <Link
      {...{
        ...props,
        href: hrefURL.pathname + hrefURL.search,
        as: asURL.pathname + asURL.search
      }}
    />
  );
}

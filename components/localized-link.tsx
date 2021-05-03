import Link, { LinkProps } from "next/link";
import * as React from "react";
import { useRouter } from "../hooks/router";

interface LocalizedLinkProps extends LinkProps {
  href: string;
  as: string;
}

export const LocalizedLink: React.FC<LocalizedLinkProps> = ({
  href,
  as,
  locale,
  ...props
}) => {
  const { url: currentUrl, locale: currentLocale } = useRouter();
  const hrefUrl = React.useMemo(() => {
    const pathname = href.startsWith("/[locale]") ? href : `/[locale]${href}`;
    const url = new URL(pathname, currentUrl.origin);

    return url;
  }, [currentUrl.origin, href]);
  const asUrl = React.useMemo(() => {
    const pathname = /^\/[a-z]{2}-[a-z]{2}/.test(as)
      ? `/${locale ?? currentLocale}${as.substring(6)}`
      : `/${locale ?? currentLocale}${as}`;
    const url = new URL(pathname, currentUrl.origin);

    return url;
  }, [currentUrl.origin, as, currentLocale, locale]);

  return (
    <Link
      href={{
        pathname: hrefUrl.pathname,
        search: hrefUrl.search,
        hash: hrefUrl.hash,
      }}
      as={{
        pathname: asUrl.pathname,
        search: asUrl.search,
        hash: asUrl.hash,
      }}
      {...props}
    />
  );
};

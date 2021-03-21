import Link, { LinkProps } from "next/link";
import * as React from "react";
import { useIntl } from "react-intl";

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
  const intl = useIntl();
  const hrefUrl = React.useMemo(() => {
    const url = new URL(as, "https://dummy.kohei.dev");
    url.searchParams.set(
      "hl",
      typeof locale === "string" ? locale : intl.locale
    );

    return url;
  }, [href, intl.locale]);
  const asUrl = React.useMemo(() => {
    const url = new URL(as, "https://dummy.kohei.dev");
    url.searchParams.set(
      "hl",
      typeof locale === "string" ? locale : intl.locale
    );

    return url;
  }, [as, intl.locale]);

  return (
    <Link
      href={{
        pathname: hrefUrl.pathname,
        search: hrefUrl.search,
        hash: hrefUrl.hash,
      }}
      as={{ pathname: asUrl.pathname, search: asUrl.search, hash: asUrl.hash }}
      {...props}
    />
  );
};

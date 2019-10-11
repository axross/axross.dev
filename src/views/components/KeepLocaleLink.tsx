import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import * as querystring from "querystring";
import * as React from "react";

interface Props extends Omit<Omit<LinkProps, "href">, "as"> {
  href: string;
  as: string;
  children?: any;
}

function KeepLocaleLink(props: Props) {
  const router = useRouter();
  const hl = router.query.hl;

  if (!hl) {
    return <Link {...props} />;
  }

  const [hrefPath, hrefQuery] = props.href.split("?");
  const _href =
    hrefPath +
    "?" +
    querystring.stringify({ ...querystring.parse(hrefQuery), hl });
  const [asPath, asQuery] = props.as.split("?");
  const _as =
    asPath + "?" + querystring.stringify({ ...querystring.parse(asQuery), hl });

  return <Link {...{ ...props, href: _href, as: _as }} />;
}

export default KeepLocaleLink;

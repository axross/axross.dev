import * as React from "react";
import { Helmet } from "react-helmet";

interface Props extends React.Attributes {
  href: string;
}

export default function LazyCSS({ href, ...props }: Props) {
  const [_href, setHref] = React.useState<string | null>(null);

  React.useEffect(() => {
    setHref(href);

    return () => {};
  }, [href]);

  if (_href === null) return null;

  return (
    <Helmet>
      <link href={_href} rel="stylesheet" {...props} />
    </Helmet>
  );
}

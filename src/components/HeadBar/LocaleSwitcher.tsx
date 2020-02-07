import * as React from "react";
import useLocale from "../../hooks/useLocale";
import ActualLocaleSwitcher from "./LocaleSwitcher/ActualLocaleSwitcher";
import LocaleSwitcherLoader from "./LocaleSwitcher/LocaleSwitcherLoader";

interface Props extends React.Attributes {
  className?: string;
}

export default function LocaleSwitcher(props: Props) {
  const { isLoading: isLocaleLoading } = useLocale();

  if (isLocaleLoading) {
    return <LocaleSwitcherLoader {...props} />;
  }

  return (
    <ActualLocaleSwitcher {...props} />
  );
}

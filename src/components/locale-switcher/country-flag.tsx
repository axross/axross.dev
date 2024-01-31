import { type ComponentPropsWithoutRef, type JSX } from "react";
import { AmericanFlag } from "./american-flag";
import { CanadianFlag } from "./canadian-flag";
import { JapaneseFlag } from "./japanese-flag";

function CountryFlag({
  country,
  ...props
}: ComponentPropsWithoutRef<"svg"> & {
  readonly country: "america" | "canada" | "japan";
}): JSX.Element {
  if (country === "canada") {
    return <CanadianFlag {...props} />;
  }

  if (country === "japan") {
    return <JapaneseFlag {...props} />;
  }

  return <AmericanFlag {...props} />;
}

export { CountryFlag };

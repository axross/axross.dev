import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from "react";
import { getTranslation } from "~/helpers/translation.server";
import { TwoColumnLayoutAside as ClientTwoColumnLayoutAside } from "./two-column-layout-aside.client";

const TwoColumnLayoutAside = forwardRef<
  ElementRef<typeof ClientTwoColumnLayoutAside>,
  Omit<
    ComponentPropsWithoutRef<typeof ClientTwoColumnLayoutAside>,
    "closeButtonLabel" | "openButtonLabel"
  >
>(async (props, ref) => {
  const { t } = await getTranslation();

  return (
    <ClientTwoColumnLayoutAside
      openButtonLabel={t("Open")}
      closeButtonLabel={t("Close")}
      {...props}
      ref={ref}
    />
  );
});

TwoColumnLayoutAside.displayName = "TwoColumnLayoutAside";

export { TwoColumnLayoutAside };

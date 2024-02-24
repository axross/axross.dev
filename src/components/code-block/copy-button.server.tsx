import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from "react";
import { getTranslation } from "~/helpers/translation.server";
import { CopyButton as ClientCopyButton } from "./copy-button.client";

const CopyButton = forwardRef<
  ElementRef<typeof ClientCopyButton>,
  Omit<
    ComponentPropsWithoutRef<typeof ClientCopyButton>,
    "children" | "doneChildren" | "loadingChildren"
  > & {
    readonly value: string;
  }
>(async (props, ref) => {
  const { t } = await getTranslation();

  return (
    <ClientCopyButton
      loadingChildren={t("Copying...")}
      doneChildren={t("Copied!")}
      {...props}
      ref={ref}
    >
      {t("Copy")}
    </ClientCopyButton>
  );
});

CopyButton.displayName = "CopyButton";

export { CopyButton };

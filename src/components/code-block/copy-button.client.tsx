"use client";

import { CheckCircleIcon, ClipboardIcon } from "@heroicons/react/24/outline";
import { clsx } from "clsx";
import { type ComponentPropsWithoutRef, type JSX } from "react";
import { ActionButton } from "~/components/action-button";
import { useTranslation } from "~/helpers/translation.client";

function CopyButton({
  value,
  className,
  ...props
}: Omit<
  ComponentPropsWithoutRef<typeof ActionButton>,
  | "action"
  | "finishedChildren"
  | "finishedIcon"
  | "icon"
  | "intent"
  | "loadingChildren"
  | "variant"
> & {
  readonly value: string;
}): JSX.Element {
  const { t } = useTranslation();

  return (
    <ActionButton
      variant="ghost"
      intent="neutral"
      icon={ClipboardIcon}
      loadingChildren={t("Copying...")}
      doneIcon={CheckCircleIcon}
      doneChildren={t("Copied!")}
      action={() => {
        return globalThis.navigator.clipboard.writeText(value);
      }}
      className={className}
      {...props}
    >
      {t("Copy")}
    </ActionButton>
  );
}

export { CopyButton };

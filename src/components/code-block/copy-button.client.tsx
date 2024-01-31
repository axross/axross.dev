"use client";

import { CheckCircleIcon, ClipboardIcon } from "@heroicons/react/24/outline";
import { clsx } from "clsx";
import { type ComponentPropsWithoutRef, type JSX } from "react";
import { ActionButton } from "~/components/action-button";

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
  return (
    <ActionButton
      variant="ghost"
      intent="neutral"
      icon={ClipboardIcon}
      loadingChildren="Copying..."
      doneIcon={CheckCircleIcon}
      doneChildren="Copied!"
      action={() => {
        return globalThis.navigator.clipboard.writeText(value);
      }}
      className={clsx(
        "data-[variant=ghost]:data-[intent=neutral]:text-white data-[variant=ghost]:data-[intent=neutral]:hover:bg-gray-200/10",
        className,
      )}
      {...props}
    >
      {"Copy"}
    </ActionButton>
  );
}

export { CopyButton };

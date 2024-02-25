"use client";

import { CheckCircleIcon, ClipboardIcon } from "@heroicons/react/24/outline";
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
  useCallback,
} from "react";
import { ActionButton } from "~/components/action-button";

const CopyButton = forwardRef<
  ElementRef<typeof ActionButton>,
  Omit<
    ComponentPropsWithoutRef<typeof ActionButton>,
    "action" | "doneIcon" | "icon" | "intent" | "variant"
  > & {
    readonly value: string;
  }
>(
  (
    { loadingChildren, doneChildren, value, className, children, ...props },
    ref,
  ) => {
    const action = useCallback(() => {
      return globalThis.navigator.clipboard.writeText(value);
    }, [value]);

    return (
      <ActionButton
        variant="ghost"
        intent="neutral"
        icon={ClipboardIcon}
        loadingChildren={loadingChildren}
        doneIcon={CheckCircleIcon}
        doneChildren={doneChildren}
        action={action}
        className={className}
        ref={ref}
        {...props}
      >
        {children}
      </ActionButton>
    );
  },
);

CopyButton.displayName = "CopyButton";

export { CopyButton };

"use client";

import { CheckIcon } from "@heroicons/react/24/outline";
import { ItemIndicator as RadixSelectItemIndicator } from "@radix-ui/react-select";
import { clsx } from "clsx";
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from "react";
import css from "./select-item-indicator.module.css";

const SelectItemIndicator = forwardRef<
  ElementRef<typeof RadixSelectItemIndicator>,
  Omit<ComponentPropsWithoutRef<typeof RadixSelectItemIndicator>, "children">
>(({ className, ...props }, ref) => {
  return (
    <RadixSelectItemIndicator
      ref={ref}
      className={clsx(css.root, className)}
      {...props}
    >
      <CheckIcon className={css.icon} />
    </RadixSelectItemIndicator>
  );
});

SelectItemIndicator.displayName = RadixSelectItemIndicator.displayName;

export { SelectItemIndicator };

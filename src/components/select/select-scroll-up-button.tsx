"use client";

import { ChevronUpIcon } from "@heroicons/react/24/outline";
import { ScrollUpButton as RadixSelectScrollUpButton } from "@radix-ui/react-select";
import { clsx } from "clsx";
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from "react";
import css from "./select-scroll-up-button.module.css";

const SelectScrollUpButton = forwardRef<
  ElementRef<typeof RadixSelectScrollUpButton>,
  ComponentPropsWithoutRef<typeof RadixSelectScrollUpButton>
>(({ className, ...props }, ref) => {
  return (
    <RadixSelectScrollUpButton
      ref={ref}
      className={clsx(css.root, className)}
      {...props}
    >
      <ChevronUpIcon className={css.icon} />
    </RadixSelectScrollUpButton>
  );
});

SelectScrollUpButton.displayName = RadixSelectScrollUpButton.displayName;

export { SelectScrollUpButton };

"use client";

import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { ScrollDownButton as RadixSelectScrollDownButton } from "@radix-ui/react-select";
import { clsx } from "clsx";
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from "react";
import css from "./select-scroll-down-button.module.css";

const SelectScrollDownButton = forwardRef<
  ElementRef<typeof RadixSelectScrollDownButton>,
  ComponentPropsWithoutRef<typeof RadixSelectScrollDownButton>
>(({ className, ...props }, ref) => {
  return (
    <RadixSelectScrollDownButton
      ref={ref}
      className={clsx(css.root, className)}
      {...props}
    >
      <ChevronDownIcon className={css.icon} />
    </RadixSelectScrollDownButton>
  );
});

SelectScrollDownButton.displayName = RadixSelectScrollDownButton.displayName;

export { SelectScrollDownButton };

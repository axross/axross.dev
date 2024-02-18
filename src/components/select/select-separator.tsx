"use client";

import { Separator as RadixSelectSeparator } from "@radix-ui/react-select";
import { clsx } from "clsx";
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from "react";
import css from "./select-separator.module.css";

const SelectSeparator = forwardRef<
  ElementRef<typeof RadixSelectSeparator>,
  ComponentPropsWithoutRef<typeof RadixSelectSeparator>
>(({ className, ...props }, ref) => {
  return (
    <RadixSelectSeparator
      ref={ref}
      className={clsx(css.root, className)}
      {...props}
    />
  );
});

SelectSeparator.displayName = RadixSelectSeparator.displayName;

export { SelectSeparator };

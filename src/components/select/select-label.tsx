"use client";

import { Label as RadixSelectLabel } from "@radix-ui/react-select";
import { clsx } from "clsx";
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from "react";
import css from "./select-label.module.css";

const SelectLabel = forwardRef<
  ElementRef<typeof RadixSelectLabel>,
  ComponentPropsWithoutRef<typeof RadixSelectLabel>
>(({ className, ...props }, ref) => {
  return (
    <RadixSelectLabel
      ref={ref}
      className={clsx(css.root, className)}
      {...props}
    />
  );
});

SelectLabel.displayName = RadixSelectLabel.displayName;

export { SelectLabel };

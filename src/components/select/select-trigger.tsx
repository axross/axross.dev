"use client";

import { Trigger as RadixSelectTrigger } from "@radix-ui/react-select";
import { clsx } from "clsx";
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from "react";
import css from "./select-trigger.module.css";

const SelectTrigger = forwardRef<
  ElementRef<typeof RadixSelectTrigger>,
  ComponentPropsWithoutRef<typeof RadixSelectTrigger>
>(({ className, children, ...props }, ref) => {
  return (
    <RadixSelectTrigger
      ref={ref}
      className={clsx(css.root, className)}
      {...props}
    >
      {children}
    </RadixSelectTrigger>
  );
});

SelectTrigger.displayName = RadixSelectTrigger.displayName;

export { SelectTrigger };

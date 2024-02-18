"use client";

import { Viewport as RadixSelectViewport } from "@radix-ui/react-select";
import { clsx } from "clsx";
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from "react";
import css from "./select-viewport.module.css";

const SelectViewport = forwardRef<
  ElementRef<typeof RadixSelectViewport>,
  ComponentPropsWithoutRef<typeof RadixSelectViewport>
>(({ className, children, ...props }, ref) => {
  return (
    <RadixSelectViewport
      className={clsx(css.root, className)}
      ref={ref}
      {...props}
    >
      {children}
    </RadixSelectViewport>
  );
});

SelectViewport.displayName = RadixSelectViewport.displayName;

export { SelectViewport };

"use client";

import { Content as RadixSelectContent } from "@radix-ui/react-select";
import { clsx } from "clsx";
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from "react";
import css from "./select-content.module.css";

const SelectContent = forwardRef<
  ElementRef<typeof RadixSelectContent>,
  ComponentPropsWithoutRef<typeof RadixSelectContent>
>(({ className, children, position = "popper", ...props }, ref) => {
  return (
    <RadixSelectContent
      ref={ref}
      className={clsx(css.root, className)}
      position={position}
      data-position={position}
      {...props}
    >
      {children}
    </RadixSelectContent>
  );
});

SelectContent.displayName = RadixSelectContent.displayName;

export { SelectContent };

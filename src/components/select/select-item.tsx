"use client";

import { Item as RadixSelectItem } from "@radix-ui/react-select";
import { clsx } from "clsx";
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from "react";
import css from "./select-item.module.css";

const SelectItem = forwardRef<
  ElementRef<typeof RadixSelectItem>,
  ComponentPropsWithoutRef<typeof RadixSelectItem>
>(({ className, children, ...props }, ref) => {
  return (
    <RadixSelectItem ref={ref} className={clsx(css.root, className)} {...props}>
      {children}
    </RadixSelectItem>
  );
});

SelectItem.displayName = RadixSelectItem.displayName;

export { SelectItem };

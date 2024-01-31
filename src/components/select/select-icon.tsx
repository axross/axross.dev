"use client";

import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Icon as RadixSelectIcon } from "@radix-ui/react-select";
import { clsx } from "clsx";
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from "react";
import css from "./select-icon.module.css";

const SelectIcon = forwardRef<
  ElementRef<typeof RadixSelectIcon>,
  Omit<ComponentPropsWithoutRef<typeof RadixSelectIcon>, "asChild" | "children">
>(({ className, ...props }, ref) => {
  return (
    <RadixSelectIcon
      asChild
      ref={ref}
      className={clsx(css.root, className)}
      {...props}
    >
      <ChevronDownIcon />
    </RadixSelectIcon>
  );
});

SelectIcon.displayName = RadixSelectIcon.displayName;

export { SelectIcon };

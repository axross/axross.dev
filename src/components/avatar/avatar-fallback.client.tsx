"use client";

import { AvatarFallback as RadixAvatarFallback } from "@radix-ui/react-avatar";
import { clsx } from "clsx";
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from "react";
import css from "./avatar-fallback.module.css";

const AvatarFallback = forwardRef<
  ElementRef<typeof RadixAvatarFallback>,
  ComponentPropsWithoutRef<typeof RadixAvatarFallback>
>(({ className, ...props }, ref) => {
  return (
    <RadixAvatarFallback
      ref={ref}
      className={clsx(css.root, className)}
      {...props}
    />
  );
});

AvatarFallback.displayName = RadixAvatarFallback.displayName;

export { AvatarFallback };

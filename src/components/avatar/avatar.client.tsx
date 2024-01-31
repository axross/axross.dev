"use client";

import { Root as RadixAvatarRoot } from "@radix-ui/react-avatar";
import { clsx } from "clsx";
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from "react";
import css from "./avatar.module.css";

const Avatar = forwardRef<
  ElementRef<typeof RadixAvatarRoot>,
  ComponentPropsWithoutRef<typeof RadixAvatarRoot>
>(({ className, ...props }, ref) => {
  return (
    <RadixAvatarRoot
      ref={ref}
      className={clsx(css.root, className)}
      {...props}
    />
  );
});

Avatar.displayName = RadixAvatarRoot.displayName;

export { Avatar };

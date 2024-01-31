"use client";

import { AvatarImage as RadixAvatarImage } from "@radix-ui/react-avatar";
import { clsx } from "clsx";
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from "react";
import css from "./avatar-image.module.css";

const AvatarImage = forwardRef<
  ElementRef<typeof RadixAvatarImage>,
  ComponentPropsWithoutRef<typeof RadixAvatarImage>
>(({ className, ...props }, ref) => {
  return (
    <RadixAvatarImage
      ref={ref}
      className={clsx(css.root, className)}
      {...props}
    />
  );
});

AvatarImage.displayName = RadixAvatarImage.displayName;

export { AvatarImage };

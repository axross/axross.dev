"use client";

import {
  AvatarFallback as RadixAvatarFallback,
  AvatarImage as RadixAvatarImage,
  Root as RadixAvatarRoot,
} from "@radix-ui/react-avatar";
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from "react";
import { twMerge } from "tailwind-merge";

const Avatar = forwardRef<
  ElementRef<typeof RadixAvatarRoot>,
  ComponentPropsWithoutRef<typeof RadixAvatarRoot>
>(({ className, ...props }, ref) => {
  return (
    <RadixAvatarRoot
      ref={ref}
      className={twMerge(
        "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
        className
      )}
      {...props}
    />
  );
});

Avatar.displayName = RadixAvatarRoot.displayName;

const AvatarImage = forwardRef<
  ElementRef<typeof RadixAvatarImage>,
  ComponentPropsWithoutRef<typeof RadixAvatarImage>
>(({ className, ...props }, ref) => {
  return (
    <RadixAvatarImage
      ref={ref}
      className={twMerge("aspect-square h-full w-full", className)}
      {...props}
    />
  );
});

AvatarImage.displayName = RadixAvatarImage.displayName;

const AvatarFallback = forwardRef<
  ElementRef<typeof RadixAvatarFallback>,
  ComponentPropsWithoutRef<typeof RadixAvatarFallback>
>(({ className, ...props }, ref) => {
  return (
    <RadixAvatarFallback
      ref={ref}
      className={twMerge(
        "bg-muted flex h-full w-full items-center justify-center rounded-full",
        className
      )}
      {...props}
    />
  );
});

AvatarFallback.displayName = RadixAvatarFallback.displayName;

export { Avatar, AvatarImage, AvatarFallback };

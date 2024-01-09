"use client";

import { CheckIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import {
  Content as RadixSelectContent,
  Group as RadixSelectGroup,
  Icon as RadixSelectIcon,
  Item as RadixSelectItem,
  ItemIndicator as RadixSelectItemIndicator,
  ItemText as RadixSelectItemText,
  Label as RadixSelectLabel,
  Portal as RadixSelectPortal,
  Root as RadixSelectRoot,
  Separator as RadixSelectSeparator,
  Trigger as RadixSelectTrigger,
  Value as RadixSelectValue,
  Viewport as RadixSelectViewport,
} from "@radix-ui/react-select";
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from "react";
import { twMerge } from "tailwind-merge";

const Select = RadixSelectRoot;

const SelectGroup = RadixSelectGroup;

const SelectValue = RadixSelectValue;

const SelectTrigger = forwardRef<
  ElementRef<typeof RadixSelectTrigger>,
  ComponentPropsWithoutRef<typeof RadixSelectTrigger>
>(({ className, children, ...props }, ref) => {
  return (
    <RadixSelectTrigger
      ref={ref}
      className={twMerge(
        "flex h-10 w-full items-center justify-between rounded-md border border-gray-950/10 hover:border-gray-950/20 focus-visible:border-gray-950/20 dark:border-white/10 bg-white/75 backdrop-blur-xl dark:bg-white/5 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      {children}

      <RadixSelectIcon asChild>
        <ChevronDownIcon className="h-4 w-4 opacity-50" />
      </RadixSelectIcon>
    </RadixSelectTrigger>
  );
});

SelectTrigger.displayName = RadixSelectTrigger.displayName;

const SelectContent = forwardRef<
  ElementRef<typeof RadixSelectContent>,
  ComponentPropsWithoutRef<typeof RadixSelectContent>
>(({ className, children, position = "popper", ...props }, ref) => {
  return (
    <RadixSelectPortal>
      <RadixSelectContent
        ref={ref}
        className={twMerge(
          "relative z-50 min-w-[8rem] overflow-hidden bg-white rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          position === "popper" &&
            "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          className
        )}
        position={position}
        {...props}
      >
        <RadixSelectViewport
          className={twMerge(
            "p-1",
            position === "popper" &&
              "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          )}
        >
          {children}
        </RadixSelectViewport>
      </RadixSelectContent>
    </RadixSelectPortal>
  );
});

SelectContent.displayName = RadixSelectContent.displayName;

const SelectLabel = forwardRef<
  ElementRef<typeof RadixSelectLabel>,
  ComponentPropsWithoutRef<typeof RadixSelectLabel>
>(({ className, ...props }, ref) => {
  return (
    <RadixSelectLabel
      ref={ref}
      className={twMerge("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}
      {...props}
    />
  );
});

SelectLabel.displayName = RadixSelectLabel.displayName;

const SelectItem = forwardRef<
  ElementRef<typeof RadixSelectItem>,
  ComponentPropsWithoutRef<typeof RadixSelectItem>
>(({ className, children, ...props }, ref) => {
  return (
    <RadixSelectItem
      ref={ref}
      className={twMerge(
        "relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-gray-950/5 focus:text-gray-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <RadixSelectItemIndicator>
          <CheckIcon className="h-4 w-4" />
        </RadixSelectItemIndicator>
      </span>

      <RadixSelectItemText>{children}</RadixSelectItemText>
    </RadixSelectItem>
  );
});

SelectItem.displayName = RadixSelectItem.displayName;

const SelectSeparator = forwardRef<
  ElementRef<typeof RadixSelectSeparator>,
  ComponentPropsWithoutRef<typeof RadixSelectSeparator>
>(({ className, ...props }, ref) => {
  return (
    <RadixSelectSeparator
      ref={ref}
      className={twMerge("-mx-1 my-1 h-px bg-muted", className)}
      {...props}
    />
  );
});

SelectSeparator.displayName = RadixSelectSeparator.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
};

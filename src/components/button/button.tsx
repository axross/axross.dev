import { Slot } from "@radix-ui/react-slot";
import { clsx } from "clsx";
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from "react";
import css from "./button.module.css";

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  readonly variant: "ghost" | "link" | "outline" | "solid";
  readonly intent: "danger" | "neutral";
  readonly size?: "md" | "sm";
  readonly asChild?: boolean;
};

const Button = forwardRef<ElementRef<"button">, ButtonProps>(
  (
    {
      className,
      variant,
      intent,
      size = "md",
      disabled = false,
      asChild = false,
      ...props
    },
    ref,
  ) => {
    const Component = asChild ? Slot : "button";

    return (
      <Component
        ref={ref}
        className={clsx(css.root, className)}
        aria-disabled={disabled ? true : undefined}
        data-variant={variant}
        data-intent={intent}
        data-size={size}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

export { Button };

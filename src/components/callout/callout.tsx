import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { clsx } from "clsx";
import {
  type ComponentPropsWithRef,
  type ComponentType,
  type ElementRef,
  forwardRef,
} from "react";
import css from "./callout.module.css";

const Callout = forwardRef<
  ElementRef<"div">,
  ComponentPropsWithRef<"div"> & {
    readonly intent: "danger" | "neutral";
    readonly icon?: ComponentType<{ className?: string }>;
  }
>(
  (
    {
      intent,
      icon: Icon = InformationCircleIcon,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        role="alert"
        data-intent={intent}
        className={clsx(css.root, className)}
        {...props}
      >
        <Icon className={css.icon} />

        {children}
      </div>
    );
  },
);

Callout.displayName = "Callout";

export { Callout };

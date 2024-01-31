import { clsx } from "clsx";
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from "react";
import css from "./two-column-layout.module.css";

const TwoColumnLayout = forwardRef<
  ElementRef<"div">,
  ComponentPropsWithoutRef<"div">
>(({ className, children, ...props }, ref) => {
  return (
    <div className={clsx(css.root, className)} ref={ref} {...props}>
      {children}
    </div>
  );
});

TwoColumnLayout.displayName = "TwoColumnLayout";

export { TwoColumnLayout };

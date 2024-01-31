import { clsx } from "clsx";
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from "react";
import css from "./two-column-layout-main.module.css";

const TwoColumnLayoutMain = forwardRef<
  ElementRef<"main">,
  ComponentPropsWithoutRef<"main">
>(({ className, children, ...props }, ref) => {
  return (
    <main className={clsx(css.root, className)} ref={ref} {...props}>
      {children}
    </main>
  );
});

TwoColumnLayoutMain.displayName = "TwoColumnLayoutMain";

export { TwoColumnLayoutMain };

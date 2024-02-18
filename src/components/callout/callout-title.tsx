import { clsx } from "clsx";
import { type ComponentPropsWithRef, type ElementRef, forwardRef } from "react";
import css from "./callout-title.module.css";

const CalloutTitle = forwardRef<ElementRef<"p">, ComponentPropsWithRef<"h5">>(
  ({ className, children, ...props }, ref) => {
    return (
      <h5 ref={ref} className={clsx(css.root, className)} {...props}>
        {children}
      </h5>
    );
  },
);

CalloutTitle.displayName = "CalloutTitle";

export { CalloutTitle };

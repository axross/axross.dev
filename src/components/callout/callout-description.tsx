import { clsx } from "clsx";
import { type ComponentPropsWithRef, type ElementRef, forwardRef } from "react";
import css from "./callout-description.module.css";

const CalloutDescription = forwardRef<
  ElementRef<"p">,
  ComponentPropsWithRef<"p">
>(({ className, ...props }, ref) => {
  return <div ref={ref} className={clsx(css.root, className)} {...props} />;
});

CalloutDescription.displayName = "CalloutDescription";

export { CalloutDescription };

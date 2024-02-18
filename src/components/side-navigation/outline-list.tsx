/* eslint @typescript-eslint/no-magic-numbers: ["error", { ignore: [1, 2, 3, 4, 5, 6] }] */

import { clsx } from "clsx";
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from "react";
import css from "./outline-list.module.css";

const OutlineList = forwardRef<
  ElementRef<"ul">,
  ComponentPropsWithoutRef<"ul">
>(({ className, children, ...props }, ref) => {
  return (
    <ul className={clsx(css.root, className)} ref={ref} {...props}>
      {children}
    </ul>
  );
});

OutlineList.displayName = "OutlineList";

export { OutlineList };

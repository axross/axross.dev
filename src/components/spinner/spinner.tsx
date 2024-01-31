import { clsx } from "clsx";
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from "react";
import css from "./spinner.module.css";

const Spinner = forwardRef<
  ElementRef<"svg">,
  ComponentPropsWithoutRef<"svg"> & {
    readonly strokeWidth?: string;
  }
>(({ strokeWidth = "3", className, ...props }, ref) => {
  // (c) Utkarsh Verma
  // this code is licensed under MIT license
  // see: https://github.com/n3r4zzurr0/svg-spinners
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={clsx(css.root, className)}
      ref={ref}
      {...props}
    >
      <g className={css.group}>
        <circle
          cx="12"
          cy="12"
          r="9.5"
          fill="none"
          strokeWidth={strokeWidth}
          className={css.circle}
        />
      </g>
    </svg>
  );
});

Spinner.displayName = "Spinner";

export { Spinner };

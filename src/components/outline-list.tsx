/* eslint @typescript-eslint/no-magic-numbers: ["error", { ignore: [1, 2, 3, 4, 5, 6] }] */

import Link from "next/link";
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from "react";
import { twMerge } from "tailwind-merge";

const OutlineList = forwardRef<
  ElementRef<"ul">,
  ComponentPropsWithoutRef<"ul">
>(({ className, children, ...props }, ref) => {
  return (
    <ul
      className={twMerge(
        "w-full list-none my-0 ps-0 text-gray-700 group/outline-list",
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </ul>
  );
});

OutlineList.displayName = "OutlineList";

const OutlineListItem = forwardRef<
  ElementRef<"li">,
  ComponentPropsWithoutRef<"li"> & {
    readonly level: number;
    readonly href: string;
  }
>(({ level, href, className, children, ...props }, ref) => {
  return (
    <li
      className={twMerge("block mb-0 group/outline-list-item", className)}
      ref={ref}
      {...props}
    >
      <Link
        href={href}
        prefetch={false}
        className={twMerge(
          "relative inline-block rounded-md text-current decoration-none transition-colors focus-visible:bg-gray-100 dark:focus-visible:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-900 align-top",
          level === 1 || level === 2 ? "py-1 ps-6 pe-4" : null,
          level === 3 ? "py-1 ps-8 pe-4" : null,
          level === 4 ? "py-1 ps-9 pe-4" : null,
          level === 5 ? "py-1 ps-10 pe-4" : null,
          level === 6 ? "py-1 ps-11 pe-4" : null
        )}
      >
        <div className="absolute block top-0 bottom-0 left-[0.6875rem] w-0.5 bg-gray-300 dark:bg-gray-700 group-last-of-type/outline-list-item:bottom-[50%]" />

        <div
          className={twMerge(
            "absolute block rounded-full bg-gray-300 dark:bg-gray-700 z-10",
            level <= 2
              ? "top-[0.5625rem] left-2 w-2 h-2"
              : "top-[0.5rem] left-[0.5625rem] w-1.5 h-1.5"
          )}
        />

        <div
          className={twMerge(
            "text-gray-900 dark:text-gray-100 leading-snug",
            level <= 2 ? "text-sm" : "text-xs"
          )}
        >
          {children}
        </div>
      </Link>
    </li>
  );
});

OutlineListItem.displayName = "OutlineListItem";

export { OutlineList, OutlineListItem };

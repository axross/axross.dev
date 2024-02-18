import { clsx } from "clsx";
import Link from "next/link";
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from "react";
import css from "./outline-list-item.module.css";

const OutlineListItem = forwardRef<
  ElementRef<"li">,
  ComponentPropsWithoutRef<"li"> & {
    readonly level: number;
    readonly href: string;
  }
>(({ level, href, className, children, ...props }, ref) => {
  return (
    <li
      data-level={level}
      className={clsx(css.root, className)}
      ref={ref}
      {...props}
    >
      <Link href={href} prefetch={false} className={css.link}>
        <div className={css.line} />

        <div className={css.disc} />

        <div className={css.contents}>{children}</div>
      </Link>
    </li>
  );
});

OutlineListItem.displayName = "OutlineListItem";

export { OutlineListItem };

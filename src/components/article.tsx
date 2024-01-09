import { type ComponentPropsWithoutRef, type JSX } from "react";
import { twMerge } from "tailwind-merge";

export function Article({
  className,
  children,
}: ComponentPropsWithoutRef<"article">): JSX.Element {
  return (
    <article
      className={twMerge("group/article prose dark:prose-invert", className)}
    >
      {children}
    </article>
  );
}

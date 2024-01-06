import { type ComponentPropsWithoutRef, type JSX } from "react";

export function Article({
  children,
}: ComponentPropsWithoutRef<"article">): JSX.Element {
  return (
    <article className="group/article prose dark:prose-invert">
      {children}
    </article>
  );
}

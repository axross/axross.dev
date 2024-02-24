import { clsx } from "clsx";
import { type ComponentPropsWithoutRef, type JSX } from "react";
import { CopyButton } from "~/components/code-block/copy-button.server";
import css from "./code-block.module.css";

function CodeBlock({
  code,
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"div"> & { readonly code: string }): JSX.Element {
  return (
    <div className={clsx(css.root, className)} {...props}>
      <pre className={css.viewer}>{children}</pre>

      <CopyButton value={code} size="sm" className={css["copy-button"]} />
    </div>
  );
}

export { CodeBlock };

import { css, cx } from "@linaria/core";
import * as React from "react";

export interface BadgeProps extends React.HTMLProps<HTMLSpanElement> {
  className?: string;
  style?: React.CSSProperties;
  children?: string;
}

export const Badge: React.VFC<BadgeProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <span
      className={cx(
        css`
          display: inline-block;
          padding-block-start: var(--space-xs);
          padding-block-end: var(--space-xs);
          padding-inline-start: var(--space-sm);
          padding-inline-end: var(--space-sm);
          background-color: var(--color-bg-input);
          border-radius: 4px;
          color: var(--color-fg);
          font-size: var(--font-size-xs);
          text-transform: uppercase;
        `,
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

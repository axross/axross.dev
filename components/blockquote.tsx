import { css, cx } from "@linaria/core";
import * as React from "react";

export interface BlockquoteProps extends React.Attributes {
  className?: string;
  style?: React.CSSProperties;
}

export const Blockquote: React.FC<BlockquoteProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <blockquote
      className={cx(
        css`
          position: relative;
          margin: 0;
          padding-block-start: calc(
            var(--font-size-md) * 1.5 + var(--space-sm)
          );
          padding-block-end: calc(var(--font-size-md) * 1.5 + var(--space-sm));
          line-height: 1.75;
          font-size: var(--font-size-md);
          font-style: italic;
        `,
        className
      )}
      {...props}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 508.044 508.044"
        className={css`
          position: absolute;
          top: 0;
          left: 0;
          width: calc(var(--font-size-md) * 1.5);
          height: calc(var(--font-size-md) * 1.5);
          fill: var(--color-fg-gray-weak);
        `}
      >
        <path d="M.108 352.536c0 66.794 54.144 120.938 120.937 120.938 66.794 0 120.938-54.144 120.938-120.938s-54.144-120.937-120.938-120.937c-13.727 0-26.867 2.393-39.168 6.61C109.093 82.118 230.814-18.543 117.979 64.303-7.138 156.17-.026 348.84.114 352.371c0 .055-.006.104-.006.165zM266.169 352.536c0 66.794 54.144 120.938 120.938 120.938s120.938-54.144 120.938-120.938S453.9 231.599 387.106 231.599c-13.728 0-26.867 2.393-39.168 6.61C375.154 82.118 496.875-18.543 384.04 64.303 258.923 156.17 266.034 348.84 266.175 352.371c0 .055-.006.104-.006.165z" />
      </svg>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 508.044 508.044"
        className={css`
          position: absolute;
          bottom: 0;
          right: 0;
          width: calc(var(--font-size-md) * 1.5);
          height: calc(var(--font-size-md) * 1.5);
          fill: var(--color-fg-gray-weak);
        `}
      >
        <path d="M507.93 155.673c0-.055.006-.11.006-.165 0-66.793-54.145-120.938-120.938-120.938S266.061 88.714 266.061 155.508c0 66.794 54.15 120.938 120.938 120.938 13.727 0 26.867-2.393 39.162-6.609-27.209 156.09-148.93 256.752-36.096 173.905C515.182 351.874 508.07 159.198 507.93 155.673zM120.938 276.445c13.727 0 26.867-2.393 39.168-6.609-27.216 156.09-148.937 256.752-36.102 173.905 125.117-91.867 118.006-284.543 117.865-288.068 0-.055.006-.11.006-.165 0-66.793-54.144-120.938-120.937-120.938C54.144 34.57 0 88.714 0 155.508c0 66.794 54.15 120.937 120.938 120.937z" />
      </svg>

      {children}
    </blockquote>
  );
};

import { css, cx } from "@linaria/core";
import * as React from "react";

export interface CalloutProps extends React.Attributes {
  variant?: CalloutVariant;
  className?: string;
  style?: React.CSSProperties;
}

export enum CalloutVariant {
  info = "info",
  warning = "warning",
}

export const Callout: React.FC<CalloutProps> = ({
  variant = CalloutVariant.info,
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={cx(
        css`
          position: relative;
          padding-block-start: calc(
            var(--space-lg) + var(--font-size-md) * 2 + var(--space-sm)
          );
          padding-block-end: var(--space-lg);
          padding-inline-start: var(--space-lg);
          padding-inline-end: var(--space-lg);
          line-height: 1.75;
          border-radius: 8px;
        `,
        BACKGROUND_COLORS[variant],
        QUOTE_COLORS[variant],
        className
      )}
      {...props}
    >
      {ICONS[variant]}

      {children}
    </div>
  );
};

const ICONS: Record<CalloutVariant, React.ReactElement> = {
  [CalloutVariant.info]: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
      className={css`
        position: absolute;
        top: var(--space-md);
        left: var(--space-lg);
        width: calc(var(--font-size-md) * 2);
        height: calc(var(--font-size-md) * 2);
        color: #54a0ff;
      `}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4M12 8h.01" />
    </svg>
  ),
  [CalloutVariant.warning]: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
      className={css`
        position: absolute;
        top: var(--space-md);
        left: var(--space-lg);
        width: calc(var(--font-size-md) * 2);
        height: calc(var(--font-size-md) * 2);
        color: #feca57;
      `}
    >
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01" />
    </svg>
  ),
};

const BACKGROUND_COLORS: Record<CalloutVariant, string> = {
  [CalloutVariant.info]: css`
    background-color: var(--color-bg-blue-weak);
  `,
  [CalloutVariant.warning]: css`
    background-color: var(--color-bg-yellow-weak);
  `,
};

const QUOTE_COLORS: Record<CalloutVariant, string> = {
  [CalloutVariant.info]: css`
    --quote-color: var(--color-fg-blue-weak);
  `,
  [CalloutVariant.warning]: css`
    --quote-color: var(--color-fg-yellow-weak);
  `,
};

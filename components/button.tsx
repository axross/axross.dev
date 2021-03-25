import { css, cx } from "@linaria/core";
import * as React from "react";
import type { IconProps } from "react-feather";

export enum ButtonVariant {
  default = "default",
  inverted = "inverted",
}

export enum ButtonSize {
  sm = "sm",
  md = "md",
  lg = "lg",
  xl = "xl",
}

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactElement<IconProps>;
  className?: string;
  style?: React.CSSProperties;
}

export const Button: React.FC<ButtonProps> = ({
  variant = ButtonVariant.default,
  size = ButtonSize.md,
  icon,
  className,
  children,
  ...props
}) => {
  return (
    <button
      className={cx(
        css`
          appearance: none;
          display: flex;
          align-items: center;
          justify-content: center;
          max-width: 100%;
          border: none;
          box-shadow: transparent 0 0 0 4px;
          color: var(--color-fg-strong);
          cursor: pointer;
          transition: background-color 150ms ease-in-out,
            box-shadow 300ms ease-in-out, color 300ms ease-in-out;

          &:focus {
            box-shadow: var(--color-fg-blue-weak) 0 0 0 4px;
            outline: none;
          }
        `,
        COLORS[variant],
        SIZES[size],
        className
      )}
      {...props}
    >
      {icon
        ? React.cloneElement(icon, {
            ...icon.props,
            className: cx(
              css`
                color: currentColor;
              `,
              ICON_SIZES[size],
              children
                ? css`
                    margin-inline-end: var(--space-sm);
                  `
                : null,
              icon.props.className
            ),
          })
        : null}

      <span
        className={cx(
          css`
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            overflow: hidden;
          `,
          TEXT_SIZES[size]
        )}
      >
        {children}
      </span>
    </button>
  );
};

const COLORS: Record<ButtonVariant, string> = {
  [ButtonVariant.default]: css`
    background-color: var(--color-bg-input);
    color: var(--color-fg-strong);

    &:hover,
    &:active {
      background-color: var(--color-bg-input-active);
    }
  `,
  [ButtonVariant.inverted]: css`
    background-color: var(--color-fg);
    color: var(--color-bg);

    &:hover,
    &:active {
      background-color: var(--color-fg-strong);
    }
  `,
};

const SIZES: Record<ButtonSize, string> = {
  [ButtonSize.sm]: css`
    height: 32px;
    padding-inline-start: var(--space-md);
    padding-inline-end: var(--space-md);
    border-radius: 8px;
  `,
  [ButtonSize.md]: css`
    height: 40px;
    padding-inline-start: var(--space-md);
    padding-inline-end: var(--space-md);
    border-radius: 8px;
  `,
  [ButtonSize.lg]: css`
    height: 48px;
    padding-inline-start: var(--space-lg);
    padding-inline-end: var(--space-lg);
    border-radius: 12px;
  `,
  [ButtonSize.xl]: css`
    height: 64px;
    padding-inline-start: var(--space-md);
    padding-inline-end: var(--space-md);
    border-radius: 16px;
  `,
};

const ICON_SIZES: Record<ButtonSize, string> = {
  [ButtonSize.sm]: css`
    width: 16px;
    height: 16px;
  `,
  [ButtonSize.md]: css`
    width: 20px;
    height: 20px;
  `,
  [ButtonSize.lg]: css`
    width: 20px;
    height: 20px;
  `,
  [ButtonSize.xl]: css`
    width: 32px;
    height: 32px;
  `,
};

const TEXT_SIZES: Record<ButtonSize, string> = {
  [ButtonSize.sm]: css`
    font-size: var(--font-size-sm);
  `,
  [ButtonSize.md]: css`
    font-size: var(--font-size-md);
  `,
  [ButtonSize.lg]: css`
    font-size: var(--font-size-md);
  `,
  [ButtonSize.xl]: css`
    font-size: var(--font-size-xxl);
  `,
};

import { css, cx } from "@linaria/core";
import * as React from "react";

export interface BalloonProps extends React.Attributes {
  className?: string;
  style?: React.CSSProperties;
}

export const Balloon: React.FC<BalloonProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={cx(
        css`
          position: relative;
          padding-block-end: 8px;
        `,
        className
      )}
      {...props}
    >
      <div
        className={css`
          position: absolute;
          top: calc(100% - 8px);
          left: var(--space-md);
          border-width: 8px;
          border-style: solid;
          border-color: var(--color-bg-gray-weak) transparent transparent
            transparent;
        `}
      />

      <div
        className={css`
          background-color: var(--color-bg-gray-weak);
          backdrop-filter: blur(8px);
          border-radius: 8px;
        `}
      >
        {children}
      </div>
    </div>
  );
};

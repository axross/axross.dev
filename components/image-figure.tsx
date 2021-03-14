import { css, cx } from "@linaria/core";
import NextImage from "next/image";
import * as React from "react";

export interface ImageFigureProps extends React.Attributes {
  caption: string;
  src: string;
  width: number;
  height: number;
  className?: string;
  style?: React.CSSProperties;
}

export const ImageFigure: React.VFC<ImageFigureProps> = ({
  caption,
  className,
  ...props
}) => {
  return (
    <figure
      className={cx(
        css`
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 0;
          padding: 0;
        `,
        className
      )}
    >
      <NextImage alt={caption} loading="lazy" {...props} />

      <figcaption
        className={css`
          margin-block-start: var(--space-sm);
          line-height: 1.5;
          color: var(--color-fg-weak);
          font-size: var(--font-size-xs);
        `}
      >
        {caption}
      </figcaption>
    </figure>
  );
};

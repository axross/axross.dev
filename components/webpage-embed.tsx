import { css, cx } from "@linaria/core";
import * as React from "react";
import {
  RAINBOW_ANCHOR_CSS,
  RAINBOW_HOVER_ANCHOR_CSS,
} from "../constants/style";

export interface WebpageEmbedProps extends React.Attributes {
  title: string;
  description: string;
  imageSrc: string;
  href: string;
  className?: string;
  style?: React.CSSProperties;
}

export const WebpageEmbed: React.VFC<WebpageEmbedProps> = ({
  title,
  description,
  imageSrc,
  href,
  className,
  ...props
}) => {
  const selfRef = React.useRef<HTMLAnchorElement>(null);

  return (
    <a
      href={href}
      ref={selfRef}
      className={cx(
        css`
          display: grid;
          grid-template-columns: auto 1fr;
          grid-template-rows: auto auto auto 1fr;
          grid-template-areas: "image title" "image description" "image url" "image .";
          column-gap: var(--space-md);
          padding-block-start: var(--space-md);
          padding-block-end: var(--space-md);
          padding-inline-start: var(--space-md);
          padding-inline-end: var(--space-md);
          background-color: var(--color-bg-gray-weak);
          border-radius: 8px;
          color: currentColor;
          text-decoration: none;
          cursor: pointer;
          transition: background 150ms ease-in-out 0ms;

          &:hover,
          &:focus,
          &:active {
            background: var(--color-bg-gray);

            ${titleRefCss} {
              ${RAINBOW_HOVER_ANCHOR_CSS}
            }
          }
        `,
        className
      )}
      {...props}
    >
      <img
        src={imageSrc}
        width={128}
        height={128}
        className={css`
          grid-area: image;
          object-fit: cover;
          border-radius: 4px;
        `}
      />

      <div
        className={cx(
          css`
            grid-area: title;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            line-height: 1.5;
            color: var(--color-fg-strong);
            font-size: var(--font-size-md);
            font-weight: bold;
            -webkit-line-clamp: 2;
            overflow: hidden;
            ${RAINBOW_ANCHOR_CSS}
          `,
          titleRefCss
        )}
      >
        {title}
      </div>

      <div
        className={css`
          grid-area: description;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          margin-block-start: var(--space-sm);
          line-height: 1.5;
          color: var(--color-fg);
          font-size: var(--font-size-sm);
          -webkit-line-clamp: 2;
          overflow: hidden;
        `}
      >
        {description}
      </div>

      <div
        className={css`
          grid-area: url;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          margin-block-start: var(--space-sm);
          line-height: 1.5;
          color: var(--color-fg-weak);
          font-size: var(--font-size-xs);
          -webkit-line-clamp: 1;
          overflow: hidden;
        `}
      >
        {href}
      </div>
    </a>
  );
};

const titleRefCss = css``;

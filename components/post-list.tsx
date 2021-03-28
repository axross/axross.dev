import { css, cx } from "@linaria/core";
import * as React from "react";
import {
  RAINBOW_ANCHOR_CSS,
  RAINBOW_HOVER_ANCHOR_CSS,
} from "../constants/style";
import { LocalizedLink } from "./localized-link";

export interface PostListProps extends React.Attributes {
  className?: string;
  style?: React.CSSProperties;
}

export const PostList: React.FC<PostListProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <nav className={cx(css``, className)} {...props}>
      <ul
        className={css`
          list-style-type: none;
          margin-block-start: var(--space-md);
          margin-block-start: 0;
          margin-block-end: 0;
          padding-inline-start: 0;
          padding-inline-end: 0;
        `}
      >
        {children}
      </ul>
    </nav>
  );
};

export interface PostListItemProps extends React.Attributes {
  href: string;
  as: string;
  tableOfContents?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const PostListItem: React.FC<PostListItemProps> = ({
  href,
  as,
  tableOfContents,
  className,
  children,
  ...props
}) => {
  return (
    <li
      className={cx(
        css`
          margin-block-end: 0;

          &:nth-of-type(n + 2) {
            margin-block-start: var(--space-sm);
          }
        `,
        className
      )}
      {...props}
    >
      <LocalizedLink href={href} as={as} passHref>
        <a
          className={css`
            display: block;
            padding-block-start: var(--space-sm);
            padding-block-end: var(--space-sm);
            padding-inline-start: var(--space-md);
            padding-inline-end: var(--space-md);
            border-radius: 4px;
            color: currentColor;
            text-decoration: none;
            transition: background-color 150ms ease-in-out 0ms;

            &:hover,
            &:focus,
            &:active {
              background-color: var(--color-bg-gray);
              outline: none;

              ${headingRefCss} {
                ${RAINBOW_HOVER_ANCHOR_CSS}
              }
            }
          `}
        >
          <h2
            className={cx(
              css`
                margin: 0;
                line-height: 1.5;
                font-size: var(--font-size-sm);

                ${RAINBOW_ANCHOR_CSS}
              `,
              headingRefCss
            )}
          >
            {children}
          </h2>
        </a>
      </LocalizedLink>

      {tableOfContents ? (
        <nav
          className={css`
            padding-inline-start: var(--space-md);
            font-size: var(--font-size-sm);
          `}
        >
          {tableOfContents}
        </nav>
      ) : null}
    </li>
  );
};

const headingRefCss = css``;

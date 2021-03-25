import { css, cx } from "@linaria/core";
import { useRouter } from "next/router";
import * as React from "react";
import {
  RAINBOW_ANCHOR_CSS,
  RAINBOW_HOVER_ANCHOR_CSS,
} from "../constants/style";
import { LocalizedLink } from "./localized-link";

export interface TableOfContentsProps extends React.Attributes {
  className?: string;
  style?: React.CSSProperties;
  children?:
    | React.ReactElement<TableOfContentsItemProps>
    | React.ReactElement<TableOfContentsItemProps>[];
}

export const TableOfContents: React.VFC<TableOfContentsProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <ul
      className={cx(
        css`
          width: 100%;
          list-style: none;
          margin-block-start: 0;
          margin-block-end: 0;
          padding-inline-start: 0;
          color: var(--color-fg);

          > *:last-child {
            ${borderRefCss} {
              bottom: 50%;
            }
          }
        `,
        className
      )}
      {...props}
    >
      {children}
    </ul>
  );
};

export interface TableOfContentsItemProps extends React.Attributes {
  level: number;
  targetId: string;
  className?: string;
  style?: React.CSSProperties;
  children: string;
}

export const TableOfContentsItem: React.VFC<TableOfContentsItemProps> = ({
  level,
  targetId,
  children,
  ...props
}) => {
  const { pathname, asPath } = useRouter();

  return (
    <li
      className={css`
        display: block;
        margin-block-end: 0;
      `}
      {...props}
    >
      <LocalizedLink
        href={pathname}
        as={`${asPath.split("#")[0]}#${targetId}`}
        prefetch={false}
        passHref
      >
        <a
          className={cx(
            css`
              position: relative;
              display: inline-block;
              border-radius: 4px;
              color: currentColor;
              text-decoration: none;
              transition: background-color 150ms ease-in-out 0ms;

              &:hover,
              &:focus {
                background-color: var(--color-bg-gray);
                outline: none;

                ${textRefCss} {
                  ${RAINBOW_HOVER_ANCHOR_CSS}
                }
              }
            `,
            [
              css`
                padding-block-start: var(--space-xs);
                padding-block-end: var(--space-xs);
                padding-inline-start: var(--space-lg);
                padding-inline-end: var(--space-md);
              `,
              css`
                padding-block-start: var(--space-xs);
                padding-block-end: var(--space-xs);
                padding-inline-start: var(--space-lg);
                padding-inline-end: var(--space-md);
              `,
              css`
                padding-block-start: calc(var(--space-xs) * 0.75);
                padding-block-end: calc(var(--space-xs) * 0.75);
                padding-inline-start: calc(var(--space-lg) + var(--space-sm));
                padding-inline-end: calc(var(--space-md) * 0.75);
              `,
              css`
                padding-block-start: calc(var(--space-xs) * 0.75);
                padding-block-end: calc(var(--space-xs) * 0.75);
                padding-inline-start: calc(
                  var(--space-lg) + var(--space-sm) * 2
                );
                padding-inline-end: calc(var(--space-md) * 0.75);
              `,
              css`
                padding-block-start: calc(var(--space-xs) * 0.75);
                padding-block-end: calc(var(--space-xs) * 0.75);
                padding-inline-start: calc(
                  var(--space-lg) + var(--space-sm) * 3
                );
                padding-inline-end: calc(var(--space-md) * 0.75);
              `,
              css`
                padding-block-start: calc(var(--space-xs) * 0.75);
                padding-block-end: calc(var(--space-xs) * 0.75);
                padding-inline-start: calc(
                  var(--space-lg) + var(--space-sm) * 4
                );
                padding-inline-end: calc(var(--space-md) * 0.75);
              `,
            ][level - 1]
          )}
        >
          <div
            className={cx(
              css`
                box-sizing: border-box;
                position: absolute;
                display: block;
                top: 0px;
                bottom: 0px;
                left: 11px;
                width: 2px;
                background: var(--color-fg-gray-weak);
              `,
              borderRefCss
            )}
          />

          <div
            className={cx(
              css`
                position: absolute;
                display: block;
                border-radius: 100%;
                background: var(--color-fg-gray);
                z-index: 1;
              `,
              level <= 2
                ? css`
                    top: 12px;
                    left: 8px;
                    width: 8px;
                    height: 8px;
                  `
                : css`
                    top: 9px;
                    left: 9px;
                    width: 6px;
                    height: 6px;
                  `
            )}
          />

          <div
            className={cx(
              css`
                display: -webkit-box;
                -webkit-box-orient: vertical;
                line-height: 1.5;
                overflow: hidden;
                ${RAINBOW_ANCHOR_CSS}
              `,
              level <= 2
                ? css`
                    font-size: calc(var(--font-size-sm) * 0.875);
                  `
                : css`
                    font-size: calc(var(--font-size-sm) * 0.75);
                  `,
              textRefCss
            )}
          >
            {children}
          </div>
        </a>
      </LocalizedLink>
    </li>
  );
};

export const borderRefCss = css``;

const textRefCss = css``;

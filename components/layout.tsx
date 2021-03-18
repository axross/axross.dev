import { css, cx } from "@linaria/core";
import * as React from "react";

export interface HorizontalListProps extends React.Attributes {
  columnGap?: string;
  rowGap?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactElement<any>[];
}

export const HorizontalList: React.VFC<HorizontalListProps> = ({
  columnGap = "var(--space-md)",
  rowGap = "var(--space-md)",
  children = [],
  style,
  ...props
}) => {
  return (
    <div {...props}>
      <ul
        className={cx(
          css`
            display: flex;
            flex-wrap: wrap;
            list-style: none;
            margin-block-start: 0;
            margin-block-end: 0;
            padding-inline-start: 0;
          `
        )}
        style={{
          marginBlockStart: `calc(${rowGap} * -1)`,
          marginInlineStart: `calc(${columnGap} * -1)`,
          ...style,
        }}
      >
        {React.Children.map(children, (child, index) => (
          <li
            className={css`
              /* flex-grow: 1;
              flex-shrink: 1; */
            `}
            style={{
              marginBlockStart: rowGap,
              marginInlineStart: columnGap,
            }}
            key={child.props.key ?? index}
          >
            {child}
          </li>
        ))}
      </ul>
    </div>
  );
};

export interface HorizontalGridProps extends React.Attributes {
  itemMinWidth: string;
  itemMaxWidth?: string;
  columns?: number;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactElement<any>[];
}

export const HorizontalGrid: React.VFC<HorizontalGridProps> = ({
  itemMinWidth,
  itemMaxWidth,
  columns,
  children = [],
  className,
  style,
  ...props
}) => {
  return (
    <ul
      className={cx(
        css`
          display: grid;
          column-gap: var(--space-md);
          row-gap: var(--space-md);
          list-style: none;
          margin-block-start: 0;
          margin-block-end: 0;
          padding-inline-start: 0;
        `,
        className
      )}
      style={{
        gridTemplateColumns: itemMaxWidth
          ? `repeat(${
              Number.isSafeInteger(columns) && columns! > 0
                ? `${columns}`
                : "auto-fill"
            }, minmax(0px, ${itemMinWidth}))`
          : `repeat(${
              Number.isSafeInteger(columns) && columns! > 0
                ? `${columns}`
                : "auto-fill"
            }, minmax(${itemMinWidth}, 1fr))`,
        ...style,
      }}
      {...props}
    >
      {React.Children.map(children, (child, index) => (
        <li key={child.props.key ?? index}>{child}</li>
      ))}
    </ul>
  );
};

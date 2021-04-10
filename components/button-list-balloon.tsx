import { css, cx } from "@linaria/core";
import * as React from "react";
import { IconProps } from "react-feather";
import { Balloon } from "./balloon";

export interface ButtonListBalloonProps extends React.Attributes {
  className?: string;
  style?: React.CSSProperties;
  children?:
    | React.ReactElement<ButtonListBaloonItemProps>
    | React.ReactElement<ButtonListBaloonItemProps>[];
}

export const ButtonListBalloon: React.VFC<ButtonListBalloonProps> = ({
  children,
  ...props
}) => {
  return (
    <Balloon {...props}>
      <ul
        className={css`
          display: flex;
          list-style: none;
          margin-block-start: 0;
          margin-block-end: 0;
          padding-inline-start: 0;
        `}
      >
        {React.Children.map(children, (child) => (
          <li>{child}</li>
        ))}
      </ul>
    </Balloon>
  );
};

export interface ButtonListBaloonItemProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactElement<IconProps>;
}

export const ButtonListBaloonItem: React.FC<ButtonListBaloonItemProps> = ({
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
          min-width: 48px;
          max-width: 256px;
          height: 48px;
          background-color: inherit;
          border: none;
          border-radius: 8px;
          cursor: pointer;

          :hover {
            background-color: var(--color-bg-gray);
          }
        `,
        children
          ? css`
              padding-inline-start: var(--space-md);
              padding-inline-end: var(--space-md);
            `
          : null,
        className
      )}
      {...props}
    >
      {icon
        ? React.cloneElement(icon, {
            ...icon.props,
            className: cx(
              css`
                width: 20px;
                height: 20px;
                color: var(--color-fg-strong);
              `,
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
        className={css`
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          color: var(--color-fg-strong);
          overflow: hidden;
        `}
      >
        {children}
      </span>
    </button>
  );
};

import { css, cx } from "@linaria/core";
import * as React from "react";
import {
  RAINBOW_ANCHOR_CSS,
  RAINBOW_HOVER_ANCHOR_CSS,
} from "../constants/style";

export interface ParrotAnchorProps
  extends React.AllHTMLAttributes<HTMLAnchorElement> {}

export const ParrotAnchor = React.forwardRef<
  HTMLAnchorElement,
  ParrotAnchorProps
>(({ className, ...props }, ref) => {
  return (
    <a
      ref={ref}
      className={cx(
        css`
          color: currentColor;
          text-decoration: none;
          cursor: pointer;
          ${RAINBOW_ANCHOR_CSS}

          &:hover,
          &:focus,
          &:active {
            ${RAINBOW_HOVER_ANCHOR_CSS}
          }

          &:focus {
            outline: none;
          }
        `,
        className
      )}
      tabIndex={0}
      {...props}
    />
  );
});

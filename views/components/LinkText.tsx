import styled from "@emotion/styled";
import * as React from "react";
import { FOREGROUND_COLORS, ForegroundColor } from "../constant/color";
import { DARK_MODE } from "../constant/mediaquery";
import Text, { TextColor, Props as TextProps } from "./Text";

interface Props extends Omit<TextProps, "color"> {
  href?: string;
}

const LinkText = React.forwardRef<HTMLElement, Props>((props, ref) => (
  <Root tag="a" color={TextColor.primary} ref={ref} {...props} />
));

const Root = styled(Text)`
  text-decoration: none;
  cursor: pointer;
  &:hover,
  &:active {
    color: ${FOREGROUND_COLORS.get(ForegroundColor.primaryHighlight)!.light};
    text-decoration: underline
      ${FOREGROUND_COLORS.get(ForegroundColor.primaryHighlight)!.light};

    ${DARK_MODE} {
      color: ${FOREGROUND_COLORS.get(ForegroundColor.primaryHighlight)!.dark};
      text-decoration: underline
        ${FOREGROUND_COLORS.get(ForegroundColor.primaryHighlight)!.dark};
    }
  }
`;

export default LinkText;

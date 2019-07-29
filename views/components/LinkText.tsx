import styled from "@emotion/styled";
import * as React from "react";
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
    color: ${TextColor.primaryHighlight};
    text-decoration: underline ${TextColor.primaryHighlight};
  }
`;

export default LinkText;

import styled from "@emotion/styled";
import * as React from "react";
import { LIGHT_COLOR, DARK_COLOR } from "../../../constant/color";
import { DARK_MODE, MOBILE } from "../../../constant/mediaQuery";
import ThemedColor from "../../../types/ThemedColor";
import Icon, { IconName } from "../../Icon";

interface Props extends React.Attributes {
  className?: string;
}

export default function FallbackImage({ ...props }: Props) {
  return (
    <Root {...props}>
      <_Icon name={IconName.website} fill={ThemedColor.secondaryForeground} />
    </Root>
  )
}

const Root = styled.div`
  box-sizing: border-box;
  padding: 32px;
  background-color: ${LIGHT_COLOR[ThemedColor.background]};
  border-radius: 8px;

  ${DARK_MODE} {
    background-color: ${DARK_COLOR[ThemedColor.background]};
  }

  ${MOBILE} {
    padding: 16px;
  }
`;

const _Icon = styled(Icon)`

`;

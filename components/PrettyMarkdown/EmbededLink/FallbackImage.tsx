import styled from "@emotion/styled";
import * as React from "react";
import {
  DARK_BACKGROUND_COLOR,
  LIGHT_BACKGROUND_COLOR,
} from "../../../constant/color";
import { DARK_MODE, MOBILE } from "../../../constant/mediaQuery";
import Icon, { IconColor, IconName } from "../../Icon";

interface Props extends React.Attributes {
  className?: string;
}

export default function FallbackImage({ ...props }: Props) {
  return (
    <Root {...props}>
      <_Icon name={IconName.website} fill={IconColor.secondaryForeground} />
    </Root>
  );
}

const Root = styled.div`
  box-sizing: border-box;
  padding: 32px;
  background-color: ${LIGHT_BACKGROUND_COLOR};
  border-radius: 8px;

  ${DARK_MODE} {
    background-color: ${DARK_BACKGROUND_COLOR};
  }

  ${MOBILE} {
    padding: 16px;
  }
`;

const _Icon = styled(Icon)``;

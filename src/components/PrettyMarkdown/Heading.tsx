import styled from "@emotion/styled";
import * as React from "react";
import { MOBILE } from "../../constant/mediaQuery";
import RawText, { Props as RawTextProps, TextSize, ThemedColor, Typeface } from "../RawText";
import RawTextThemeContext from "../RawTextThemeContext";

interface Props extends React.Attributes {
  className?: string;
  children: React.ReactNode;
}

interface InternalProps extends Props {
  Component: React.ComponentType;
  textProps: RawTextProps;
}

function Heading({ Component, textProps, children, ...props }: InternalProps) {
  const theme = React.useContext(RawTextThemeContext) ?? {};

  return (
    <Component {...props}>
      <RawTextThemeContext.Provider value={{
        ...theme,
        color: ThemedColor.emphasizedForeground,
        typeface: Typeface.headline,
        ...textProps,
      }}>
        {React.Children.map(children, child => typeof child === "string" ? <RawText>{child}</RawText> : child)}
      </RawTextThemeContext.Provider>
    </Component>
  )
}

export function Heading1(props: Props) {
  return <Heading Component={H1} textProps={{ size: TextSize.giantic, bold: true }} {...props} />;
}

export function Heading2(props: Props) {
  return <Heading Component={H2} textProps={{ size: TextSize.huge, bold: true }} {...props} />;
}

export function Heading3(props: Props) {
  return <Heading Component={H3} textProps={{ size: TextSize.large, bold: true }} {...props} />;
}

export function Heading4(props: Props) {
  return <Heading Component={H4} textProps={{ size: TextSize.larger, bold: true }} {...props} />;
}

export function Heading5(props: Props) {
  return <Heading Component={H5} textProps={{ size: TextSize.larger }} {...props} />;
}

export function Heading6(props: Props) {
  return <Heading Component={H6} textProps={{ bold: true }} {...props} />;
}

const H1 = styled.h1`
  box-sizing: border-box;
  margin-block-start: 52px;
  margin-block-end: 32px;

  ${MOBILE} {
    margin-block-start: 42px;
    margin-block-end: 24px;
  }

  &:first-child {
    margin-block-start: 0;
  }

  &:last-child {
    margin-block-end: 0;
  }

  h1 + &,
  h2 + &,
  h3 + &,
  h4 + &,
  h5 + &,
  h6 + & {
    margin-block-start: 32px;

    ${MOBILE} {
      margin-block-start: 24px;
    }
  }
`;
const H2 = H1.withComponent("h2");
const H3 = H1.withComponent("h3");
const H4 = H1.withComponent("h4");
const H5 = H1.withComponent("h5");
const H6 = H1.withComponent("h6");

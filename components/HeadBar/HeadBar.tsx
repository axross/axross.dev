import styled from "@emotion/styled";
import * as React from "react";
import { MOBILE } from "../../constant/mediaQuery";
import useLocale from "../../hooks/useLocale";
import LocaleSwitcher from "./LocaleSwitcher";
import Logo from "./Logo";
import Link from "../Link";

export interface Props extends React.Attributes {
  noLogo?: boolean;
  className?: string;
}

export default function HeadBar({ noLogo = false, ...props }: Props) {
  const { currentLocale } = useLocale();

  return (
    <Root {...props}>
      {noLogo ? null : (
        <_LogoLink href={{ pathname: "/", query: { hl: currentLocale } }}>
          <_Logo />
        </_LogoLink>
      )}

      <_Locales>
        <LocaleSwitcher />
      </_Locales>
    </Root>
  );
}

const Root = styled.header`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-areas: "logo locales";
  column-gap: 24px;
  align-items: center;
  justify-items: flex-start;
  height: 64px;
`;

const _LogoLink = styled(Link)`
  grid-area: logo;
  padding-block-start: 8px;
  padding-block-end: 8px;
  padding-inline-start: 16px;
  padding-inline-end: 16px;

  ${MOBILE} {
    padding-block-start: 20px;
    padding-block-end: 20px;
    padding-inline-start: 20px;
    padding-inline-end: 20px;
  }
`;

const _Logo = styled(Logo)`
  vertical-align: top;
`;

const _Locales = styled.nav`
  grid-area: locales;
  justify-self: flex-end;
  padding-inline-end: 20px;
`;

import styled from "@emotion/styled";
import * as React from 'react';
import Logo from './HeadBar/Logo';
import LocaleSwitcher from './LocaleSwitcher';
import Link from "./Link";

export interface Props extends React.Attributes {
  className?: string;
}

export default function HeadBar(props: Props) {
  return <Root {...props}>
    <_LogoLink href="/">
      <_Logo />
    </_LogoLink>

    <_Locales>
      <LocaleSwitcher />
    </_Locales>

  </Root>;
}

const Root = styled.header`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-areas: "logo locales";
  column-gap: 24px;
  align-items: center;
  justify-items: flex-start;
`;

const _LogoLink = styled(Link)`
  grid-area: logo;
  padding-block: 20px;
  padding-inline: 20px;
`;

const _Logo = styled(Logo)`
  vertical-align: top;
`

const _Locales = styled.nav`
  grid-area: locales;
  justify-self: flex-end;
  padding-inline-end: 20px;
`;
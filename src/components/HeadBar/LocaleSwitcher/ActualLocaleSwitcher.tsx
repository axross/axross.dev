import styled from "@emotion/styled";
import * as React from "react";
import useLocale from "../../../hooks/useLocale";
import LocaleSwitcherItem from "./LocaleSwitcherItem";

interface Props extends React.Attributes {
  className?: string;
}

export default function ActualLocaleSwitcher(props: Props) {
  const { availableLocales } = useLocale();

  return (
    <Root {...props}>
      {availableLocales.map(locale => <Item locale={locale} key={locale} />)}
    </Root>
  );
}

const Root = styled.ul`
  display: flex;
  flex-direction: row;
`;

const Item = styled(LocaleSwitcherItem)`
  margin-inline-start: 12px;

  &:first-of-type {
    margin-inline-start: 0px;
  }
`;

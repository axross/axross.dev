import styled from "@emotion/styled";
import IntlMessageFormat from "intl-messageformat";
import * as React from "react";
import { useLocation } from "react-router-dom";
import LocaleContext from "../../contexts/LocaleContext";
import { DictionaryEntry, LANGUAGE_EN_US, LANGUAGE_JA_JP } from "../../dictionary";
import LocaleString from "../../entities/LocaleString";
import Link from "../Link";
import UIText, { UITextType } from "../UIText";
import LocaleSwitcherLoader from "./LocaleSwitcherLoader";

interface Props extends React.Attributes {
  className?: string;
}

export default function LocaleSwitcher(props: Props) {
  const {
    currentLocale,
    availableLocales,
    isLoading: isLocaleLoading
  } = React.useContext(LocaleContext);
  const location = useLocation();

  if (isLocaleLoading) {
    return <LocaleSwitcherLoader {...props} />;
  }

  return (
    <Root {...props}>
      {availableLocales.map(locale => {
        const searchParams = new URLSearchParams(location.search);

        searchParams.set("hl", locale);

        return locale === currentLocale ? (
          <Item key={locale}>
            <UIText type={UITextType.smallLabel}>
              {new IntlMessageFormat(
                dictionaryEntryMap[locale][currentLocale]
              ).format()}
            </UIText>
          </Item>
        ) : (
          <Item key={locale}>
            <Link to={`${location.pathname}?${searchParams}`} replace>
              <UIText type={UITextType.smallLabel}>
                {new IntlMessageFormat(
                  dictionaryEntryMap[locale][currentLocale]
                ).format()}
              </UIText>
            </Link>
          </Item>
        );
      })}
    </Root>
  );
}

const dictionaryEntryMap: Record<LocaleString, DictionaryEntry> = {
  "en-US": LANGUAGE_EN_US,
  "ja-JP": LANGUAGE_JA_JP
};

const Root = styled.ul`
  display: flex;
  flex-direction: row;
`;

const Item = styled.li`
  margin-inline-start: 12px;

  &:first-of-type {
    margin-inline-start: 0px;
  }
`;

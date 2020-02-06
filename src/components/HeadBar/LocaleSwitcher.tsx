import styled from "@emotion/styled";
import IntlMessageFormat from "intl-messageformat";
import { useRouter } from "next/router";
import * as React from "react";
import { DictionaryEntry, LANGUAGE_EN_US, LANGUAGE_JA_JP } from "../../dictionary";
import LocaleString from "../../entities/LocaleString";
import useLocale from "../../hooks/useLocale";
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
  } = useLocale();
  const router = useRouter();

  if (isLocaleLoading) {
    return <LocaleSwitcherLoader {...props} />;
  }

  return (
    <Root {...props}>
      {availableLocales.map(locale => locale === currentLocale
        ? (
          <Item key={locale}>
            <UIText type={UITextType.smallLabel}>
              {new IntlMessageFormat(
                dictionaryEntryMap[locale][currentLocale]
              ).format()}
            </UIText>
          </Item>
        )
        : (
          <Item key={locale}>
            <Link
              href={{ pathname: router.pathname, query: { hl: locale } }}
              as={{ pathname: router.asPath.split("?")[0], query: { hl: locale } }}
              replace
            >
              <UIText type={UITextType.smallLabel}>
                {new IntlMessageFormat(
                  dictionaryEntryMap[locale][currentLocale]
                ).format()}
              </UIText>
            </Link>
          </Item>
        )
      )}
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

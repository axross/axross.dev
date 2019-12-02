import styled from "@emotion/styled";
import IntlMessageFormat from "intl-messageformat";
import Link from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
import { MOBILE } from "../constant/mediaquery";
import {
  MOBILE_MINOR_PADDING_SIZE,
  LAPTOP_MINOR_PADDING_SIZE
} from "../constant/size";
import LocaleContext from "../contexts/LocaleContext";
import SelfUrlContext from "../contexts/SelfUrlContext";
import TranslationContext from "../contexts/TranslationContext";
import Text, { TextColor, TextSize } from "./Text";

interface Props extends React.Attributes {
  className?: string;
}

export default function LocaleSwitcher(props: Props) {
  const url = React.useContext(SelfUrlContext);
  const { currentLocale, availableLocales } = React.useContext(LocaleContext);
  const translation = React.useContext(TranslationContext);
  const router = useRouter();

  return (
    <Root {...props}>
      {availableLocales.map(locale => {
        const itemURL = new URL(url.href);

        itemURL.searchParams.set("hl", locale);

        return locale === currentLocale ? (
          <Item key={locale}>
            <Text color={TextColor.secondary} size={TextSize.caption}>
              {new IntlMessageFormat(
                translation[`language.${locale}`]
              ).format()}
            </Text>
          </Item>
        ) : (
          <Item key={locale}>
            <Link
              href={router.pathname + itemURL.search}
              as={itemURL.pathname + itemURL.search}
              replace
              passHref
            >
              <a>
                <Text size={TextSize.caption} link>
                  {new IntlMessageFormat(
                    translation[`language.${locale}`]
                  ).format()}
                </Text>
              </a>
            </Link>
          </Item>
        );
      })}
    </Root>
  );
}

const Root = styled.span`
  display: inline-flex;
  flex-direction: row;
  align-items: flex-end;
`;

const Item = styled.li`
  margin-inline-start: ${LAPTOP_MINOR_PADDING_SIZE}px;

  &:first-child {
    margin-inline-start: -${MOBILE_MINOR_PADDING_SIZE}px;
  }

  ${MOBILE} {
    margin-block-start: -${MOBILE_MINOR_PADDING_SIZE}px;
    margin-block-end: -${MOBILE_MINOR_PADDING_SIZE}px;
    margin-inline-start: 0;
    margin-inline-end: -${MOBILE_MINOR_PADDING_SIZE}px;
    padding-block-start: ${MOBILE_MINOR_PADDING_SIZE}px;
    padding-block-end: ${MOBILE_MINOR_PADDING_SIZE}px;
    padding-inline-start: ${MOBILE_MINOR_PADDING_SIZE}px;
    padding-inline-end: ${MOBILE_MINOR_PADDING_SIZE}px;
  }
`;

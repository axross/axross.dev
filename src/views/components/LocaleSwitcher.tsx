import styled from "@emotion/styled";
import IntlMessageFormat from "intl-messageformat";
import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { DEFAULT_LOCALE } from "../../constant/locale";
import { MOBILE } from "../constant/mediaquery";
import {
  MOBILE_MINOR_PADDING_SIZE,
  LAPTOP_MINOR_PADDING_SIZE
} from "../constant/size";
import useTranslation from "../hooks/useTranslation";
import Text, { TextColor, TextSize } from "./Text";
import useCurrentLocale from "../hooks/useCurrentLocale";
import useAvailableLocales from "../hooks/useAvailableLocales";
import useSelfUrl from "../hooks/useSelfUrl";

interface Props extends React.Attributes {
  className?: string;
}

function LocaleSwitcher(props: Props) {
  const router = useRouter();
  const url = useSelfUrl();
  const availableLocales = useAvailableLocales();
  const currentLocale = useCurrentLocale();
  const translation = useTranslation();

  return (
    <Root {...props}>
      {availableLocales.map(locale => {
        const localeUrl = new URL(url.href);

        if (locale === DEFAULT_LOCALE) {
          localeUrl.searchParams.delete("hl");
        } else {
          localeUrl.searchParams.set("hl", locale);
        }

        return locale === currentLocale ? (
          <Item key={locale}>
            <Text
              color={TextColor.secondary}
              size={TextSize.caption}
            >
              {new IntlMessageFormat(translation[`language.${locale}`]).format()}
            </Text>
          </Item>
        ) : (
          <Item key={locale}>
            <Link
              href={router.pathname + localeUrl.search}
              as={localeUrl}
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

export default LocaleSwitcher;

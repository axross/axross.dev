import styled from "@emotion/styled";
import IntlMessageFormat from "intl-messageformat";
import { useRouter } from "next/router";
import * as React from "react";
import LocaleContext from "../contexts/LocaleContext";
import SelfUrlContext from "../contexts/SelfUrlContext";
import TranslationContext from "../contexts/TranslationContext";
import Link from "./Link";
import Text, { TextType } from "./Text";
import { ThemedColor } from "../../entities/ColorTheme";

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
            <Text color={ThemedColor.secondaryForeground} type={TextType.label}>
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
            >
              <Text type={TextType.label}>
                {new IntlMessageFormat(
                  translation[`language.${locale}`]
                ).format()}
              </Text>
            </Link>
          </Item>
        );
      })}
    </Root>
  );
}

const Root = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const Item = styled.li`
  margin-inline-start: 12px;

  &:first-child {
    margin-inline-start: 0px;
  }
`;

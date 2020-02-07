import { useRouter } from "next/router";
import * as React from "react";
import LocaleString from "../../../entities/LocaleString";
import useLocale from "../../../hooks/useLocale";
import Link from "../../Link";
import UIText, { UITextType } from "../../UIText";
import useTranslation from "../../../hooks/useTranslation";

interface Props extends React.Attributes {
  locale: LocaleString;
  className?: string;
}

export default function LocaleSwitcherItem({ locale, ...props }: Props) {
  const router = useRouter();
  const { currentLocale } = useLocale();
  const label = useTranslation(LOCALE_TRANSLATION_KEY_MAP[locale]);

  if (locale === currentLocale) {
    return (
      <li {...props}>
        <UIText type={UITextType.smallLabel}>
          {label}
        </UIText>
      </li>
    );
  }

  return (
    <li {...props}>
      <Link
        href={{ pathname: router.pathname, query: { hl: locale } }}
        as={{ pathname: router.asPath.split("?")[0], query: { hl: locale } }}
        replace
      >
        <UIText type={UITextType.smallLabel}>
          {label}
        </UIText>
      </Link>
    </li>
  );
}

const LOCALE_TRANSLATION_KEY_MAP: Record<LocaleString, string> = {
  "en-US": "LANGUAGE_EN_US",
  "ja-JP": "LANGUAGE_JA_JP",
};

import { css, cx } from "@linaria/core";
import * as React from "react";
import { useRouter } from "../hooks/router";
import { JapanFlag, UnitedStatesFlag } from "./country-flag";
import { LocalizedLink } from "./localized-link";

export interface LocaleSwitcherProps extends React.Attributes {
  className?: string;
  style?: React.CSSProperties;
}

export const LocaleSwitcher: React.VFC<LocaleSwitcherProps> = ({
  className,
  ...props
}) => {
  const { pathname, asPath, locales } = useRouter();

  return (
    <ul
      className={cx(
        css`
          display: flex;
          list-style: none;
          margin-block-start: 0;
          margin-block-end: 0;
          padding-inline-start: 0;

          & > *:nth-child(n + 2) {
            margin-inline-start: var(--space-md);
          }
        `,
        className
      )}
      {...props}
    >
      {locales.map((locale) => {
        const FlagComponent = locale === "ja-jp" ? JapanFlag : UnitedStatesFlag;

        return (
          <li key={locale}>
            <LocalizedLink href={pathname} as={asPath} locale={locale} passHref>
              <a
                title={locale}
                className={css`
                  display: block;
                  padding: 3px;
                  border-radius: 100%;
                  background-repeat: repeat;
                  background-size: 1280px 40px;

                  &:hover,
                  &:focus,
                  &:active {
                    background-image: repeating-linear-gradient(
                      to left,
                      #ff6b6b,
                      #feca57,
                      #ff6b6b,
                      #feca57,
                      #ff6b6b,
                      #feca57,
                      #ff6b6b
                    );
                    animation: rainbow-anchor 3000ms linear infinite;
                  }

                  &:focus {
                    outline: none;
                  }

                  @keyframes rainbow-anchor {
                    from {
                      background-position-x: 0px;
                    }

                    to {
                      background-position-x: 2048px;
                    }
                  }
                `}
                data-testid="link"
              >
                <FlagComponent
                  className={css`
                    width: 24px;
                    vertical-align: top;
                  `}
                />
              </a>
            </LocalizedLink>
          </li>
        );
      })}
    </ul>
  );
};

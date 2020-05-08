import styled from "@emotion/styled";
import * as React from "react";
import Highlight, { defaultProps } from "prism-react-renderer";
import {
  SYNTAX_HIGHLIGHT_ATTRIBUTE_KEY_COLOR,
  SYNTAX_HIGHLIGHT_BACKGROUND_COLOR,
  SYNTAX_HIGHLIGHT_CLASS_COLOR,
  SYNTAX_HIGHLIGHT_COMMENT_COLOR,
  SYNTAX_HIGHLIGHT_CONSTANT_COLOR,
  SYNTAX_HIGHLIGHT_FUNCTION_COLOR,
  SYNTAX_HIGHLIGHT_HEXCODE_COLOR,
  SYNTAX_HIGHLIGHT_KEYWORD_COLOR,
  SYNTAX_HIGHLIGHT_NORMAL_COLOR,
  SYNTAX_HIGHLIGHT_NUMBER_COLOR,
  SYNTAX_HIGHLIGHT_OPERATOR_COLOR,
  SYNTAX_HIGHLIGHT_PARAMETER_COLOR,
  SYNTAX_HIGHLIGHT_PROPERTY_COLOR,
  SYNTAX_HIGHLIGHT_PUNCTUATION_COLOR,
  SYNTAX_HIGHLIGHT_SELECTOR_COLOR,
  SYNTAX_HIGHLIGHT_STRING_COLOR,
} from "../../constant/color";
import { MOBILE } from "../../constant/mediaQuery";

interface Props extends React.Attributes {
  className?: string;
  children: string;
}

export default function CodeBlock({ className, children, ...props }: Props) {
  const classNames = className?.split(" ") ?? [];
  const languageClassName = classNames.find((cn) => cn.startsWith("language-"));
  const language = languageClassName?.substring(9) ?? "";
  const actualClassName = classNames
    .filter((cn) => !cn.startsWith("language-"))
    .join(" ");
  const actualProps = { ...props, className: actualClassName };

  return (
    <Highlight
      {...defaultProps}
      code={children}
      language={language as any}
      {...actualProps}
    >
      {({ tokens }) => (
        <Pre {...actualProps}>
          <Code>
            {tokens.map((line, i) => (
              <React.Fragment key={i}>
                {line
                  .filter((token) => token.content !== "")
                  .map((token, j) => {
                    const TokenComponent =
                      TAGS.get(token.types.find((type) => TAGS.has(type))!) ??
                      FallbackToken;

                    return (
                      <TokenComponent
                        key={`${i}-${j}`}
                        data-types={token.types.join(", ")}
                      >
                        {token.content}
                      </TokenComponent>
                    );
                  })}

                {i < tokens.length - 1 ? "\n" : null}
              </React.Fragment>
            ))}
          </Code>
        </Pre>
      )}
    </Highlight>
  );
}

const Pre = styled.pre`
  box-sizing: border-box;
  width: calc(100% + 32px * 2);
  margin-block-start: 32px;
  margin-block-end: 32px;
  margin-inline-start: -32px;
  margin-inline-end: -32px;
  padding-block-start: 32px;
  padding-block-end: 32px;
  padding-inline-start: 32px;
  padding-inline-end: 32px;
  border-radius: 8px;
  background-color: ${SYNTAX_HIGHLIGHT_BACKGROUND_COLOR};
  line-height: 1.333;
  overflow-x: scroll;

  ${MOBILE} {
    width: 100vw;
    margin-block-start: 20px;
    margin-block-end: 20px;
    margin-inline-start: calc(-1 * (100vw - 100%) / 2);
    margin-inline-end: calc(-1 * (100vw - 100%) / 2);
    padding-block-start: 20px;
    padding-block-end: 20px;
    padding-inline-start: calc((100vw - 100%) / 2);
    padding-inline-end: calc((100vw - 100%) / 2);
    border-radius: 0;
  }

  &:first-child {
    margin-block-start: 0;
  }

  &:last-child {
    margin-block-end: 0;
  }
`;

const Code = styled.code`
  color: ${SYNTAX_HIGHLIGHT_NORMAL_COLOR};
  font-size: 18px;
  font-family: "Source Code Pro", monospace;
  font-weight: 500;
  line-height: 1.5;

  ${MOBILE} {
    font-size: 15px;
  }
`;

const TAGS = new Map([
  [
    "hexcode",
    styled.span`
      color: ${SYNTAX_HIGHLIGHT_HEXCODE_COLOR};
    `,
  ],
  [
    "selector",
    styled.span`
      color: ${SYNTAX_HIGHLIGHT_SELECTOR_COLOR};
    `,
  ],
  [
    "property",
    styled.span`
      color: ${SYNTAX_HIGHLIGHT_PROPERTY_COLOR};
    `,
  ],
  [
    "parameter",
    styled.span`
      color: ${SYNTAX_HIGHLIGHT_PARAMETER_COLOR};
    `,
  ],
  [
    "constant",
    styled.span`
      color: ${SYNTAX_HIGHLIGHT_CONSTANT_COLOR};
    `,
  ],
  [
    "attr-name",
    styled.span`
      color: ${SYNTAX_HIGHLIGHT_ATTRIBUTE_KEY_COLOR};
    `,
  ],
  [
    "punctuation",
    styled.span`
      color: ${SYNTAX_HIGHLIGHT_PUNCTUATION_COLOR};
    `,
  ],
  [
    "class-name",
    styled.span`
      color: ${SYNTAX_HIGHLIGHT_CLASS_COLOR};
    `,
  ],
  [
    "maybe-class-name",
    styled.span`
      color: ${SYNTAX_HIGHLIGHT_CLASS_COLOR};
    `,
  ],
  [
    "number",
    styled.span`
      color: ${SYNTAX_HIGHLIGHT_NUMBER_COLOR};
    `,
  ],
  [
    "unit",
    styled.span`
      color: ${SYNTAX_HIGHLIGHT_NUMBER_COLOR};
    `,
  ],
  [
    "interpolation",
    styled.span`
      color: ${SYNTAX_HIGHLIGHT_NUMBER_COLOR};
    `,
  ],
  [
    "pseudo-element",
    styled.span`
      color: ${SYNTAX_HIGHLIGHT_NUMBER_COLOR};
    `,
  ],
  [
    "string",
    styled.span`
      color: ${SYNTAX_HIGHLIGHT_STRING_COLOR};
    `,
  ],
  [
    "attr-value",
    styled.span`
      color: ${SYNTAX_HIGHLIGHT_STRING_COLOR};
    `,
  ],
  [
    "function",
    styled.span`
      color: ${SYNTAX_HIGHLIGHT_FUNCTION_COLOR};
    `,
  ],
  [
    "operator",
    styled.span`
      color: ${SYNTAX_HIGHLIGHT_OPERATOR_COLOR};
    `,
  ],
  [
    "keyword",
    styled.span`
      color: ${SYNTAX_HIGHLIGHT_KEYWORD_COLOR};
    `,
  ],
  [
    "comment",
    styled.span`
      color: ${SYNTAX_HIGHLIGHT_COMMENT_COLOR};
    `,
  ],
]);

const FallbackToken = styled.span`
  color: ${SYNTAX_HIGHLIGHT_NORMAL_COLOR};
`;

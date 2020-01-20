import Highlight, { defaultProps } from "prism-react-renderer";
import * as React from "react";
import styled from "styled-components";
import {
  CODE_BACKGROUND_COLOR,
  CODE_COLORS,
  CodeColor
} from "../../constant/color";
import { MOBILE } from "../../constant/mediaQuery";

interface Props extends React.Attributes {
  className?: string;
  children: string;
}

export default function CodeBlock({ className, children, ...props }: Props) {
  const classNames = className?.split(" ") ?? [];
  const languageClassName = classNames.find(cn => cn.startsWith("language-"));
  const language = languageClassName?.substring(9) ?? "";
  const actualClassName = classNames.filter(cn => !cn.startsWith("language-")).join(" ");
  const actualProps = { ...props, className: actualClassName };

  return (
    <Highlight {...defaultProps} code={children} language={language as any} {...actualProps}>
      {({ tokens }) => (
        <Pre {...actualProps}>
          <Code>
            {tokens.map((line, i) => (
              <>
                {line
                  .filter(token => token.content !== "")
                  .map((token, j) => {
                    const TokenComponent = TAGS.get(token.types.find(type => TAGS.has(type))!) ?? FallbackToken;

                    return (
                      <TokenComponent key={`${i}-${j}`} data-types={token.types.join(", ")}>
                        {token.content}
                      </TokenComponent>
                    );
                  })
                }

                {"\n"}
              </>
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
  background-color: ${CODE_BACKGROUND_COLOR};
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
  color: ${CODE_COLORS[CodeColor.normal]};
  font-size: 18px;
  font-family: "Source Code Pro", monospace;
  font-weight: 500;
  line-height: 1.5;

  ${MOBILE} {
    font-size: 15px;
  }
`;

const TAGS = new Map([
  ["hexcode", styled.span`color: ${CODE_COLORS[CodeColor.hexcode]};`],
  ["selector", styled.span`color: ${CODE_COLORS[CodeColor.selector]};`],
  ["property", styled.span`color: ${CODE_COLORS[CodeColor.property]};`],
  ["parameter", styled.span`color: ${CODE_COLORS[CodeColor.parameter]};`],
  ["constant", styled.span`color: ${CODE_COLORS[CodeColor.constant]};`],
  ["attr-name", styled.span`color: ${CODE_COLORS[CodeColor.attributeKey]};`],
  ["punctuation", styled.span`color: ${CODE_COLORS[CodeColor.punctuation]};`],
  ["class-name", styled.span`color: ${CODE_COLORS[CodeColor.class]};`],
  ["maybe-class-name", styled.span`color: ${CODE_COLORS[CodeColor.class]};`],
  ["number", styled.span`color: ${CODE_COLORS[CodeColor.number]};`],
  ["unit", styled.span`color: ${CODE_COLORS[CodeColor.number]};`],
  ["interpolation", styled.span`color: ${CODE_COLORS[CodeColor.number]};`],
  ["pseudo-element", styled.span`color: ${CODE_COLORS[CodeColor.number]};`],
  ["string", styled.span`color: ${CODE_COLORS[CodeColor.string]};`],
  ["attr-value", styled.span`color: ${CODE_COLORS[CodeColor.string]};`],
  ["function", styled.span`color: ${CODE_COLORS[CodeColor.function]};`],
  ["operator", styled.span`color: ${CODE_COLORS[CodeColor.operator]};`],
  ["keyword", styled.span`color: ${CODE_COLORS[CodeColor.keyword]};`],
  ["comment", styled.span`color: ${CODE_COLORS[CodeColor.comment]};`],
]);

const FallbackToken = styled.span`
  color: ${CODE_COLORS[CodeColor.normal]};
`;

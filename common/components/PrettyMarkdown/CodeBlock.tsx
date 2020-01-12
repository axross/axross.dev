import styled from "@emotion/styled";
import * as React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
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
  const language = languageClassName?.substring(9) ?? undefined;
  const actualClassName = classNames.filter(cn => !cn.startsWith("language-")).join(" ");
  const actualProps = { ...props, className: actualClassName };

  return (
    <Root
      language={language}
      // disable default style
      style={{}}
      // workaround. disable default inline style "background-color: rgba(255, 255, 255)"
      customStyle={{ backgroundColor: undefined }}
      {...actualProps}
    >
      {children}
    </Root>
  );
}

const Root = styled(SyntaxHighlighter)`
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

  & > code {
    background-color: transparent;
    margin-inline-start: 0;
    margin-inline-end: 0;
    padding-block-start: 0;
    padding-block-end: 0;
    border-radius: 0;
    color: ${CODE_COLORS[CodeColor.normal]};
    font-size: 18px;
    font-family: "Source Code Pro", monospace;
    font-weight: 500;
    line-height: 1.75;

    ${MOBILE} {
      font-size: 15px;
    }

    .token.comment {
      color: ${CODE_COLORS[CodeColor.comment]};
    }

    .token.keyword {
      color: ${CODE_COLORS[CodeColor.keyword]};
    }

    .token.operator {
      color: ${CODE_COLORS[CodeColor.operator]};
    }

    .token.punctuation {
      color: ${CODE_COLORS[CodeColor.punctuation]};
    }

    .token.function {
      color: ${CODE_COLORS[CodeColor.function]};
    }

    .token.string,
    .token.attr-value {
      color: ${CODE_COLORS[CodeColor.string]};
    }

    .token.number,
    .token.unit,
    .token.interpolation,
    .token.pseudo-element {
      color: ${CODE_COLORS[CodeColor.number]};
    }

    .token.class-name,
    .token.maybe-class-name {
      color: ${CODE_COLORS[CodeColor.class]};
    }

    .token.tag {
      color: ${CODE_COLORS[CodeColor.tag]};

      .token.punctuation {
        color: ${CODE_COLORS[CodeColor.tagPunctuation]};
      }
    }

    .token.attr-name {
      color: ${CODE_COLORS[CodeColor.attributeKey]};
    }

    .token.constant {
      color: ${CODE_COLORS[CodeColor.constant]};
    }

    .token.parameter {
      color: ${CODE_COLORS[CodeColor.parameter]};
    }

    .token.property {
      color: ${CODE_COLORS[CodeColor.property]};
    }

    .token.selector {
      color: ${CODE_COLORS[CodeColor.selector]};
    }

    .token.hexcode {
      color: ${CODE_COLORS[CodeColor.hexcode]};
    }
  }
`;

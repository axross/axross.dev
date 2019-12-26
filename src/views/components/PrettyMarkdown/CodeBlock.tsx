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
  language: string;
  value: string;
}

export default function Paragraph({ language, value, ...props }: Props) {
  return (
    <Root
      // codeTagProps={{ className: `language-${language}` }}
      language={language}
      // disable default style
      style={{}}
      // workaround. disable default inline style "background-color: rgba(255, 255, 255)"
      customStyle={{ backgroundColor: undefined }}
      {...props}
    >
      {value}
    </Root>
  );
}

const Root = styled(SyntaxHighlighter)`
  box-sizing: border-box;
  max-width: calc(100% + 32px * 2);
  width: calc(100% + 32px * 2);
  margin-block: 32px;
  margin-inline: -32px;
  padding-block: 32px;
  border-radius: 8px;
  background-color: ${CODE_BACKGROUND_COLOR};
  line-height: 1.333;
  overflow-x: scroll;

  ${MOBILE} {
    max-width: calc(100% + 20px * 2);
    width: calc(100% + 20px * 2);
    margin-block: 24px;
    margin-inline: -20px;
    padding-block: 24px;
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
    padding-inline: 32px;
    border-radius: 0;
    color: ${CODE_COLORS[CodeColor.normal]};
    font-size: 16px;
    font-family: "Source Code Pro", monospace;
    font-weight: 500;

    ${MOBILE} {
      padding-inline: 24px;
      font-size: 14px;
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

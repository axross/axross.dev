import styled from "@emotion/styled";
import * as React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  CODE_BACKGROUND_COLOR,
  CODE_COLORS,
  CodeColor
} from "../../constant/color";
import {
  MOBILE_PADDING_SIZE,
  LAPTOP_PADDING_SIZE,
  LAPTOP_TEXT_SIZE,
  MOBILE_TEXT_SIZE
} from "../../constant/size";
import { MOBILE } from "../../constant/mediaquery";

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
  max-width: calc(100% + ${LAPTOP_PADDING_SIZE}px * 2);
  width: calc(100% + ${LAPTOP_PADDING_SIZE}px * 2);
  margin-block-start: ${LAPTOP_PADDING_SIZE}px;
  margin-block-end: ${LAPTOP_PADDING_SIZE}px;
  margin-inline-start: calc(-1 * ${LAPTOP_PADDING_SIZE}px);
  margin-inline-end: calc(-1 * ${LAPTOP_PADDING_SIZE}px);
  padding-block-start: ${LAPTOP_PADDING_SIZE}px;
  padding-block-end: ${LAPTOP_PADDING_SIZE}px;
  padding-inline-start: ${LAPTOP_PADDING_SIZE}px;
  padding-inline-end: ${LAPTOP_PADDING_SIZE}px;
  border-radius: 8px;
  background-color: ${CODE_BACKGROUND_COLOR};
  line-height: 1.333;
  overflow-x: scroll;

  ${MOBILE} {
    max-width: calc(100% + 20px * 2);
    width: calc(100% + 20px * 2);
    margin-block-start: ${MOBILE_PADDING_SIZE}px;
    margin-block-end: ${MOBILE_PADDING_SIZE}px;
    margin-inline-start: -20px;
    margin-inline-end: -20px;
    padding-block-start: ${MOBILE_PADDING_SIZE}px;
    padding-block-end: ${MOBILE_PADDING_SIZE}px;
    padding-inline-start: 20px;
    padding-inline-end: 20px;
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
    padding-inline-start: 0;
    padding-inline-end: 0;
    border-radius: 0;
    color: ${CODE_COLORS[CodeColor.normal]};
    font-size: calc(${LAPTOP_TEXT_SIZE}px * 0.9);
    font-family: "Source Code Pro", monospace;
    font-weight: 500;

    ${MOBILE} {
      font-size: calc(${MOBILE_TEXT_SIZE}px * 0.9);
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

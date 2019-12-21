import styled from "@emotion/styled";
import * as React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { MOBILE_PADDING_SIZE, LAPTOP_PADDING_SIZE, LAPTOP_TEXT_SIZE, MOBILE_TEXT_SIZE } from "../../constant/size";
import { MOBILE, DARK_MODE } from "../../constant/mediaquery";
import { BACKGROUND_COLORS, BackgroundColor, CODE_COLORS, CodeColor } from "../../constant/color";

interface Props extends React.Attributes {
  language: string;
  value: string;
}

export default function Paragraph({language,value, ...props}: Props) {
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
  background-color: ${BACKGROUND_COLORS.get(BackgroundColor.code)!.light};
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

  ${DARK_MODE} {
    background-color: ${BACKGROUND_COLORS.get(BackgroundColor.code)!.dark};
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
    font-size: calc(${LAPTOP_TEXT_SIZE}px * 0.9);
    font-family: "Source Code Pro", monospace;
    font-weight: 500;

    color: ${CODE_COLORS.get(CodeColor.normal)!.light};

    ${MOBILE} {
      font-size: calc(${MOBILE_TEXT_SIZE}px * 0.9);
    }

    ${DARK_MODE} {
      color: ${CODE_COLORS.get(CodeColor.normal)!.dark};
    }

    .token.comment {
      color: ${CODE_COLORS.get(CodeColor.comment)!.light};

      ${DARK_MODE} {
        color: ${CODE_COLORS.get(CodeColor.comment)!.dark};
      }
    }

    .token.keyword {
      color: ${CODE_COLORS.get(CodeColor.keyword)!.light};

      ${DARK_MODE} {
        color: ${CODE_COLORS.get(CodeColor.keyword)!.dark};
      }
    }

    .token.operator {
      color: ${CODE_COLORS.get(CodeColor.operator)!.light};

      ${DARK_MODE} {
        color: ${CODE_COLORS.get(CodeColor.operator)!.dark};
      }
    }

    .token.punctuation {
      color: ${CODE_COLORS.get(CodeColor.punctuation)!.light};

      ${DARK_MODE} {
        color: ${CODE_COLORS.get(CodeColor.punctuation)!.dark};
      }
    }

    .token.function {
      color: ${CODE_COLORS.get(CodeColor.function)!.light};

      ${DARK_MODE} {
        color: ${CODE_COLORS.get(CodeColor.function)!.dark};
      }
    }

    .token.string,
    .token.attr-value {
      color: ${CODE_COLORS.get(CodeColor.string)!.light};

      ${DARK_MODE} {
        color: ${CODE_COLORS.get(CodeColor.string)!.dark};
      }
    }

    .token.number,
    .token.unit,
    .token.interpolation,
    .token.pseudo-element {
      color: ${CODE_COLORS.get(CodeColor.number)!.light};

      ${DARK_MODE} {
        color: ${CODE_COLORS.get(CodeColor.number)!.dark};
      }
    }

    .token.class-name,
    .token.maybe-class-name {
      color: ${CODE_COLORS.get(CodeColor.class)!.light};

      ${DARK_MODE} {
        color: ${CODE_COLORS.get(CodeColor.class)!.dark};
      }
    }

    .token.tag {
      color: ${CODE_COLORS.get(CodeColor.tag)!.light};

      ${DARK_MODE} {
        color: ${CODE_COLORS.get(CodeColor.tag)!.dark};
      }

      .token.punctuation {
        color: ${CODE_COLORS.get(CodeColor.tagPunctuation)!.light};

        ${DARK_MODE} {
          color: ${CODE_COLORS.get(CodeColor.tagPunctuation)!.dark};
        }
      }
    }

    .token.attr-name {
      color: ${CODE_COLORS.get(CodeColor.attributeKey)!.light};

      ${DARK_MODE} {
        color: ${CODE_COLORS.get(CodeColor.attributeKey)!.dark};
      }
    }

    .token.constant {
      color: ${CODE_COLORS.get(CodeColor.constant)!.light};

      ${DARK_MODE} {
        color: ${CODE_COLORS.get(CodeColor.constant)!.dark};
      }
    }

    .token.parameter {
      color: ${CODE_COLORS.get(CodeColor.parameter)!.light};

      ${DARK_MODE} {
        color: ${CODE_COLORS.get(CodeColor.parameter)!.dark};
      }
    }

    .token.property {
      color: ${CODE_COLORS.get(CodeColor.property)!.light};

      ${DARK_MODE} {
        color: ${CODE_COLORS.get(CodeColor.property)!.dark};
      }
    }

    .token.selector {
      color: ${CODE_COLORS.get(CodeColor.selector)!.light};

      ${DARK_MODE} {
        color: ${CODE_COLORS.get(CodeColor.selector)!.dark};
      }
    }

    .token.hexcode {
      color: ${CODE_COLORS.get(CodeColor.hexcode)!.light};

      ${DARK_MODE} {
        color: ${CODE_COLORS.get(CodeColor.hexcode)!.dark};
      }
    }
  }
`;

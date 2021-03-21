import { css, cx } from "@linaria/core";
import Highlight, { defaultProps } from "prism-react-renderer";
import * as React from "react";
import { useIntl } from "react-intl";

export interface CodeBlockProps extends React.Attributes {
  value: string;
  language?: string;
  onCopyButtonClick?: (
    event: React.MouseEvent<HTMLElement>,
    code: string
  ) => void;
  className?: string;
  style?: React.CSSProperties;
}

export const CodeBlock: React.VFC<CodeBlockProps> = ({
  value,
  language,
  onCopyButtonClick = () => {},
  className,
  ...props
}) => {
  const intl = useIntl();
  const codeRef = React.useRef<HTMLElement>(null);
  const [isCopied, setCopied] = React.useState(false);

  return (
    <div
      className={cx(
        css`
          position: relative;
          width: 100%;
          background: #11121a;
          border-radius: 8px;
          font-size: calc(var(--font-size-md) * 0.888);

          &:hover > ${copyButtonRefCss} {
            opacity: 1;
          }
        `,
        className
      )}
      {...props}
    >
      <div
        className={css`
          width: 100%;
          overflow-x: scroll;

          & > code {
            display: inline-block;
            padding-block-start: calc(var(--space-lg) - 0.375em);
            padding-block-end: calc(var(--space-lg) - 0.375em);
            padding-inline-start: var(--space-lg);
            padding-inline-end: var(--space-lg);
            line-height: 1.5;
            font-family: "Fira Code", monospace;
            white-space: pre;
          }
        `}
      >
        <Highlight {...defaultProps} code={value} language={language as any}>
          {({ className, tokens, getTokenProps }) => {
            const elements: React.ReactElement[] = [];

            for (const [i, line] of tokens.entries()) {
              console.log(i, line);

              for (const [j, token] of line.entries()) {
                const { className, children } = getTokenProps({ token, j });

                // prism outputs single new-line character node for empty line
                // remove this since we manually add new-line character element for each line
                if (children === "\n") {
                  continue;
                }

                elements.push(
                  <span className={className} key={`${i}-${j}`}>
                    {children}
                  </span>
                );
              }

              elements.push(
                <span className="token plain" key={`${i}-nl`}>
                  {"\n"}
                </span>
              );
            }

            return (
              <code
                className={cx(
                  css`
                    color: #cfcfcf;

                    & .selector,
                    & .keyword,
                    & .operator {
                      color: #ff6b6b;
                    }

                    & .property {
                      color: #54a0ff;
                    }

                    & .parameter {
                      color: #abb2bf;
                    }

                    & .attr-name,
                    & .function {
                      color: #ff9ff3;
                    }
                    & .punctuation {
                      color: #abb2bf;
                    }
                    & .class-name,
                    & .maybe-class-name {
                      color: #feca57;
                    }
                    & .constant,
                    & .number,
                    & .unit,
                    & .interpolation,
                    & .pseudo-element {
                      color: #ff9f43;
                    }
                    & .string,
                    & .attr-value {
                      color: #1dd1a1;
                    }
                    & .hexcode {
                      color: #00d2d3;
                    }

                    & .comment {
                      color: #576574;
                    }
                  `,
                  className
                )}
                ref={codeRef}
              >
                {elements}
              </code>
            );
          }}
        </Highlight>
      </div>

      <button
        onClick={async (event) => {
          const code = codeRef.current!.textContent!;

          onCopyButtonClick(event, code);

          const { state } = await globalThis.navigator.permissions.query({
            name: "clipboard-write" as any,
          });

          if (state === "granted" || state === "prompt") {
            globalThis.navigator.clipboard.writeText(code);

            setCopied(true);

            setTimeout(() => {
              setCopied(false);
            }, 3000);
          }
        }}
        className={cx(
          css`
            position: absolute;
            top: var(--space-xs);
            right: var(--space-xs);
            padding-block-start: var(--space-xs);
            padding-block-end: var(--space-xs);
            padding-inline-start: var(--space-sm);
            padding-inline-end: var(--space-sm);
            background: none;
            border: none;
            border-radius: 6px;
            color: #ffffff;
            cursor: pointer;
            outline: none;
            opacity: 0;
            user-select: none;
            transition: all 150ms ease-in-out 0ms;

            &:hover {
              background: #ffffff1f;
            }
          `,
          copyButtonRefCss
        )}
      >
        {isCopied
          ? intl.formatMessage({ defaultMessage: "Copied!" })
          : intl.formatMessage({ defaultMessage: "Copy" })}
      </button>
    </div>
  );
};

const copyButtonRefCss = css``;

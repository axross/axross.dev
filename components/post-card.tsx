import { css, cx } from "@linaria/core";
import Image from "next/image";
import {
  RAINBOW_ANCHOR_CSS,
  RAINBOW_HOVER_ANCHOR_CSS,
} from "../constants/style";
import { Badge } from "./badge";
import { HorizontalList } from "./layout";
import { LocalizedLink } from "./localized-link";

export interface PostCardProps extends React.Attributes {
  title: string;
  coverImageUrl: string;
  tags: string[];
  href: string;
  asHref: string;
  onClick?: React.MouseEventHandler;
  className?: string;
  style?: React.CSSProperties;
}

export const PostCard: React.VFC<PostCardProps> = ({
  title,
  coverImageUrl,
  tags,
  href,
  asHref,
  onClick = () => {},
  className,
  ...props
}) => {
  return (
    <LocalizedLink href={href} as={asHref}>
      <a
        className={cx(
          css`
            display: block;
            background-color: var(--color-bg-gray-weak);
            border-radius: 8px;
            color: currentColor;
            text-decoration: inherit;
            transition: background-color 150ms ease-in-out 0ms;

            &:hover,
            &:focus,
            &:active {
              background-color: var(--color-bg-gray);
              outline: none;

              ${imageRefCss} {
                filter: brightness(1.25);
              }

              ${titleRefCss} {
                ${RAINBOW_HOVER_ANCHOR_CSS}
              }
            }
          `,
          className
        )}
        {...props}
      >
        <Image
          src={coverImageUrl}
          width={2048}
          height={1170}
          className={cx(
            css`
              display: block;
              width: 100%;
              height: 128px;
              object-fit: cover;
              object-position: center;
              border-top-left-radius: 8px;
              border-top-right-radius: 8px;
            `,
            imageRefCss
          )}
        />

        <div
          className={css`
            padding-block-start: var(--space-xs);
            padding-block-end: var(--space-sm);
            padding-inline-start: var(--space-md);
            padding-inline-end: var(--space-md);
          `}
        >
          <h1
            className={cx(
              css`
                margin-block-start: 0;
                margin-block-end: 0;
                line-height: 1.5;
                color: var(--color-fg-strong);
                font-size: var(--font-size-md);
                font-weight: bold;
                line-height: 1.5;
                ${someCss(2)}
                ${RAINBOW_ANCHOR_CSS}
              `,
              titleRefCss
            )}
          >
            {title}
          </h1>

          <HorizontalList
            columnGap="var(--space-xs)"
            rowGap="var(--space-xs)"
            className={css`
              margin-block-start: var(--space-sm);
            `}
          >
            {tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </HorizontalList>
        </div>
      </a>
    </LocalizedLink>
  );
};

const imageRefCss = css``;

const titleRefCss = css``;

function someCss(lines: number) {
  return `
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: ${lines};
    overflow: hidden;
  `;
}

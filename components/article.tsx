import { css } from "@linaria/core";
import * as React from "react";
import { FormattedMessage } from "react-intl";
import { Badge } from "./badge";
import { HorizontalList } from "./layout";
import { Markdown } from "./markdown-article";

export interface ArticleProps extends React.Attributes {
  title: string;
  coverImageUrl: string;
  tags?: string[];
  lastPublishedAt?: Date;
  author?: {
    name: string;
    avatarUrl: string;
  };
  body: string;
  className?: string;
  style?: React.CSSProperties;
}

export const Article: React.VFC<ArticleProps> = ({
  title,
  coverImageUrl,
  tags,
  lastPublishedAt,
  author,
  body,
  ...props
}) => {
  return (
    <article {...props}>
      <img
        src={coverImageUrl}
        alt={title}
        className={css`
          width: 100%;
          height: 320px;
          object-fit: cover;
          object-position: center;
        `}
      />

      <h1
        className={css`
          margin-block-end: 0.5rem;
          line-height: 1.5;
          display: block;
          margin-block-start: var(--space-xl);
          margin-block-end: 0;
          color: var(--color-fg-strong);
          font-size: var(--font-size-xxl);
          font-weight: bold;

          @media screen and (max-width: 1248px) {
            padding-inline-start: var(--space-md);
            padding-inline-end: var(--space-md);
          }
        `}
        data-testid="title"
      >
        {title}
      </h1>

      {(author && lastPublishedAt) || tags ? (
        <aside
          className={css`
            margin-block-start: var(--space-xl);

            @media screen and (max-width: 1248px) {
              padding-inline-start: var(--space-md);
              padding-inline-end: var(--space-md);
            }
          `}
        >
          {author && lastPublishedAt ? (
            <div
              className={css`
                display: flex;
                align-items: center;
              `}
            >
              <img
                src={author.avatarUrl}
                className={css`
                  width: 64px;
                  height: 64px;
                  border-radius: 100%;
                  user-select: none;
                `}
              />

              <div
                className={css`
                  margin-inline-start: var(--space-md);
                `}
              >
                <div>{author.name}</div>

                <time
                  dateTime={lastPublishedAt.toISOString()}
                  className={css`
                    display: block;
                    margin-block-start: var(--space-xs);
                    font-size: var(--font-size-xs);
                  `}
                >
                  <FormattedMessage
                    defaultMessage="Last modified at {lastModifiedAt, date, long}"
                    values={{ lastModifiedAt: lastPublishedAt }}
                  />
                </time>
              </div>
            </div>
          ) : null}

          {tags ? (
            <HorizontalList
              columnGap="var(--space-sm)"
              className={css`
                margin-block-start: var(--space-md);
              `}
            >
              {tags.map((tag: string) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </HorizontalList>
          ) : null}
        </aside>
      ) : null}

      <Markdown
        markdown={body}
        className={css`
          margin-block-start: var(--space-xl);

          @media screen and (max-width: 1248px) {
            padding-inline-start: var(--space-md);
            padding-inline-end: var(--space-md);
          }
        `}
      />
    </article>
  );
};

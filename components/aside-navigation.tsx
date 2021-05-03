import { css } from "@linaria/core";
import * as React from "react";
import { FormattedMessage } from "react-intl";
import { useRouter } from "../hooks/router";
import { LocaleSwitcher } from "./locale-switcher";
import { PostList, PostListItem } from "./post-list";
import { TableOfContents, TableOfContentsItem } from "./table-of-contents";

export interface AsideNavigationProps extends React.Attributes {
  posts: {
    slug: string;
    title: string;
  }[];
  tableOfContents: {
    id: string;
    level: number;
    text: string;
  }[];
}

export const AsideNavigation: React.VFC<AsideNavigationProps> = ({
  posts,
  tableOfContents,
  ...props
}) => {
  const { url, locale } = useRouter();

  return (
    <div {...props}>
      <div
        className={css`
          padding-inline-start: var(--space-md);
          padding-inline-end: var(--space-md);
        `}
      >
        <LocaleSwitcher
          className={css`
            justify-content: flex-end;
          `}
        />
      </div>

      <PostList
        className={css`
          margin-block-start: var(--space-xl);
        `}
      >
        <PostListItem
          href="/"
          as="/"
          tableOfContents={
            url.pathname === `/${locale}` ? (
              <TableOfContents data-testid="table-of-contents">
                {tableOfContents.map(({ id, level, text }) => (
                  <TableOfContentsItem
                    targetId={id}
                    level={level}
                    data-testid="item"
                    key={id}
                  >
                    {text}
                  </TableOfContentsItem>
                ))}
              </TableOfContents>
            ) : undefined
          }
        >
          <FormattedMessage defaultMessage="About" />
        </PostListItem>

        {posts.map((p) => (
          <PostListItem
            href="/posts/[slug]"
            as={`/posts/${p.slug}`}
            tableOfContents={
              url.pathname === `/${locale}/posts/${p.slug}` ? (
                <TableOfContents data-testid="table-of-contents">
                  {tableOfContents.map(({ id, level, text }) => (
                    <TableOfContentsItem
                      targetId={id}
                      level={level}
                      data-testid="item"
                      key={id}
                    >
                      {text}
                    </TableOfContentsItem>
                  ))}
                </TableOfContents>
              ) : undefined
            }
            key={p.slug}
          >
            {p.title}
          </PostListItem>
        ))}
      </PostList>
    </div>
  );
};

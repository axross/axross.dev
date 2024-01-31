import { clsx } from "clsx";
import Link from "next/link";
import { type ComponentPropsWithoutRef, type JSX } from "react";
import { LocaleSwitcher } from "~/components/locale-switcher";
import { OutlineList } from "~/components/side-navigation/outline-list";
import { OutlineListItem } from "~/components/side-navigation/outline-list-item";
import { queryPosts } from "~/queries/query-posts";
import { buildOutline } from "./build-outline";
import css from "./side-navigation.module.css";

async function SideNavigation({
  bio = false,
  postSlug,
  markdown,
  className,
  ...props
}: ComponentPropsWithoutRef<"nav"> & {
  bio?: boolean;
  readonly postSlug?: string;
  readonly markdown: string;
}): Promise<JSX.Element> {
  const posts = await queryPosts();
  const outline = await buildOutline({ markdown });

  return (
    <nav className={clsx(css.root, className)} {...props}>
      <div className={css.header}>
        <LocaleSwitcher />
      </div>

      <ul className={css["link-list"]}>
        <li>
          <Link href="/" className={css["page-title"]}>
            {"kohei.dev"}
          </Link>

          {bio ? (
            <OutlineList className={css["outline-list"]}>
              {outline.map((node) => {
                return (
                  <OutlineListItem
                    key={node.id}
                    level={node.depth}
                    href={`/#${node.id}`}
                  >
                    {node.label}
                  </OutlineListItem>
                );
              })}
            </OutlineList>
          ) : null}
        </li>

        {posts.map((post) => {
          let outlineList = null;

          if (post.slug === postSlug) {
            outlineList = (
              <OutlineList className={css["outline-list"]}>
                {outline.map((node) => {
                  return (
                    <OutlineListItem
                      key={node.id}
                      level={node.depth}
                      href={`/posts/${postSlug}#${node.id}`}
                    >
                      {node.label}
                    </OutlineListItem>
                  );
                })}
              </OutlineList>
            );
          }

          return (
            <li key={post.id}>
              <Link href={`/posts/${post.slug}`} className={css["page-title"]}>
                {post.title}
              </Link>

              {outlineList}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export { SideNavigation };

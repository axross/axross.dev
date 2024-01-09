import "server-only";

import { type JSX } from "react";
/* eslint-disable import/namespace, import/no-deprecated, import/default, import/no-named-as-default, import/no-named-as-default-member */
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
/* eslint-enable import/namespace, import/no-deprecated, import/default, import/no-named-as-default, import/no-named-as-default-member */
import { OutlineList, OutlineListItem } from "~/components/outline-list";
import { type OutlineNode, rehypeOutline } from "~/helpers/remark";
import { type Post } from "~/models/post";
import { queryPosts } from "~/queries/query-posts";
import Link from "next/link";

export async function Outline({
  postSlug,
  markdown,
}: {
  postSlug: Post["slug"];
  markdown: string;
}): Promise<JSX.Element> {
  const posts = await queryPosts();
  const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeOutline);

  const file = await processor.process(markdown);
  const outline = file.result as OutlineNode[];

  return (
    <ul className="flex flex-col gap-y-2">
      <li>
        <h2>
          <Link
            href="/"
            className="block px-4 py-2 text-base font-medium transition-colors focus-visible:bg-gray-100 dark:focus-visible:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-md"
          >
            {"kohei.dev"}
          </Link>
        </h2>
      </li>

      {posts.map((post) => {
        let outlineList = null;

        if (post.slug === postSlug) {
          outlineList = (
            <OutlineList className="ml-4">
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
            <h2>
              <Link
                href={`/posts/${post.slug}`}
                className="block px-4 py-2 text-base font-medium transition-colors focus-visible:bg-gray-100 dark:focus-visible:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-md"
              >
                {post.title}
              </Link>
            </h2>

            {outlineList}
          </li>
        );
      })}
    </ul>
  );
}

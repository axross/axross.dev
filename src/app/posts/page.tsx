import Link from "next/link";
import { type JSX } from "react";
import { queryPosts } from "~/queries/query-posts";

async function Page(): Promise<JSX.Element> {
  const posts = await queryPosts();

  return (
    <main>
      <h1>{"Posts"}</h1>

      <ul>
        {posts.map((post) => {
          return (
            <li key={post.id}>
              <Link href={`/posts/${post.slug}`}>{post.title}</Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}

export default Page;

import Image from 'next/image'
import Link from 'next/link';
import { queryPosts } from '~/queries/query-posts'

export default async function Page() {
  const posts = await queryPosts();

  return (
    <main>
      <h1>Posts</h1>

      <ul>
        {posts.map(post => {
          return (
            <li key={post.id}>
              <Link href={`/posts/${post.slug}`}>
                {post.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}

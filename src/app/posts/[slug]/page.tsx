import { queryPost } from '~/queries/query-post';
import { queryPostContent } from '~/queries/query-post-content';
import { Markdown } from './(components)/markdown';

interface PageParams {
  slug: string;
}

export default async function Page({ params: { slug } }: { params: PageParams }) {
  const post = await queryPost({ slug });
  const postContent = await queryPostContent({ slug });

  return (
    <main>
      <h1>{post.title}</h1>

      <div className="prose">
        <Markdown markdown={postContent} />
      </div>
    </main>
  );
}

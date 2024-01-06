import { notFound } from "next/navigation";
import { type JSX } from "react";
import { Article } from "~/components/article";
import { queryPost } from "~/queries/query-post";
import { queryPostMarkdown } from "~/queries/query-post-markdown";
import { Markdown } from "./(components)/markdown";
import { Outline } from "./(components)/outline";

interface PageParameters {
  slug: string;
}

async function Page({
  params: { slug },
}: {
  params: PageParameters;
}): Promise<JSX.Element> {
  const post = await queryPost({ slug });
  const markdown = await queryPostMarkdown({ slug });

  if (post === null || markdown === null) {
    notFound();
  }

  return (
    <main>
      <h1>{post.title}</h1>

      <Article>
        <Markdown markdown={markdown} />
      </Article>

      <Outline markdown={markdown} />
    </main>
  );
}

export default Page;

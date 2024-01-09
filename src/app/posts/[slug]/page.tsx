import Image from "next/image";
import { notFound } from "next/navigation";
import { type JSX } from "react";
import { Article } from "~/components/article";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/avatar";
import { queryPost } from "~/queries/query-post";
import { queryPostMarkdown } from "~/queries/query-post-markdown";
import { Markdown } from "./(components)/markdown";
import { Outline } from "./(components)/outline";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/select";
import { AmericanFlag, JapaneseFlag } from "~/components/country-flag";

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
    <div className="grid grid-cols-[50rem_20rem] justify-center gap-x-8">
      <main className="">
        <Image
          src={post.coverImageUrl.toString()}
          alt={post.title}
          width={1280}
          height={800}
          className="w-full h-[20rem]"
        />

        <h1 className="text-4xl font-semibold mt-8 leading-tight">
          {post.title}
        </h1>

        <div className="flex gap-x-4 mt-8">
          <Avatar className="w-12 h-12">
            <AvatarImage src={post.createdBy.avatarImageUrl.toString()} />

            <AvatarFallback>{post.createdBy.name}</AvatarFallback>
          </Avatar>

          <div className="flex flex-col gap-y-1">
            <div className="">{post.createdBy.name}</div>

            <div className="text-xs text-gray-500">
              {`Last edited on ${new Intl.DateTimeFormat().format(
                post.lastEditedAt
              )}`}
            </div>
          </div>
        </div>

        <Article className="mt-8 @container">
          <Markdown markdown={markdown} />
        </Article>
      </main>

      <nav className="sticky top-0 self-stretch py-6 flex flex-col gap-y-6">
        <div className="flex flex-col items-end">
          <Select defaultValue="ja-JP">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Locale" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="en-US">
                <div className="flex items-center gap-x-1.5">
                  <AmericanFlag className="w-4 h-4" />

                  {"English"}
                </div>
              </SelectItem>

              <SelectItem value="ja-JP">
                <div className="flex items-center gap-x-1.5">
                  <JapaneseFlag className="w-4 h-4" />

                  {"日本語"}
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Outline postSlug={post.slug} markdown={markdown} />
      </nav>
    </div>
  );
}

export default Page;

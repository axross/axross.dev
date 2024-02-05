import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from "react";
import { type BlogPosting, type WithContext } from "schema-dts";
import { getConfig } from "~/helpers/config";
import { type Post } from "~/models/post";

function buildJsonLd({ post }: { post: Post }): BlogPosting {
  const config = getConfig();

  const jsonLd: WithContext<BlogPosting> = {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    "@context": "https://schema.org",
    // eslint-disable-next-line @typescript-eslint/naming-convention
    "@type": "BlogPosting",
    url: `${config.website.urlOrigin}/posts/${post.slug}`,
    name: `${post.title} | ${config.website.title}`,
    headline: post.title,
    description: post.summary,
    author: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      "@type": "Person",
      name: post.createdBy.name,
      email: post.createdBy.email,
      url: `${config.website.urlOrigin}/`,
    },
    keywords: post.keywords,
    image: post.coverImageUrl.toString(),
    thumbnailUrl: post.coverImageUrl.toString(),
    dateCreated: post.createdAt.toISOString(),
    dateModified: post.lastEditedAt.toISOString(),
  };

  return jsonLd;
}

const JsonLd = forwardRef<
  ElementRef<"script">,
  Omit<
    ComponentPropsWithoutRef<"script">,
    "dangerouslySetInnerHTML" | "type"
  > & { readonly post: Post }
>(({ post, ...props }, ref) => {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        // eslint-disable-next-line @typescript-eslint/naming-convention
        __html: JSON.stringify(buildJsonLd({ post })),
      }}
      ref={ref}
      {...props}
    />
  );
});

JsonLd.displayName = "JsonLd";

export { JsonLd };

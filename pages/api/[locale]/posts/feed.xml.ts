import { max } from "date-fns";
import Mustache from "mustache";
import type { NextApiHandler } from "next";
import { getAllPosts } from "../../../../adapters/post-repository";
import { AUTHOR_NAME } from "../../../../constants/author";
import { getLocales } from "../../../../helpers/localization";

const handler: NextApiHandler = async (req, res) => {
  const locale = req.query.locale as string;
  const alternativeLocales: string[] = getLocales().filter((l) => l !== locale);
  const posts = await getAllPosts({ locale });

  res.statusCode = 200;
  res.setHeader("content-type", "application/xml");
  res.end(
    Mustache.render(TEMPLATE, {
      origin: process.env.NEXT_PUBLIC_SELF_ORIGIN,
      mostLastPublishedAt: max(
        posts.map((post) => new Date(post.lastPublishedAt))
      ).toISOString(),
      authorName: AUTHOR_NAME,
      locale,
      alternativeLocales,
      posts: posts.map((post) => ({ ...post, authorName: AUTHOR_NAME })),
    })
  );
};

const TEMPLATE = `
<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <id>{{origin}}/{{locale}}/posts/feed.xml</id>
  <title>Posts in {{origin}}</title>
  <updated>{{mostLastPublishedAt}}</updated>

  <author>
    <name>{{authorName}}</name>
    <uri>{{origin}}/{{locale}}</uri>
  </author>

  <link rel="self" href="{{origin}}/{{locale}}/posts/feed.xml"/>
  {{#alternativeLocales}}
  <link rel="alternate" hreflang="{{.}}" href="{{origin}}/{{.}}/posts/feed.xml"/>
  {{/alternativeLocales}}

  {{#posts}}
  <entry>
    <id>{{origin}}/{{locale}}/posts/{{slug}}</id>
    <title>{{title}}</title>
    <updated>{{lastPublishedAt}}</updated>
    <author>
      <name>{{authorName}}</name>
      <uri>{{origin}}/{{locale}}</uri>
    </author>
    <summary>{{description}}</summary>
  </entry>
  {{/posts}}
</feed>
`.trimStart();

export default handler;

import { max } from "date-fns";
import Mustache from "mustache";
import type { NextApiHandler } from "next";
import { getPostEntryListJson } from "../../../adapters/cms";
import { WEBSITE_ORIGIN } from "../../../constants/app";
import { AVAILABLE_LOCALES } from "../../../constants/locale";
import { getLocaleFromQueryWithFallback } from "../../../helpers/i18n";

const handler: NextApiHandler = async (req, res) => {
  const locale = getLocaleFromQueryWithFallback(req.query);
  const alternativeLocales = AVAILABLE_LOCALES.filter((l) => l !== locale);

  const posts = await getPostEntryListJson({ locale });

  res.statusCode = 200;
  res.setHeader("content-type", "application/xml");
  res.end(
    Mustache.render(TEMPLATE, {
      origin: WEBSITE_ORIGIN,
      mostLastPublishedAt: max(
        posts.map((post) => new Date(post.lastPublishedAt))
      ).toISOString(),
      authorName: posts[0]!.author.name,
      locale,
      alternativeLocales,
      posts: posts.map((post) => ({ ...post, authorName: post.author.name })),
    })
  );
};

const TEMPLATE = `
<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <id>{{origin}}/posts/feed.xml?hl={{locale}}</id>
  <title>Posts in {{origin}}</title>
  <updated>{{mostLastPublishedAt}}</updated>

  <author>
    <name>{{authorName}}</name>
    <uri>{{origin}}/?hl={{locale}}</uri>
  </author>

  <link rel="self" href="{{origin}}/posts/feed.xml?hl={{locale}}"/>
  {{#alternativeLocales}}
  <link rel="alternate" hreflang="{{.}}" href="{{origin}}/posts/feed.xml?hl={{.}}"/>
  {{/alternativeLocales}}

  {{#posts}}
  <entry>
    <id>{{origin}}/posts/{{slug}}?hl={{locale}}</id>
    <title>{{title}}</title>
    <updated>{{lastPublishedAt}}</updated>
    <author>
      <name>{{authorName}}</name>
      <uri>{{origin}}/?hl={{locale}}</uri>
    </author>
    <summary>{{description}}</summary>
  </entry>
  {{/posts}}
</feed>
`.trimStart();

export default handler;

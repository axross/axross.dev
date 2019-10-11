import { DEFAULT_LOCALE } from "../constant/locale";
import BlogPost from "../entities/BlogPost";
import LocaleString from "../entities/LocaleString";

export function parseJsonToBlogPost(
  json: Record<string, any> | null
): BlogPost | null {
  if (!json) {
    return null;
  }

  return {
    id: json.id,
    createdAt: new Date(json.createdAt),
    lastModifiedAt: new Date(json.lastModifiedAt),
    title: json.title,
    summary: json.summary,
    body: json.body
  };
}

export function parseContentfulEntryToBlogPost(entry: any): BlogPost {
  const _sys = { ...entry.sys };
  const _fields = { ...entry.fields };

  return {
    id: _fields.slug,
    createdAt: new Date(_sys.createdAt),
    lastModifiedAt: new Date(_sys.updatedAt),
    title: _fields.title,
    summary: _fields.summary,
    body: _fields.body
  };
}

export function parseMultiLocaleContentfulEntryToBlogPost(
  entry: any,
  locale: LocaleString
): BlogPost {
  const fields: Record<string, any> = {};
  const keys = Object.keys(entry.fields);

  for (const key of keys) {
    let value = entry.fields[key][locale];

    if (value === undefined) {
      value = entry.fields[key][DEFAULT_LOCALE];
    }

    fields[key] = value;
  }

  return parseContentfulEntryToBlogPost({ sys: entry.sys, fields });
}

export function jsonifyBlogPost(
  blogPost: BlogPost | null
): Record<string, any> | null {
  if (!blogPost) {
    return null;
  }

  return {
    id: blogPost.id,
    createdAt: blogPost.createdAt.toISOString(),
    lastModifiedAt: blogPost.lastModifiedAt.toISOString(),
    title: blogPost.title,
    summary: blogPost.summary,
    body: blogPost.body
  };
}

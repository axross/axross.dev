import { z } from "zod";
import { Post } from "~/models/post";

const zNotionPage = z.object({
  id: z.string().uuid(),
  object: z.literal("page"),
  properties: z.object({}),
});

const zNotionRichTextProp = z.object({
  id: z.string().min(1),
  type: z.literal("rich_text"),
  rich_text: z.array(z.object({
    type: z.enum(["text", "mention", "equation"]),
    plain_text: z.string(),
  })),
});

const zNotionRichTextPropDeserialized = zNotionRichTextProp.transform(({ rich_text }) => {
  let value = "";
  
  for (const node of rich_text) {
    value += node.plain_text
  }

  return value;
});

const zNotionTitleProp = zNotionRichTextProp.omit({ rich_text: true }).extend({
  type: z.literal("title"),
  title: zNotionRichTextProp.shape.rich_text,
});

const zNotionTitlePropDeserialized = zNotionTitleProp.transform(({ title }) => {
  let value = "";
  
  for (const node of title) {
    value += node.plain_text
  }

  return value;
});

const zNotionSelectProp = z.object({
  id: z.string().min(1),
  type: z.literal("select"),
  select: z.object({
    id: z.string().min(1),
    name: z.string(),
  }),
});

const zNotionSelectPropDeserialized = zNotionSelectProp.transform(({ select }) => {
  return select.name;
});

const zNotionStatusProp = zNotionSelectProp.omit({ select: true }).extend({
  type: z.literal("status"),
  status: zNotionSelectProp.shape.select,
});

const zNotionStatusPropDeserialized = zNotionStatusProp.transform(({ status }) => {
  return status.name;
});

const zNotionMultiSelectProp = z.object({
  id: z.string().min(1),
  type: z.literal("multi_select"),
  multi_select: z.array(z.object({
    id: z.string().min(1),
    name: z.string(),
  })),
});

const zNotionMultiSelectPropDeserialized = zNotionMultiSelectProp.transform(({ multi_select }) => {
  return multi_select.map(item => item.name);
});

const zNotionCreatedTimeProp = z.object({
  id: z.string().min(1),
  type: z.literal("created_time"),
  created_time: z.string().datetime(),
});

const zNotionCreatedTimePropDeserialized = zNotionCreatedTimeProp.transform(({ created_time }) => {
  return new Date(created_time);
});

const zNotionLastEditedTimeProp = zNotionCreatedTimeProp.omit({ created_time: true }).extend({
  type: z.literal("last_edited_time"),
  last_edited_time: zNotionCreatedTimeProp.shape.created_time,
});

const zNotionLastEditedTimePropDeserialized = zNotionLastEditedTimeProp.transform(({ last_edited_time }) => {
  return new Date(last_edited_time);
});

const zPostNotionPage = zNotionPage.omit({ properties: true }).extend({
  properties: z.object({
    Title: zNotionTitleProp,
    Slug: zNotionRichTextProp,
    Status: zNotionStatusProp,
    Locale: zNotionSelectProp,
    Tags: zNotionMultiSelectPropDeserialized,
    'Created at': zNotionCreatedTimeProp,
    'Last edited at': zNotionLastEditedTimeProp,
  }),
});

const zPostNotionPageDeserialized = zPostNotionPage.extend({
  properties: z.object({
    Title: zNotionTitlePropDeserialized,
    Slug: zNotionRichTextPropDeserialized,
    Status: zNotionStatusPropDeserialized,
    Locale: zNotionSelectPropDeserialized,
    Tags: zNotionMultiSelectPropDeserialized,
    'Created at': zNotionCreatedTimePropDeserialized,
    'Last edited at': zNotionLastEditedTimePropDeserialized,
  }),
}).transform<Post>(value => {
  return {
    id: value.id,
    slug: value.properties.Slug,
    locale: value.properties.Locale,
    title: value.properties.Title,
    tags: value.properties.Tags,
    createdAt: value.properties['Created at'],
    lastEditedAt: value.properties["Last edited at"]
  };
});

export function parsePostNotionPage(page: z.infer<typeof zNotionPage>): Post {
  return zPostNotionPageDeserialized.parse(page);
}

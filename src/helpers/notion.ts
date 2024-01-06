/* eslint-disable @typescript-eslint/naming-convention */

import { z } from "zod";
import { type Post } from "~/models/post";

const zNotionPage = z.object({
  id: z.string().uuid(),
  object: z.literal("page"),
  properties: z.object({}),
});

const zNotionRichTextProperty = z.object({
  id: z.string().min(1),
  type: z.literal("rich_text"),
  rich_text: z.array(
    z.object({
      type: z.enum(["text", "mention", "equation"]),
      plain_text: z.string(),
    })
  ),
});

const zNotionRichTextPropertyDeserialized = zNotionRichTextProperty.transform(
  ({ rich_text }) => {
    let value = "";

    for (const node of rich_text) {
      value += node.plain_text;
    }

    return value;
  }
);

const zNotionTitleProperty = zNotionRichTextProperty
  .omit({ rich_text: true })
  .extend({
    type: z.literal("title"),
    title: zNotionRichTextProperty.shape.rich_text,
  });

const zNotionTitlePropertyDeserialized = zNotionTitleProperty.transform(
  ({ title }) => {
    let value = "";

    for (const node of title) {
      value += node.plain_text;
    }

    return value;
  }
);

const zNotionSelectProperty = z.object({
  id: z.string().min(1),
  type: z.literal("select"),
  select: z.object({
    id: z.string().min(1),
    name: z.string(),
  }),
});

const zNotionSelectPropertyDeserialized = zNotionSelectProperty.transform(
  ({ select }) => {
    return select.name;
  }
);

const zNotionStatusProperty = zNotionSelectProperty
  .omit({ select: true })
  .extend({
    type: z.literal("status"),
    status: zNotionSelectProperty.shape.select,
  });

const zNotionStatusPropertyDeserialized = zNotionStatusProperty.transform(
  ({ status }) => {
    return status.name;
  }
);

const zNotionMultiSelectProperty = z.object({
  id: z.string().min(1),
  type: z.literal("multi_select"),
  multi_select: z.array(
    z.object({
      id: z.string().min(1),
      name: z.string(),
    })
  ),
});

const zNotionMultiSelectPropertyDeserialized =
  zNotionMultiSelectProperty.transform(({ multi_select }) => {
    return multi_select.map((item) => {
      return item.name;
    });
  });

const zNotionCreatedTimeProperty = z.object({
  id: z.string().min(1),
  type: z.literal("created_time"),
  created_time: z.string().datetime(),
});

const zNotionCreatedTimePropertyDeserialized =
  zNotionCreatedTimeProperty.transform(({ created_time }) => {
    return new Date(created_time);
  });

const zNotionLastEditedTimeProperty = zNotionCreatedTimeProperty
  .omit({ created_time: true })
  .extend({
    type: z.literal("last_edited_time"),
    last_edited_time: zNotionCreatedTimeProperty.shape.created_time,
  });

const zNotionLastEditedTimePropertyDeserialized =
  zNotionLastEditedTimeProperty.transform(({ last_edited_time }) => {
    return new Date(last_edited_time);
  });

const zPostNotionPage = zNotionPage.omit({ properties: true }).extend({
  properties: z.object({
    Title: zNotionTitleProperty,
    Slug: zNotionRichTextProperty,
    Status: zNotionStatusProperty,
    Locale: zNotionSelectProperty,
    Tags: zNotionMultiSelectPropertyDeserialized,
    "Created at": zNotionCreatedTimeProperty,
    "Last edited at": zNotionLastEditedTimeProperty,
  }),
});

const zPostNotionPageDeserialized = zPostNotionPage
  .extend({
    properties: z.object({
      Title: zNotionTitlePropertyDeserialized,
      Slug: zNotionRichTextPropertyDeserialized,
      Status: zNotionStatusPropertyDeserialized,
      Locale: zNotionSelectPropertyDeserialized,
      Tags: zNotionMultiSelectPropertyDeserialized,
      "Created at": zNotionCreatedTimePropertyDeserialized,
      "Last edited at": zNotionLastEditedTimePropertyDeserialized,
    }),
  })
  .transform<Post>((value) => {
    return {
      id: value.id,
      slug: value.properties.Slug,
      locale: value.properties.Locale,
      title: value.properties.Title,
      tags: value.properties.Tags,
      createdAt: value.properties["Created at"],
      lastEditedAt: value.properties["Last edited at"],
    };
  });

export function parsePostNotionPage(page: z.infer<typeof zNotionPage>): Post {
  return zPostNotionPageDeserialized.parse(page);
}

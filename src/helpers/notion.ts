/* eslint-disable @typescript-eslint/naming-convention */

import { z } from "zod";
import { type Author, type Post } from "~/models/post";

const zNotionPage = z.object({
  id: z.string().uuid(),
  object: z.literal("page"),
  properties: z.object({}),
});

const zNotionFile = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("file"),
    file: z.object({
      url: z.string().url(),
    }),
  }),
  z.object({
    type: z.literal("external"),
    external: z.object({
      url: z.string().url(),
    }),
  }),
]);

const zNotionFileDeserialized = zNotionFile.transform((value) => {
  if (value.type === "file") {
    return value.file.url;
  }

  return value.external.url;
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

const zNotionDateProperty = z.object({
  id: z.string().min(1),
  type: z.literal("date"),
  date: z
    .object({
      start: z.string().min(1),
    })
    .nullable(),
});

const zNotionDatePropertyDeserialized = zNotionDateProperty.transform(
  ({ date }) => {
    if (date === null) {
      return null;
    }

    return new Date(date.start);
  }
);

const zNotionCreatedByProperty = z.object({
  id: z.string().min(1),
  type: z.literal("created_by"),
  created_by: z.object({
    object: z.literal("user"),
    id: z.string().min(1),
    name: z.string(),
    avatar_url: z.string().url(),
  }),
});

const zNotionCreatedByPropertyDeserializable =
  zNotionCreatedByProperty.transform<Author>((value) => {
    return {
      name: value.created_by.name,
      avatarImageUrl: new URL(value.created_by.avatar_url),
    };
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
  cover: z.discriminatedUnion("type", [
    z.object({
      type: z.literal("file"),
      file: z.object({
        url: z.string().url(),
      }),
    }),
    z.object({
      type: z.literal("external"),
      external: z.object({
        url: z.string().url(),
      }),
    }),
  ]),
  properties: z.object({
    Title: zNotionTitleProperty,
    Slug: zNotionRichTextProperty,
    Status: zNotionStatusProperty,
    Locale: zNotionSelectProperty,
    Tags: zNotionMultiSelectPropertyDeserialized,
    "Created at": zNotionCreatedTimeProperty,
    "Created by": zNotionCreatedByProperty,
    "Last edited at": zNotionLastEditedTimeProperty,
    "Last edited at (override)": zNotionDateProperty,
  }),
});

const zPostNotionPageDeserialized = zPostNotionPage
  .extend({
    cover: zNotionFileDeserialized,
    properties: z.object({
      Title: zNotionTitlePropertyDeserialized,
      Slug: zNotionRichTextPropertyDeserialized,
      Status: zNotionStatusPropertyDeserialized,
      Locale: zNotionSelectPropertyDeserialized,
      Tags: zNotionMultiSelectPropertyDeserialized,
      "Created at": zNotionCreatedTimePropertyDeserialized,
      "Created by": zNotionCreatedByPropertyDeserializable,
      "Last edited at": zNotionLastEditedTimePropertyDeserialized,
      "Last edited at (override)": zNotionDatePropertyDeserialized,
    }),
  })
  .transform<Post>((value) => {
    return {
      id: value.id,
      slug: value.properties.Slug,
      locale: value.properties.Locale,
      title: value.properties.Title,
      tags: value.properties.Tags,
      coverImageUrl: new URL(value.cover),
      createdAt: value.properties["Created at"],
      createdBy: value.properties["Created by"],
      lastEditedAt:
        value.properties["Last edited at (override)"] ??
        value.properties["Last edited at"],
    };
  });

export function parsePostNotionPage(page: z.infer<typeof zNotionPage>): Post {
  return zPostNotionPageDeserialized.parse(page);
}

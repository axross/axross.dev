import { Story, Meta } from "@storybook/react";
import * as React from "react";
import {
  TableOfContents,
  TableOfContentsItem,
  TableOfContentsProps,
} from "./table-of-contents";

export default {
  title: "Components/TableOfContents",
  component: TableOfContents,
  argTypes: {
    className: { control: false },
  },
  args: {},
  parameters: {
    initialRoute: { pathname: "/path/to/[page]", asPath: "/path/to/page" },
  },
} as Meta;

export const Example: Story<TableOfContentsProps> = (props) => (
  <TableOfContents {...props}>
    <TableOfContentsItem targetId="1-1" level={2}>
      Enim lobortis scelerisque fermentum dui faucibus in ornare quam
    </TableOfContentsItem>

    <TableOfContentsItem targetId="1-2-1" level={3}>
      Sagittis purus sit amet volutpat
    </TableOfContentsItem>

    <TableOfContentsItem targetId="1-2-2" level={3}>
      Maecenas sed enim ut sem viverra aliquet
    </TableOfContentsItem>

    <TableOfContentsItem targetId="1-2-2-1" level={4}>
      Posuere morbi
    </TableOfContentsItem>

    <TableOfContentsItem targetId="1-2-2-2" level={4}>
      Lectus proin nibh nisl condimentum id venenatis a condimentum vitae
    </TableOfContentsItem>

    <TableOfContentsItem targetId="1-3" level={2}>
      Felis eget nunc lobortis mattis. Velit laoreet id donec ultrices tincidunt
    </TableOfContentsItem>

    <TableOfContentsItem targetId="1-3-1" level={3}>
      Id venenatis a condimentum
    </TableOfContentsItem>

    <TableOfContentsItem targetId="1-4" level={2}>
      Eu scelerisque felis imperdiet proin fermentum leo vel orci porta
    </TableOfContentsItem>

    <TableOfContentsItem targetId="1-4-1" level={3}>
      Habitant
    </TableOfContentsItem>

    <TableOfContentsItem targetId="1-4-1-1" level={4}>
      Nulla facilisi
    </TableOfContentsItem>

    <TableOfContentsItem targetId="1-4-1-1-1" level={5}>
      Odio
    </TableOfContentsItem>

    <TableOfContentsItem targetId="1-4-2" level={3}>
      Duis at consectetur lorem donec massa
    </TableOfContentsItem>

    <TableOfContentsItem targetId="1-5" level={2}>
      Sed adipiscing diam donec
    </TableOfContentsItem>
  </TableOfContents>
);

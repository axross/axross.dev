import * as React from "react";
import { Story, Meta } from "@storybook/react";
import { AsideNavigation, AsideNavigationProps } from "./aside-navigation";

const posts = [
  {
    slug: "a07c7e36-4cc7-4edf-9383-be11cb422ec1",
    title: "aliquid autem eius et non iure vitae",
  },
  {
    slug: "dfe0e318-0907-4798-8463-cbf9b0ff0926",
    title: "officiis alias est amet illo saepe omnis",
  },
  {
    slug: "8925060a-c590-4c50-85d3-eb8aedee84b1",
    title: "fugiat delectus aut voluptatem beatae voluptatem ab",
  },
  {
    slug: "b4a2a0c1-41d9-4e03-aec1-20b57358617a",
    title: "fugit recusandae aut veniam eos maxime doloribus iure ut quia",
  },
  {
    slug: "40c25287-aa2e-448c-a2f5-27878e9cc3aa",
    title:
      "dolores laudantium est exercitationem accusamus voluptates ea odio labore",
  },
  { slug: "6a914fb4-c3cf-4645-889a-f9565bc845be", title: "doloribus" },
  {
    slug: "a327ef79-f858-4d4d-9635-786b298f088c",
    title: "vel maiores id sapiente voluptatem",
  },
  { slug: "0366aa0e-3aa0-478a-9c77-41f18cc09b4f", title: "libero" },
  {
    slug: "e0d2ef14-7c95-4349-915a-396a954df124",
    title:
      "porro ut molestias at exercitationem officiis veritatis illum dolores molestias",
  },
  {
    slug: "3752118d-55f6-4333-8833-5fc15226cf1b",
    title: "non perspiciatis est magnam",
  },
  {
    slug: "5e8b9c73-f715-48de-b698-14a54d863a8c",
    title:
      "doloribus necessitatibus veniam magni sed quia sit quo culpa corrupti praesentium beatae",
  },
  {
    slug: "9feb3159-06d0-49a7-92e1-c88d8042ca71",
    title: "et rem voluptas porro quia voluptatum eius vero hic a consectetur",
  },
  { slug: "13ff88c4-1453-413b-ae2e-108f27411429", title: "fugiat repudiandae" },
  { slug: "01cbfcb4-5dad-4a4d-949f-2ac090a3f064", title: "a" },
  {
    slug: "f9643ba8-40fe-43bd-9c63-ca5aae7fdab4",
    title:
      "voluptatem placeat facilis amet aut minus nesciunt autem aliquam qui",
  },
  {
    slug: "95157aca-696d-49bf-81d8-e003eb82349d",
    title:
      "numquam praesentium eveniet dolorem veniam harum quos ad nihil tempore",
  },
  {
    slug: "710d1f37-8c69-4bdd-b8aa-06c02b3e4c76",
    title: "id qui voluptas numquam quae",
  },
  { slug: "c2e426fa-7189-46ec-9282-8ae529adc5bb", title: "quibusdam" },
  {
    slug: "c9875243-965b-4024-bda8-fe1dadea42d1",
    title: "quia consequatur mollitia ut dolore minima culpa",
  },
  {
    slug: "422c7b49-0e90-4396-b31b-d141980cd8ca",
    title: "a dolores unde in velit",
  },
];

const tableOfContents = [
  {
    id: "c20e1398-5b65-4c1b-8358-ebbe08ea479a",
    level: 2,
    text: "in aut natus eius nesciunt",
  },
  {
    id: "adee5cd0-10d0-49b9-bc84-bcb4a21a0212",
    level: 3,
    text: "et quidem vel quaerat labore aut vero eaque",
  },
  {
    id: "71134849-6e99-4c30-baaf-a134b36504de",
    level: 3,
    text: "aut omnis saepe enim corrupti totam aut quasi magni",
  },
  {
    id: "1da1fec2-e77c-413b-8581-c3cf19578874",
    level: 4,
    text:
      "consequatur reprehenderit aut qui voluptatum tempora qui fugiat accusamus",
  },
  {
    id: "7a71e56d-354c-4fbc-a3d7-c1a4a31354cd",
    level: 3,
    text: "qui quia quo sunt",
  },
  {
    id: "018ad6fd-56ea-46df-a526-05be022267a7",
    level: 4,
    text: "est in inventore rerum",
  },
  {
    id: "9889e69e-2163-49be-b1f8-330dd90ec12a",
    level: 2,
    text: "voluptatem labore",
  },
  {
    id: "53cfe389-d691-4859-b7cb-29b72cd92052",
    level: 2,
    text: "odit voluptatum optio aliquam possimus alias a aut",
  },
  {
    id: "3703f87d-f1cf-4165-90f8-94772d705fa4",
    level: 3,
    text: "quia facilis neque tenetur voluptatem aperiam velit aliquam atque",
  },
  {
    id: "573433dc-dac7-4f36-881e-31a2c2c34222",
    level: 4,
    text:
      "rerum molestias hic harum at dignissimos accusamus assumenda placeat nihil autem commodi",
  },
  {
    id: "9036887d-d51a-4e18-aa7c-85276f76879a",
    level: 5,
    text:
      "accusamus eum commodi reprehenderit eius aspernatur autem maxime labore nulla qui autem",
  },
];

export default {
  title: "Components/AsideNavigation",
  component: AsideNavigation,
  argTypes: {},
  args: {
    posts,
    tableOfContents,
  },
  parameters: {
    initialRoute: {
      pathname: "/posts/[slug]",
      asPath: `/posts/${posts[2]!.slug}`,
    },
  },
} as Meta<AsideNavigationProps>;

export const Example: Story<AsideNavigationProps> = (props) => (
  <AsideNavigation {...props} />
);

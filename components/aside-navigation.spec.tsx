import { render } from "@testing-library/react";
import * as React from "react";
import { TestApp } from "../core/test-app";
import { AsideNavigation } from "./aside-navigation";

const posts = [
  { slug: "47qwqp", title: "aliquid autem eius et non iure vitae" },
  { slug: "lccd43", title: "officiis alias est amet illo saepe omnis" },
  { slug: "mrrw0e", title: "fugiat delectus aut voluptatem beatae ab" },
  { slug: "csvh21", title: "fugit recusandae aut veniam eos iure ut quia" },
  { slug: "pn04ii", title: "dolores laudantium est voluptates ea odio labore" },
  { slug: "6qem31", title: "doloribus" },
  { slug: "r5ylk0", title: "vel maiores id sapiente voluptatem" },
  { slug: "znq279", title: "libero" },
  { slug: "sg4g6o", title: "porro at exercitationem officiis illum molestias" },
  { slug: "sz3nty", title: "non perspiciatis est magnam" },
];

const tableOfContents = [
  { id: "zg2r6g", level: 2, text: "in aut natus eius nesciunt" },
  { id: "2sfiwl", level: 3, text: "et quidem vel labore aut vero eaque" },
  { id: "blmqmw", level: 3, text: "aut omnis saepe totam aut quasi magni" },
  {
    id: "gg51id",
    level: 4,
    text:
      "consequatur reprehenderit aut qui voluptatum tempora qui fugiat accusamus",
  },
  { id: "jzmtod", level: 3, text: "qui quia quo sunt" },
  { id: "1lpeq1", level: 4, text: "est in inventore rerum" },
  { id: "bf4cdf", level: 2, text: "voluptatem labore" },
  { id: "gu0a2v", level: 2, text: "odit voluptatum optio possimus alias aut" },
  { id: "lcm25k", level: 3, text: "quia facilis tenetur velit aliquam atque" },
  { id: "xw1lzt", level: 4, text: "rerum molestias hic harum at placeat" },
  { id: "lwzd8q", level: 5, text: "accusamus eius aspernatur labore nulla" },
];

describe("<AsideNavigation>", () => {
  it("renders the list of all posts and the table of contents of the article currently shown (when the user is at index page)", () => {
    const { getByTestId } = render(
      <TestApp
        router={{
          pathname: "/",
          asPath: "/",
        }}
      >
        <AsideNavigation
          posts={posts}
          tableOfContents={tableOfContents}
          data-testid="aside-navigation"
        />
      </TestApp>
    );

    expect(getByTestId("aside-navigation")).toMatchSnapshot();
  });

  it("renders the list of all posts and the table of contents of the article currently shown (when the user is at post page)", () => {
    const { getByTestId } = render(
      <TestApp
        router={{
          pathname: "/[locale]/posts/[slug]",
          asPath: "/en-us/posts/b4a2a0c1-41d9-4e03-aec1-20b57358617a",
        }}
      >
        <AsideNavigation
          posts={posts}
          tableOfContents={tableOfContents}
          data-testid="aside-navigation"
        />
      </TestApp>
    );

    expect(getByTestId("aside-navigation")).toMatchSnapshot();
  });
});

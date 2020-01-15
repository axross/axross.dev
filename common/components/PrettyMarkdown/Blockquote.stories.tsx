import * as React from "react";
import Blockquote from "./Blockquote";
import MarkdownLink from "./MarkdownLink";
import Paragraph from "./Paragraph";
import Strong from "./Strong";

export default { title: "PrettyMarkdown/Blockquote" };

export const paragraphsInside = () => (
  <div style={{ padding: "0 48px" }}>
    <Blockquote>
      <Paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget gravida cum sociis natoque penatibus et.
      </Paragraph>

      <Paragraph>
        Montes nascetur ridiculus mus mauris vitae.
      </Paragraph>
    </Blockquote>
  </div>
);

export const linksInside = () => (
  <div style={{ padding: "0 48px" }}>
    <Blockquote>
      <Paragraph>
        {"Also there's "}

        <Strong>
          <MarkdownLink href="https://github.com/egoist/vue-content-loader">
            egoist/vue-content-loader
          </MarkdownLink>
        </Strong>

        {" for Vue and "}

        <Strong>
          <MarkdownLink href="https://github.com/ngneat/content-loader">
            ngneat/content-loader
          </MarkdownLink>
        </Strong>

        {" for Angular. Usage is the same."}
      </Paragraph>
    </Blockquote>
  </div>
);

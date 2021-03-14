import { Story, Meta } from "@storybook/react";
import * as React from "react";
import { CodeBlock, CodeBlockProps } from "./code-block";

export default {
  title: "Components/CodeBlock",
  component: CodeBlock,
  argTypes: {
    className: { control: false },
    language: {
      control: {
        type: "select",
        options: ["html", "css", "ts", "tsx", "dart"],
      },
    },
    onCopyButtonClick: { action: "onCopyButtonClick" },
  },
  args: {
    language: "sh",
    value: `
npm install react@17.0.0 react-dom@17.0.0
    `.trim(),
  },
} as Meta;

export const TSR: Story<CodeBlockProps> = (props) => {
  return <CodeBlock {...props} />;
};

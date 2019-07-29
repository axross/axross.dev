import * as React from "react";
import useTranslation from "../hooks/useTranslation";
import Text, { TextColor, TextSize } from "./Text";

interface Props extends React.Attributes {
  createdAt: Date;
  lastModifiedAt: Date;
  className?: string;
}

function BlogPostTimestamp({ createdAt, lastModifiedAt, ...props }: Props) {
  const translation = useTranslation();

  return (
    <span {...props}>
      <Text color={TextColor.secondary} size={TextSize.caption}>
        {translation["blogPost.timestamp"](createdAt, lastModifiedAt)}
      </Text>
    </span>
  );
}

export default BlogPostTimestamp;

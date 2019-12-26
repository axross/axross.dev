import * as React from "react";
import ExternalLink from "./ExternalLink";
import Text from "./Text";

export default { title: "ExternalLink" };

export const text = () => (
  <ExternalLink href="https://google.com">
    <Text>This text is link.</Text>
  </ExternalLink>
);

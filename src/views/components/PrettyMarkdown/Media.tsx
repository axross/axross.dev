import * as React from "react";
import Image from "./Image";
import Video from "./Video";

interface Props extends React.Attributes {
  src: string;
  alt: string;
}

export default function Media({ src, ...props }: Props) {
  if (src.endsWith(".mp4")) {
    return <Video src={src} {...props} />;
  }

  return <Image src={src} {...props} />;
}

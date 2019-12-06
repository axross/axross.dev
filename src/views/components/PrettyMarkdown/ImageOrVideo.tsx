import * as React from "react";
import Image from './Image';
import Video from "./Video";

interface Props {
  src: string;
  alt: string;
}

export default function ImageOrVideo({ src, ...props }: Props) {
  if (src.endsWith(".mp4")) {
    return <Video src={src} {...props} />;
  }

  return <Image src={src} {...props} />;
}
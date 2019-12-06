import styled from "@emotion/styled";
import * as React from "react";

interface Props extends React.ImgHTMLAttributes<HTMLVideoElement> {
  src: string;
}

export default function Video({ src, ...props }: Props) {
  const ref = React.useRef<HTMLVideoElement>(null);
  const [srcs, setSrcs] = React.useState<string[]>([]);
  
  React.useEffect(() => {
    if (ref.current === null) return;
    if (typeof window.IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver((entries, observer) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;

        setSrcs([src]);

        observer.unobserve(entry.target);
      }
    });

    observer.observe(ref.current!);
  }, [src, ref.current]);

  return (
    <Root
      playsInline
      autoPlay
      loop
      muted
      ref={ref}
      {...props}
    >
      {srcs.map(src => <source src={src} type="video/mp4" />)}
    </Root>
  );
}

const Root = styled.video`
  box-sizing: border-box;
  max-width: 100%;
  height: auto;

  margin-inline-end: 8px;

  &:last-child {
    margin-inline-end: 0;
  }
`;

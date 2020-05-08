import styled from "@emotion/styled";
import * as React from "react";

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
}

export default function Image({ src, ...props }: Props) {
  const ref = React.useRef<HTMLImageElement>(null);
  const [_src, setSrc] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (ref.current === null) return;
    if (typeof window.IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver((entries, observer) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;

        setSrc(src);

        observer.unobserve(entry.target);
      }
    });

    observer.observe(ref.current!);
  }, [src, ref.current]);

  return (
    <Root src={_src as any} crossOrigin="anonymous" ref={ref} {...props} />
  );
}

const Root = styled.img`
  box-sizing: border-box;
  max-width: 100%;
  height: auto;

  margin-inline-end: 8px;

  &:last-child {
    margin-inline-end: 0;
  }
`;

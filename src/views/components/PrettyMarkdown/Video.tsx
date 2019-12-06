import styled from "@emotion/styled";
import * as React from "react";

interface Props extends React.ImgHTMLAttributes<HTMLVideoElement> {}

export default function Video(props: Props) {
  return (
    <Root
      playsInline
      autoPlay
      loop
      muted
      {...props}
    />
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

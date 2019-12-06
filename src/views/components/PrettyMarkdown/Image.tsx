import styled from "@emotion/styled";
import * as React from "react";

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {}

export default function Image(props: Props) {
  return (
    <Root
      {...{ loading: "lazy" }}
      {...props}
    />
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
`
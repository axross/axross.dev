import styled from "@emotion/styled";
import * as React from "react";

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  scale: number;
}

interface State {
  scaledWidth: number | null,
  scaledHeight: number | null,
}

class ScaledImage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.ref = React.createRef();
  }

  state: State = { scaledWidth: null, scaledHeight: null, };

  private ref: React.RefObject<HTMLImageElement>;

  componentDidMount() {
    const image = this.ref.current!;

    image.onload = () => {
      this.setState({
        scaledWidth: image.naturalWidth * this.props.scale,
        scaledHeight: image.naturalHeight * this.props.scale,
      });
    }

    if (this.props.src) {
      image.src = this.props.src;
    }
  }

  render() {
    const { scale, src, ...props } = this.props;

    return <Root
      _width={this.state.scaledWidth}
      _height={this.state.scaledHeight}
      ref={this.ref}
      {...props}
    />;
  }
}

const Root = styled.img<{_width: number | null, _height: number | null}>`
  ${({ _width }) => _width !== null ? `width: ${_width}px;` : ""}
  ${({ _height }) => _height !== null ? `height: ${_height}px;` : ""}
`

export default ScaledImage;

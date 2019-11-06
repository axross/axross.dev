import styled from "@emotion/styled";
import * as React from "react";

interface Props extends React.VideoHTMLAttributes<HTMLVideoElement> {
  scale: number;
  inline: boolean;
}

interface State {
  scaledWidth: number | null,
  scaledHeight: number | null,
}

class PrettyMarkdownVideo extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.ref = React.createRef();
  }

  state: State = { scaledWidth: null, scaledHeight: null, };

  private ref: React.RefObject<HTMLVideoElement>;

  componentDidMount() {
    const video = this.ref.current!;

    video.onloadedmetadata = () => {
      this.setState({
        scaledWidth: video.videoWidth * this.props.scale,
        scaledHeight: video.videoHeight * this.props.scale,
      });
    }

    if (this.props.src) {
      video.src = this.props.src;
    }
  }

  render() {
    const { scale, inline, src, ...props } = this.props;

    return <Root
      _width={this.state.scaledWidth}
      _height={this.state.scaledHeight}
      _inline={this.props.inline}
      ref={this.ref}
      autoPlay
      loop
      muted
      {...props}
    />;
  }
}

const Root = styled.video<{ _width: number | null, _height: number | null, _inline: boolean }>`
  ${({ _width }) => _width !== null ? `width: ${_width}px;` : ""}
  ${({ _height }) => _height !== null ? `height: ${_height}px;` : ""}
  ${({ _inline }) => _inline ? "display: inline-block;" : ""}
`

export default PrettyMarkdownVideo;

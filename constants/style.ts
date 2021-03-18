export const MAIN_COLUMN_WIDTH = 768;
export const ASIDE_COLUMN_WIDTH = 320;

export const RAINBOW_ANCHOR_CSS = `
  background-image: repeating-linear-gradient(
    to left,
    #ff6b6b,
    #feca57,
    #ff6b6b,
    #feca57,
    #ff6b6b,
    #feca57,
    #ff6b6b
  );
  background-repeat: repeat;
  background-size: 1280px 1280px;
  background-clip: text;
  -webkit-text-fill-color: currentColor;
`;

export const RAINBOW_HOVER_ANCHOR_CSS = `
  -webkit-text-fill-color: transparent;
  animation: rainbow-anchor 3000ms linear infinite;

  @keyframes rainbow-anchor {
    from {
      background-position-x: 0px;
    }

    to {
      background-position-x: 2048px;
    }
  }
`;

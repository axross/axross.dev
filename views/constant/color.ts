export interface ThemedColor {
  light: string;
  dark: string;
}

export enum ForegroundColor {
  normal,
  highlight,
  primary,
  primaryHighlight,
  secondary,
  secondaryHighlight
}

export const FOREGROUND_COLORS = new Map<ForegroundColor, ThemedColor>([
  [
    ForegroundColor.normal,
    {
      light: "#11427b",
      dark: "#e8e8c9"
    }
  ],
  [
    ForegroundColor.highlight,
    {
      light: "#0a2b52",
      dark: "#ffffde"
    }
  ],
  [
    ForegroundColor.primary,
    {
      light: "#db5a44",
      dark: "#fe9583"
    }
  ],
  [
    ForegroundColor.primaryHighlight,
    {
      light: "#f75539",
      dark: "#efefef"
    }
  ],
  [
    ForegroundColor.secondary,
    {
      light: "#667985",
      dark: "#e8e8c980"
    }
  ],
  [
    ForegroundColor.secondaryHighlight,
    {
      light: "#bdd3de",
      dark: "#e8e8c940"
    }
  ]
]);

import * as React from "react";
import ThemedColor from "../types/ThemedColor";
import RawText, { Props as RawTextProps, TextSize, Typeface } from "./RawText";

interface Props extends React.Attributes {
  type?: UITextType;
  className?: string;
  children?: string;
}

export default function UIText({ type = UITextType.label, children, ...props }: Props) {
  return (
    <RawText {...UI_TEXT_TYPE[type]} {...props}>
      {children}
    </RawText>
  );
}

export enum UITextType {
  label,
  smallLabel,
  caption,
  subtitle,
  subtitle2,
  logo,
}

const UI_TEXT_TYPE: Record<UITextType, RawTextProps> = {
  [UITextType.label]: {
    size: TextSize.default,
    typeface: Typeface.body,
  },
  [UITextType.smallLabel]: {
    size: TextSize.small,
    typeface: Typeface.body,
  },
  [UITextType.caption]: {
    color: ThemedColor.secondaryForeground,
    size: TextSize.small,
    typeface: Typeface.body,
  },
  [UITextType.subtitle]: {
    color: ThemedColor.emphasizedForeground,
    size: TextSize.huge,
    typeface: Typeface.headline,
  },
  [UITextType.subtitle2]: {
    color: ThemedColor.emphasizedForeground,
    size: TextSize.large,
    typeface: Typeface.headline,
  },
  [UITextType.logo]: {
    color: ThemedColor.emphasizedForeground,
    typeface: Typeface.headline,
  },
};

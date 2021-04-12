import { css } from "@linaria/core";
import * as React from "react";
import { Facebook, Linkedin, Twitter } from "react-feather";
import {
  useFacebookShare,
  useLinkedinShare,
  useTwitterShare,
} from "../hooks/social-share";
import { ButtonListBalloon, ButtonListBaloonItem } from "./button-list-balloon";

export interface TextSelectionShareBalloonProps extends React.Attributes {
  /**
   *
   */
  shareUrl: string;
  /**
   * A function determine if the balloon should appear by `anchorNode` and `focusNode`. Return `true` to show the balloon.
   *
   * It always returns `true` if you don't pass a function.
   */
  disableWhen?: (anchorNode: Node, focusNode: Node) => boolean;
  /**
   * An event listener that gets called whenever you click the button in the ballon.
   */
  onButtonClick?: (
    e: React.MouseEvent,
    details: { type: string; selection: string }
  ) => void;
  className?: string;
  style?: React.CSSProperties;
}

export const TextSelectionShareBalloon: React.VFC<TextSelectionShareBalloonProps> = ({
  shareUrl,
  disableWhen = () => false,
  onButtonClick = () => {},
  className,
  ...props
}) => {
  const [rect, setRect] = React.useState<DOMRect | null>(null);
  const [text, setText] = React.useState("");
  const [initialScrollY, setInitialScrollY] = React.useState(
    globalThis.window?.scrollY ?? 0
  );
  const [scrollY, setScrollY] = React.useState(globalThis.window?.scrollY ?? 0);
  const shareOnTwitter = useTwitterShare({ url: shareUrl, text });
  const shareOnFacebook = useFacebookShare({ url: shareUrl, text });
  const shareOnLinkedin = useLinkedinShare({ url: shareUrl });

  React.useEffect(() => {
    const onScroll: EventListener = () => {
      setScrollY(globalThis.window.scrollY);
    };

    globalThis.document.addEventListener("scroll", onScroll);

    return () => {
      globalThis.document.removeEventListener("scroll", onScroll);
    };
  }, []);

  React.useEffect(() => {
    const onSelectionChange = () => {
      const selection = globalThis.document.getSelection();

      if (
        selection &&
        selection.type === "Range" &&
        selection.rangeCount >= 1 &&
        !disableWhen(selection.anchorNode!, selection.focusNode!)
      ) {
        const firstRect = selection.getRangeAt(0).getClientRects().item(0);

        setRect(firstRect);
        setText(selection.toString().replaceAll(/\s+/g, " "));
        setInitialScrollY(globalThis.window.scrollY);

        return;
      }

      setRect(null);
      setText("");
      setInitialScrollY(0);
    };

    globalThis.document.addEventListener("selectionchange", onSelectionChange);

    return () => {
      globalThis.document.removeEventListener(
        "selectionchange",
        onSelectionChange
      );
    };
  }, [disableWhen]);

  return (
    <ButtonListBalloon
      className={css`
        display: none;
        position: fixed;

        @media (hover: hover) and (pointer: fine) {
          display: block;
        }
      `}
      style={
        rect
          ? {
              top: rect.y - 64 - scrollY + initialScrollY,
              left: rect.x,
              opacity: 1,
              visibility: "visible",
            }
          : { opacity: 0, visibility: "hidden" }
      }
      {...props}
    >
      <ButtonListBaloonItem
        icon={<Twitter />}
        onClick={(e) => {
          onButtonClick(e, { type: "twitter", selection: text });

          shareOnTwitter();
        }}
      >
        Tweet
      </ButtonListBaloonItem>

      <ButtonListBaloonItem
        icon={<Linkedin />}
        onClick={(e) => {
          onButtonClick(e, { type: "linkedin", selection: text });

          shareOnLinkedin();
        }}
      >
        Share
      </ButtonListBaloonItem>

      <ButtonListBaloonItem
        icon={<Facebook />}
        onClick={(e) => {
          onButtonClick(e, { type: "facebook", selection: text });

          shareOnFacebook();
        }}
      >
        Share
      </ButtonListBaloonItem>
    </ButtonListBalloon>
  );
};

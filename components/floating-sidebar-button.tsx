import { css, cx } from "@linaria/core";
import { useRouter } from "next/router";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { List as ListIcon, X as XIcon } from "react-feather";
import { Button, ButtonSize, ButtonVariant } from "./button";

export interface FloatingSidebarButtonProps extends React.Attributes {
  closeOnRouteChange?: boolean;
  content: React.ReactNode;
  onButtonClick?: (e: React.MouseEvent, isMenuOpen: boolean) => void;
  className?: string;
  style?: React.CSSProperties;
}

export const FloatingSidebarButton: React.VFC<FloatingSidebarButtonProps> = ({
  closeOnRouteChange = true,
  content,
  onButtonClick = () => {},
  className,
  ...props
}) => {
  const router = useRouter();
  const floatingSidebarRef = React.useRef<HTMLDivElement>(null);
  const [isMenuOpen, setMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const onRouteChangeComplete = () => {
      setMenuOpen(false);

      setTimeout(() => {
        floatingSidebarRef.current?.scrollTo(0, 0);
      }, 300);
    };

    if (closeOnRouteChange) {
      router.events.on("routeChangeComplete", onRouteChangeComplete);
    }

    return () => {
      if (closeOnRouteChange) {
        router.events.off("routeChangeComplete", onRouteChangeComplete);
      }
    };
  }, [closeOnRouteChange]);

  return (
    <>
      {typeof globalThis.window !== "undefined"
        ? ReactDOM.createPortal(
            <Button
              variant={ButtonVariant.inverted}
              size={ButtonSize.xl}
              icon={isMenuOpen ? <XIcon /> : <ListIcon />}
              onClick={(e) => {
                onButtonClick(e, !isMenuOpen);
                setMenuOpen(!isMenuOpen);
              }}
              className={cx(
                css`
                  position: fixed;
                  bottom: calc(
                    env(safe-area-inset-bottom, 0px) + var(--space-md)
                  );
                  right: calc(
                    env(safe-area-inset-right, 0px) + var(--space-md)
                  );
                  z-index: 100000000;
                  touch-action: manipulation;
                `,
                className
              )}
              {...props}
            />,
            globalThis.document.body
          )
        : null}

      {typeof globalThis.window !== "undefined"
        ? ReactDOM.createPortal(
            <div
              className={css`
                position: fixed;
                top: 0;
                width: 100vw;
                max-width: 480px;
                height: 100vh;
                padding-block-start: var(--space-lg);
                padding-block-end: 80px;
                background-color: var(--color-bg-frosted);
                backdrop-filter: blur(8px);
                overflow-x: hidden;
                overflow-y: scroll;
                z-index: 10000000;
                transition: opacity 300ms ease-in-out 0ms,
                  visibility 300ms ease-in-out 0ms, right 300ms ease-in-out 0ms;
              `}
              style={
                isMenuOpen
                  ? {
                      right: 0,
                      visibility: "visible",
                      opacity: 1,
                    }
                  : {
                      right: -32,
                      visibility: "hidden",
                      opacity: 0,
                    }
              }
              ref={floatingSidebarRef}
              data-testid="floating-sidebar"
            >
              {content}
            </div>,
            globalThis.document.body
          )
        : null}
    </>
  );
};

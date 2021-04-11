import * as React from "react";

export type Share = () => void;

export function useTwitterShare({
  url,
  text,
}: {
  url: string;
  text?: string;
}): Share {
  const share = React.useCallback(() => {
    const windowUrl = new URL("https://twitter.com/intent/tweet");
    windowUrl.searchParams.set("url", url);

    if (text) {
      windowUrl.searchParams.set("text", text);
    }

    globalThis.window.open(windowUrl.href);
  }, [url, text]);

  return share;
}

export function useFacebookShare({
  url,
  text,
}: {
  url: string;
  text?: string;
}): Share {
  const share = React.useCallback(() => {
    const windowUrl = new URL("https://www.facebook.com/sharer/sharer.php");
    windowUrl.searchParams.set("u", url);

    if (text) {
      windowUrl.searchParams.set("quote", text);
    }

    globalThis.window.open(windowUrl.href);
  }, [url, text]);

  return share;
}

export function useLinkedinShare({ url }: { url: string }): Share {
  const share = React.useCallback(() => {
    const windowUrl = new URL(
      `https://www.linkedin.com/sharing/share-offsite/`
    );
    windowUrl.searchParams.set("mini", "true");
    windowUrl.searchParams.set("url", url);

    globalThis.window.open(windowUrl.href);
  }, [url]);

  return share;
}

"use client";

import { type JSX, useEffect, useRef } from "react";
// eslint-disable-next-line import/namespace, import/no-deprecated, import/default, import/no-named-as-default, import/no-named-as-default-member
import TopLoadingBar, { type LoadingBarRef } from "react-top-loading-bar";

function NavigationProgressBar(): JSX.Element {
  const topLoadingBarRef = useRef<LoadingBarRef>(null);

  useEffect(() => {
    // eslint-disable-next-line compat/compat
    const navigation = globalThis.window.navigation;
    const topLoadingBar = topLoadingBarRef.current;

    if (topLoadingBar && navigation !== undefined) {
      const onNavigate = (): void => {
        topLoadingBar.staticStart();
      };

      const onNavigateSuccess = (): void => {
        topLoadingBar.complete();
      };

      const onNavigateError = (): void => {
        topLoadingBar.complete();
      };

      navigation.addEventListener("navigate", onNavigate);
      navigation.addEventListener("navigatesuccess", onNavigateSuccess);
      navigation.addEventListener("navigateerror", onNavigateError);

      return () => {
        navigation.removeEventListener("navigate", onNavigate);
        navigation.removeEventListener("navigatesuccess", onNavigateSuccess);
        navigation.removeEventListener("navigateerror", onNavigateError);
      };
    }

    return () => {
      // do nothing
    };
  }, []);

  return <TopLoadingBar color="var(--action-9)" ref={topLoadingBarRef} />;
}

export { NavigationProgressBar };

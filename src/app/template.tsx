"use client";

import { type JSX, useEffect, useRef } from "react";
import TopLoadingBar, { type LoadingBarRef } from "react-top-loading-bar";

function Template({
  children,
}: {
  readonly children: JSX.Element;
}): JSX.Element {
  const topLoadingBarRef = useRef<LoadingBarRef>(null);

  useEffect(() => {
    const topLoadingBar = topLoadingBarRef.current;
    const navigation = (globalThis as any).navigation as Navigation | undefined;

    if (topLoadingBar && navigation) {
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

    return () => {};
  }, []);

  return (
    <>
      {children}

      <TopLoadingBar color="#3b82f6" ref={topLoadingBarRef} />
    </>
  );
}

export default Template;

"use client";

import { clsx } from "clsx";
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
  useCallback,
  useState,
} from "react";
import { Button } from "~/components/button";
import { useTranslation } from "~/helpers/translation.client";
import css from "./two-column-layout-aside.module.css";

const TwoColumnLayoutAside = forwardRef<
  ElementRef<"aside">,
  ComponentPropsWithoutRef<"aside">
>(({ className, children, ...props }, ref) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const onToggleButtonClick = useCallback(() => {
    setOpen((previous) => {
      return !previous;
    });
  }, []);

  return (
    <>
      <aside
        data-open={open ? "true" : undefined}
        aria-hidden={open ? undefined : "true"}
        className={clsx(css.root, className)}
        ref={ref}
        {...props}
      >
        <div className={css.content}>{children}</div>
      </aside>

      <Button
        variant={open ? "outline" : "solid"}
        intent="neutral"
        className={css["toggle-button"]}
        onClick={onToggleButtonClick}
      >
        {open ? t("Close") : t("Open")}
      </Button>
    </>
  );
});

TwoColumnLayoutAside.displayName = "TwoColumnLayoutAside";

export { TwoColumnLayoutAside };

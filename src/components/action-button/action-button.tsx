"use client";

import { clsx } from "clsx";
import {
  type ComponentProps,
  type ComponentType,
  type JSX,
  type MouseEvent,
  type ReactNode,
  startTransition,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Button } from "~/components/button";
import { Spinner } from "~/components/spinner";
import css from "./action-button.module.css";

const fallbackFinishedDuration = 1500;

function ActionButton({
  action,
  transition = false,
  doneDuration = fallbackFinishedDuration,
  icon: Icon,
  loadingChildren,
  doneIcon: DoneIcon,
  doneChildren,
  className,
  onClick,
  children,
  ...props
}: ComponentProps<typeof Button> & {
  readonly action: () => Promise<void>;
  readonly transition?: boolean;
  readonly done?: boolean;
  readonly icon?: ComponentType<{ className?: string }>;
  readonly loadingChildren?: ReactNode;
  readonly doneDuration?: number;
  readonly doneIcon?: ComponentType<{ className?: string }>;
  readonly doneChildren?: ReactNode;
}): JSX.Element {
  const [ongoingActions, setOngoingActions] = useState(0);
  const [justFinishedActions, setJustFinishedActions] = useState(0);

  const onButtonClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      if (onClick !== undefined) {
        onClick(event);
      }

      if (ongoingActions >= 1) {
        return;
      }

      if (transition) {
        startTransition(() => {
          setOngoingActions((actions) => {
            return actions + 1;
          });

          void action().then(() => {
            setOngoingActions((actions) => {
              return actions - 1;
            });
            setJustFinishedActions((actions) => {
              return actions + 1;
            });
          });
        });
      } else {
        setOngoingActions((actions) => {
          return actions + 1;
        });

        void action().then(() => {
          setOngoingActions((actions) => {
            return actions - 1;
          });
          setJustFinishedActions((actions) => {
            return actions + 1;
          });
        });
      }
    },
    [ongoingActions, transition, action, onClick],
  );

  useEffect(() => {
    if (justFinishedActions > 0) {
      const timeout = setTimeout(() => {
        setJustFinishedActions((actions) => {
          return actions - 1;
        });
      }, doneDuration);

      return () => {
        clearTimeout(timeout);
      };
    }

    return () => {
      // do nothing
    };
  }, [justFinishedActions, doneDuration]);

  const loading = ongoingActions >= 1;
  const done = justFinishedActions >= 1;
  const hasDoneState = doneChildren !== undefined;

  return (
    <Button
      aria-busy={loading ? "true" : undefined}
      data-loading={loading ? "" : undefined}
      data-done={done ? "" : undefined}
      onClick={onButtonClick}
      className={clsx(css.root, className)}
      {...props}
    >
      <span
        aria-hidden={loading || (hasDoneState && done) ? "true" : undefined}
        className={css.ready}
        data-testid="ready"
      >
        {Icon === undefined ? null : (
          <Icon className={css.icon} data-testid="icon" />
        )}

        {children}
      </span>

      <span
        aria-hidden={loading ? undefined : "true"}
        className={css.loading}
        data-testid="loading"
      >
        <Spinner className={css.spinner} data-testid="spinner" />

        {loadingChildren ?? children}
      </span>

      {hasDoneState ? (
        <span
          aria-hidden={loading || !done ? "true" : undefined}
          className={css.done}
          data-testid="done"
        >
          {DoneIcon === undefined ? null : (
            <DoneIcon className={css.icon} data-testid="icon" />
          )}

          {doneChildren}
        </span>
      ) : null}

      <span
        aria-hidden
        className={css["loading-spacer"]}
        data-testid="loading-spacer"
      >
        <Spinner className={css.spinner} data-testid="spinner" />

        {loadingChildren ?? children}
      </span>

      {hasDoneState ? (
        <span
          aria-hidden
          className={css["done-spacer"]}
          data-testid="done-spacer"
        >
          {DoneIcon === undefined ? null : (
            <DoneIcon className={css.icon} data-testid="icon" />
          )}

          {doneChildren}
        </span>
      ) : null}
    </Button>
  );
}

export { ActionButton };

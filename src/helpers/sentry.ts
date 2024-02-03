import { type Event, type EventHint, type Integration } from "@sentry/types";
import { type KnownError } from "~/helpers/error";

class HandleKnownError implements Integration {
  public static id = "HandleKnownError";

  public readonly name = "HandleKnownError";

  // eslint-disable-next-line class-methods-use-this
  public setupOnce(): void {
    // do nothing
  }

  // eslint-disable-next-line class-methods-use-this
  public processEvent(
    event: Event,
    hint: EventHint,
  ): Event | PromiseLike<Event | null> | null {
    if (
      hint.originalException instanceof Error &&
      hint.originalException.name === "KnownError"
    ) {
      const originalException = hint.originalException as KnownError;

      event.tags = {
        ...event.tags,
        // eslint-disable-next-line camelcase, @typescript-eslint/naming-convention
        known_code: originalException.code,
      };
    }

    return event;
  }
}

export { HandleKnownError };

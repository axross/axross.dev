// this file configures the initialization of Sentry on the server.
// the config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import { init } from "@sentry/nextjs";
import { HandleKnownError } from "~/helpers/sentry";

init({
  tracesSampleRate: 1,
  integrations: [new HandleKnownError()],
});

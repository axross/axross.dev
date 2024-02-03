// this file configures the initialization of Sentry for edge features (middleware, edge routes, and so on).
// the config you add here will be used whenever one of the edge features is loaded.
// note that this config is unrelated to the Vercel Edge Runtime and is also required when running locally.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import { init } from "@sentry/nextjs";
import { HandleKnownError } from "~/helpers/sentry";

init({
  tracesSampleRate: 1,
  debug: process.env.NODE_ENV !== "production",
  integrations: [new HandleKnownError()],
});

"use client";

import Image from "next/image";
import { type JSX, useEffect, useState } from "react";
import backgroundImage from "~/assets/black-drops.webp";
import { Button } from "~/components/button";
import { Spinner } from "~/components/spinner";
import { captureException } from "~/helpers/error";
import { baseFont } from "~/helpers/fonts";
import "~/variables.css";
import "./globals.css";

function GlobalError({
  error,
  reset,
}: {
  readonly error: Error & { digest?: string };
  readonly reset: () => void;
}): JSX.Element {
  const [eventId, setEventId] = useState<string | null>(null);

  useEffect(() => {
    const id = captureException(error, { tags: { digest: error.digest } });

    setEventId(id);
  }, [error]);

  return (
    <html lang="en">
      <body
        className={baseFont.className}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          blockSize: "100dvh",
          inlineSize: "100dvw",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            boxSizing: "border-box",
            maxInlineSize: "calc(100% - 2rem)",
            padding: "2rem",
            backgroundColor: "#000000bf",
            borderRadius: "0.625rem",
            backdropFilter: "blur(0.375rem)",
          }}
        >
          <h1
            style={{
              margin: 0,
              color: "#eeeef0",
              fontSize: "2.1875rem",
            }}
          >
            {"Oops!"}
          </h1>

          <div
            style={{
              marginBlockStart: "1rem",
              color: "#eeeef0",
              fontSize: "1rem",
            }}
          >
            {"It seems something went wrong."}
          </div>

          <Button
            variant="outline"
            intent="neutral"
            style={{
              marginBlockStart: "2rem",
              appearance: "none",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              minBlockSize: "2.5rem",
              blockSize: "2.5rem",
              paddingInline: "1rem",
              backgroundColor: "transparent",
              border: "1px solid #3c393f",
              borderRadius: "0.375rem",
              outline: "none",
              color: "#eeeef0",
              fontSize: "1rem",
              overflow: "hidden",
              cursor: "pointer",
              userSelect: "none",
              transition:
                "background-color cubic-bezier(0.4, 0, 0.2, 1) 200ms, border cubic-bezier(0.4, 0, 0.2, 1) 200ms",
            }}
            onClick={reset}
          >
            {"Try again"}
          </Button>

          <div
            style={{
              marginBlockStart: "1rem",
            }}
          >
            {eventId === null ? (
              <Spinner style={{ blockSize: 24, inlineSize: 24 }} />
            ) : (
              <span
                style={{
                  color: "#b5b2bc",
                  fontSize: "0.75rem",
                }}
              >
                {`This error is already caught on the backend. Reference ID: ${eventId}`}
              </span>
            )}
          </div>
        </div>

        <Image
          alt="Server Error"
          src={backgroundImage}
          placeholder="blur"
          quality={100}
          fill
          sizes="100vw"
          style={{
            objectFit: "cover",
            objectPosition: "center",
            zIndex: -1,
          }}
        />
      </body>
    </html>
  );
}

export default GlobalError;

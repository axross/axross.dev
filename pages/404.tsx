import { css } from "@linaria/core";
import { NextPageContext } from "next";
import Head from "next/head";
import * as React from "react";
import { Empty } from "../components/illustration";
import { WEBSITE_NAME } from "../constants/app";

interface PageProps extends NextPageContext {}

const Page: React.VFC<PageProps> = () => {
  return (
    <>
      <Head>
        <title>404 Not found - {WEBSITE_NAME}</title>
      </Head>

      <div
        className={css`
          width: 100vw;
          height: 100vh;
          padding-block-start: var(--space-xxl);
          padding-block-end: var(--space-xxl);
        `}
      >
        <main
          className={css`
            display: flex;
            height: 100%;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          `}
        >
          <Empty
            className={css`
              width: 384px;
            `}
          />

          <h1
            className={css`
              margin-block-start: var(--space-xl);
              margin-block-end: 0;
              font-size: var(--font-size-xxl);
            `}
          >
            404 Not found
          </h1>
        </main>
      </div>
    </>
  );
};

export default Page;

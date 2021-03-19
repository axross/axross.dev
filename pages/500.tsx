import { css } from "@linaria/core";
import { NextPage } from "next";
import Head from "next/head";
import * as React from "react";
import { Empty } from "../components/illustration";
import { WEBSITE_NAME } from "../constants/app";

const Page: NextPage = () => {
  return (
    <>
      <Head>
        <title>500 Internal Server Error - {WEBSITE_NAME}</title>
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
            500 Internal Server Error
          </h1>
        </main>
      </div>
    </>
  );
};

export default Page;

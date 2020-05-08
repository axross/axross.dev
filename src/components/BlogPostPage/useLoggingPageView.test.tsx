import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from "@jest/globals";
import * as React from "react";
import { act, create } from "react-test-renderer";
import BlogPost from "../../entities/BlogPost";
import MockApp from "../../../fixtures/MockApp";
import useLoggingPageView from "./useLoggingPageView";

describe("useLoggingPageView()", () => {
  const blogPost: BlogPost = {
    id: "BLOG_POST_ID",
    createdAt: new Date("2020-02-07T14:13:59-07:00"),
    lastModifiedAt: new Date("2020-02-07T14:14:02-07:00"),
    title: "BLOG_POST_TITLE",
    summary: "BLOG_POST_SUMMARY",
    body: "BLOG_POST_BODY",
  };

  beforeEach(() => {
    globalThis.ga = jest.fn() as any;
  });

  afterEach(() => {
    ((globalThis.ga as any) as ReturnType<typeof jest.fn>).mockRestore();
  });

  describe("if Google Analytics SDK is loaded", () => {
    describe("while the blog post is in loading", () => {
      it("doesn't call globalThis.ga()", async () => {
        function Component() {
          useLoggingPageView(blogPost, true);

          return null;
        }

        await act(async () => {
          create(
            <MockApp>
              <Component />
            </MockApp>
          );
        });
      });
    });

    describe("after the blog post loaded", () => {
      it("sets the location (URL) to the current Google Analytics session", async () => {
        function Component() {
          useLoggingPageView(blogPost, false);

          return null;
        }

        await act(async () => {
          create(
            <MockApp url={new URL("https://tests.kohei.dev/?hl=en-US")}>
              <Component />
            </MockApp>
          );
        });

        expect(globalThis.ga).toHaveBeenCalledWith(
          "set",
          "location",
          `https://tests.kohei.dev/?hl=en-US`
        );
      });

      it("sets the document title that contains blog post's title to the current Google Analytics session", async () => {
        function Component() {
          useLoggingPageView(blogPost, false);

          return null;
        }

        await act(async () => {
          create(
            <MockApp>
              <Component />
            </MockApp>
          );
        });

        expect(globalThis.ga).toHaveBeenCalledWith(
          "set",
          "title",
          expect.stringContaining(blogPost.title)
        );
      });

      it("sends a pageview", async () => {
        function Component() {
          useLoggingPageView(blogPost, false);

          return null;
        }

        await act(async () => {
          create(
            <MockApp>
              <Component />
            </MockApp>
          );
        });

        expect(globalThis.ga).toHaveBeenCalledWith("send", "pageview");
      });
    });
  });

  describe("if Google Analytics SDK is not loaded", () => {
    it("doesn't call globalThis.ga()", async () => {
      function Component() {
        useLoggingPageView(blogPost, false);

        return null;
      }

      await act(async () => {
        create(
          <MockApp>
            <Component />
          </MockApp>
        );
      });
    });
  });
});

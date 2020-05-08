import { describe, expect, it, jest } from "@jest/globals";
import * as React from "react";
import { act, create } from "react-test-renderer";
import BlogPost from "../../entities/BlogPost";
import MockApp from "../../fixtures/MockApp";
import Head from "./Head";

describe("<Head>", () => {
  const blogPost: BlogPost = {
    id: "BLOG_POST_ID",
    createdAt: new Date("2020-02-07T14:13:59-07:00"),
    lastModifiedAt: new Date("2020-02-10T14:16:27-07:00"),
    title: "BLOG_POST_TITLE",
    summary: "BLOG_POST_SUMMARY",
    body: "BLOG_POST_BODY",
  };

  describe('when currentLocale="en-US"', () => {
    describe("while loading the blog post", () => {
      it("pushes tags into <head> and they matches with the previous snapshots", async () => {
        const onHeadChange = jest.fn().mockName("onHeadChange");

        await act(async () => {
          create(
            <MockApp onHeadChange={onHeadChange} currentLocale="en-US">
              <Head blogPost={blogPost} blogPostLoading />
            </MockApp>
          );
        });

        expect(onHeadChange.mock.calls[0][0]).toMatchSnapshot();
      });
    });

    describe("after the blog post is loaded", () => {
      describe("if the blog post is successfully loaded", () => {
        it("pushes tags into <head> and they matches with the previous snapshots", async () => {
          const onHeadChange = jest.fn().mockName("onHeadChange");

          await act(async () => {
            create(
              <MockApp onHeadChange={onHeadChange} currentLocale="en-US">
                <Head blogPost={blogPost} />
              </MockApp>
            );
          });

          expect(onHeadChange.mock.calls[0][0]).toMatchSnapshot();
        });
      });

      describe("if the blog post is not found", () => {
        it("pushes tags into <head> and they matches with the previous snapshots", async () => {
          const onHeadChange = jest.fn().mockName("onHeadChange");

          await act(async () => {
            create(
              <MockApp onHeadChange={onHeadChange} currentLocale="en-US">
                <Head blogPost={null} />
              </MockApp>
            );
          });

          expect(onHeadChange.mock.calls[0][0]).toMatchSnapshot();
        });
      });
    });
  });

  describe('when currentLocale="ja-JP"', () => {
    describe("while loading the blog post", () => {
      it("pushes tags into <head> and they matches with the previous snapshots", async () => {
        const onHeadChange = jest.fn().mockName("onHeadChange");

        await act(async () => {
          create(
            <MockApp onHeadChange={onHeadChange} currentLocale="ja-JP">
              <Head blogPost={blogPost} blogPostLoading />
            </MockApp>
          );
        });

        expect(onHeadChange.mock.calls[0][0]).toMatchSnapshot();
      });
    });

    describe("after the blog post is loaded", () => {
      describe("if the blog post is successfully loaded", () => {
        it("pushes tags into <head> and they matches with the previous snapshots", async () => {
          const onHeadChange = jest.fn().mockName("onHeadChange");

          await act(async () => {
            create(
              <MockApp onHeadChange={onHeadChange} currentLocale="ja-JP">
                <Head blogPost={blogPost} />
              </MockApp>
            );
          });

          expect(onHeadChange.mock.calls[0][0]).toMatchSnapshot();
        });
      });

      describe("if the blog post is not found", () => {
        it("pushes tags into <head> and they matches with the previous snapshots", async () => {
          const onHeadChange = jest.fn().mockName("onHeadChange");

          await act(async () => {
            create(
              <MockApp onHeadChange={onHeadChange} currentLocale="ja-JP">
                <Head blogPost={null} />
              </MockApp>
            );
          });

          expect(onHeadChange.mock.calls[0][0]).toMatchSnapshot();
        });
      });
    });
  });
});

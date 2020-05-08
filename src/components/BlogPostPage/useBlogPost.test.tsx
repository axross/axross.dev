import {
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  jest,
} from "@jest/globals";
import * as React from "react";
import { act, create } from "react-test-renderer";
import MockApp from "../../../fixtures/MockApp";

describe("useBlogPost()", () => {
  const blogPostId = Symbol("BLOG_POST_ID");
  const locale = "LOCALE";
  const blogPost = Symbol("BLOG_POST");
  const isLoading = Symbol("IS_LOADING");
  const getBlogPost = Symbol("GET_BLOG_POST");
  const useQuery = jest
    .fn()
    .mockName("useQuery")
    .mockReturnValue({ data: blogPost, isLoading });

  let useBlogPost: typeof import("./useBlogPost").default;

  beforeAll(async () => {
    jest.mock("react-query", () => ({ useQuery }));

    useBlogPost = (await import("./useBlogPost")).default;
  });

  afterEach(() => {
    useQuery.mockClear();
  });

  it("calls useQuery() with the key, given blog post id, current locale, getBlogPost() and initial data", async () => {
    function Component() {
      useBlogPost({ id: blogPostId } as any);

      return null;
    }

    await act(async () => {
      create(
        <MockApp repositories={{ getBlogPost } as any} currentLocale={locale}>
          <Component />
        </MockApp>
      );
    });

    expect(useQuery).toHaveBeenCalledWith(
      ["blog-post", { id: blogPostId, locale }],
      getBlogPost,
      { initialData: null }
    );
  });

  it("returns [data, isLoading] that are the received values from useQuery()", async () => {
    let returnValue: any;

    function Component() {
      returnValue = useBlogPost({ id: blogPostId } as any);

      return null;
    }

    await act(async () => {
      create(
        <MockApp repositories={{ getBlogPost } as any} currentLocale={locale}>
          <Component />
        </MockApp>
      );
    });

    expect(returnValue).toEqual([blogPost, isLoading]);
  });
});

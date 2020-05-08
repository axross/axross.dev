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
import MockApp from "../../fixtures/MockApp";

describe("useBlogPosts()", () => {
  const locale = "LOCALE";
  const blogPosts = Symbol("BLOG_POSTS");
  const isLoading = Symbol("IS_LOADING");
  const getAllBlogPosts = Symbol("GET_ALL_BLOG_POSTS");
  const useQuery = jest
    .fn()
    .mockName("useQuery")
    .mockReturnValue({ data: blogPosts, isLoading });

  let useBlogPosts: typeof import("./useBlogPosts").default;

  beforeAll(async () => {
    jest.mock("react-query", () => ({ useQuery }));

    useBlogPosts = (await import("./useBlogPosts")).default;
  });

  afterEach(() => {
    useQuery.mockClear();
  });

  it("calls useQuery() with the key, current locale, getAllBlogPosts() and initial data", async () => {
    function Component() {
      useBlogPosts();

      return null;
    }

    await act(async () => {
      create(
        <MockApp
          repositories={{ getAllBlogPosts } as any}
          currentLocale={locale}
        >
          <Component />
        </MockApp>
      );
    });

    expect(useQuery).toHaveBeenCalledWith(
      ["blog-posts", { locale }],
      getAllBlogPosts,
      { initialData: [] }
    );
  });

  it("returns [data, isLoading] that are the received values from useQuery()", async () => {
    let returnValue: any;

    function Component() {
      returnValue = useBlogPosts();

      return null;
    }

    await act(async () => {
      create(
        <MockApp
          repositories={{ getAllBlogPosts } as any}
          currentLocale={locale}
        >
          <Component />
        </MockApp>
      );
    });

    expect(returnValue).toEqual([blogPosts, isLoading]);
  });
});

import * as React from "react";
import { act, create } from "react-test-renderer";
import LocaleContext from "../../contexts/LocaleContext";
import useBlogPost from "./useBlogPost";
import RepositoryContext from "../../contexts/RepositoryContext";

describe("useBlogPost()", () => {
  it("calls the given BlogPostRepository#getByIdAndLocale() through the context", async () => {
    const blogPost = Symbol("BLOG_POST");
    const currentLocale: any = Symbol("CURRENT_LOCALE");
    const blogPostId: any = Symbol("BLOG_POST_ID");
    const getByIdAndLocale = jest.fn(() => Promise.resolve(blogPost));

    const Component = () => {
      useBlogPost(blogPostId);

      return null;
    }

    await act(async () => {
      create(
        <RepositoryContext.Provider value={{ blogPostRepository: { getByIdAndLocale } } as any}>
          <LocaleContext.Provider value={{ currentLocale, availableLocales: [], isLoading: false }}>
            <Component />
          </LocaleContext.Provider>
        </RepositoryContext.Provider>
      );
    });

    expect(getByIdAndLocale).toBeCalledWith(blogPostId, currentLocale);
  });

  it("returns values in 2 steps: [null, true] -> [blogPost, false]", async () => {
    const blogPost = Symbol("BLOG_POST");
    const currentLocale: any = Symbol("CURRENT_LOCALE");
    const blogPostId: any = Symbol("BLOG_POST_ID");
    const getByIdAndLocale = jest.fn(() => Promise.resolve(blogPost));
    const returnValues: any[] = [];

    const Component = () => {
      returnValues.push(useBlogPost(blogPostId));

      return null;
    }

    await act(async () => {
      create(
        <RepositoryContext.Provider value={{ blogPostRepository: { getByIdAndLocale } } as any}>
          <LocaleContext.Provider value={{ currentLocale, availableLocales: [], isLoading: false }}>
            <Component />
          </LocaleContext.Provider>
        </RepositoryContext.Provider>
      );
    });

    expect(returnValues.length).toBe(2);
    expect(returnValues[0]).toEqual([null, true]);
    expect(returnValues[1]).toEqual([blogPost, false]);
  });

  it("returns values in 2 steps: [null, true] -> [null, false] when the repository threw", async () => {
    const currentLocale: any = Symbol("CURRENT_LOCALE");
    const blogPostId: any = Symbol("BLOG_POST_ID");
    const getByIdAndLocale = jest.fn(() => Promise.reject(new Error()));
    const returnValues: any[] = [];

    const Component = () => {
      returnValues.push(useBlogPost(blogPostId));

      return null;
    }

    await act(async () => {
      create(
        <RepositoryContext.Provider value={{ blogPostRepository: { getByIdAndLocale } } as any}>
          <LocaleContext.Provider value={{ currentLocale, availableLocales: [], isLoading: false }}>
            <Component />
          </LocaleContext.Provider>
        </RepositoryContext.Provider>
      );
    });

    expect(returnValues.length).toBe(2);
    expect(returnValues[0]).toEqual([null, true]);
    expect(returnValues[1]).toEqual([null, false]);
  });
});

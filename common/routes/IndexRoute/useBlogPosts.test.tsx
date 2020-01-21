import * as React from "react";
import { act, create } from "react-test-renderer";
import LocaleContext from "../../contexts/LocaleContext";
import RepositoryContext from "../../contexts/RepositoryContext";
import useBlogPosts from "./useBlogPosts";

describe("useBlogPosts()", () => {
  it("calls the given BlogPostRepository#getAllByLocale() through the context", async () => {
    const blogPosts = Symbol("BLOG_POSTS");
    const currentLocale: any = Symbol("CURRENT_LOCALE");
    const getAllByLocale = jest.fn(() => Promise.resolve(blogPosts));

    const Component = () => {
      useBlogPosts();

      return null;
    }

    await act(async () => {
      create(
        <RepositoryContext.Provider value={{ blogPostRepository: { getAllByLocale } } as any}>
          <LocaleContext.Provider value={{ currentLocale, availableLocales: [], isLoading: false }}>
            <Component />
          </LocaleContext.Provider>
        </RepositoryContext.Provider>
      );
    });

    expect(getAllByLocale).toBeCalledWith(currentLocale);
  });

  it("returns values in 2 steps: [[], true] -> [blogPosts, false]", async () => {
    const blogPosts = Symbol("BLOG_POSTS");
    const currentLocale: any = Symbol("CURRENT_LOCALE");
    const getAllByLocale = jest.fn(() => Promise.resolve(blogPosts));
    const returnValues: any[] = [];

    const Component = () => {
      returnValues.push(useBlogPosts());

      return null;
    }

    await act(async () => {
      create(
        <RepositoryContext.Provider value={{ blogPostRepository: { getAllByLocale } } as any}>
          <LocaleContext.Provider value={{ currentLocale, availableLocales: [], isLoading: false }}>
            <Component />
          </LocaleContext.Provider>
        </RepositoryContext.Provider>
      );
    });

    expect(returnValues.length).toBe(2);
    expect(returnValues[0]).toEqual([[], true]);
    expect(returnValues[1]).toEqual([blogPosts, false]);
  });

  it("returns values in 2 steps: [[], true] -> [[], false] when the repository threw", async () => {
    const currentLocale: any = Symbol("CURRENT_LOCALE");
    const getAllByLocale = jest.fn(() => Promise.reject(new Error()));
    const returnValues: any[] = [];

    const Component = () => {
      returnValues.push(useBlogPosts());

      return null;
    }

    await act(async () => {
      create(
        <RepositoryContext.Provider value={{ blogPostRepository: { getAllByLocale } } as any}>
          <LocaleContext.Provider value={{ currentLocale, availableLocales: [], isLoading: false }}>
            <Component />
          </LocaleContext.Provider>
        </RepositoryContext.Provider>
      );
    });

    expect(returnValues.length).toBe(2);
    expect(returnValues[0]).toEqual([[], true]);
    expect(returnValues[1]).toEqual([[], false]);
  });
});

import * as React from "react";
import { act, create } from "react-test-renderer";
import LocaleContext from "../../../contexts/LocaleContext";
import RepositoryContext from "../../../contexts/RepositoryContext";
import useBlogPosts from "./useBlogPosts";

describe("useBlogPosts()", () => {
  it("triggers rendering twice with the values [BlogPost[], true] -> [BlogPost[], false] after checking the cache, getting the blog posts from API and caching it", async () => {
    const blogPosts = Symbol();
    const currentLocale: any = Symbol();
    const blogPostApi = { getAllByLocale: jest.fn(() => Promise.resolve(blogPosts)) };
    const blogPostListCache = { has: jest.fn(() => false), get: jest.fn(), set: jest.fn() };
    const returnValues: any[] = [];

    const Component = () => {
      returnValues.push(useBlogPosts());

      return null;
    }

    await act(async () => {
      create(
        <RepositoryContext.Provider value={{ blogPostApi, blogPostListCache } as any}>
          <LocaleContext.Provider value={{ currentLocale, availableLocales: [], isLoading: false }}>
            <Component />
          </LocaleContext.Provider>
        </RepositoryContext.Provider>
      );
    });

    expect(returnValues.length).toBe(2);
    expect(returnValues[0]).toEqual([[], true]);
    expect(returnValues[1]).toEqual([blogPosts, false]);
    expect(blogPostApi.getAllByLocale).toHaveBeenCalledWith(currentLocale);
    expect(blogPostListCache.has).toHaveBeenCalledWith(currentLocale);
    expect(blogPostListCache.get).not.toHaveBeenCalled();
    expect(blogPostListCache.set).toHaveBeenCalledWith(currentLocale, blogPosts);
  });

  it("triggers rendering twice with the values [BlogPost[], true] -> [BlogPost[], false] (empty blog posts) after checking the cache and the API thrown", async () => {
    const currentLocale: any = Symbol();
    const blogPostApi = { getAllByLocale: jest.fn(() => Promise.reject(new Error())) };
    const blogPostListCache = { has: jest.fn(() => false), get: jest.fn(), set: jest.fn() };
    const returnValues: any[] = [];

    const Component = () => {
      returnValues.push(useBlogPosts());

      return null;
    }

    await act(async () => {
      create(
        <RepositoryContext.Provider value={{ blogPostApi, blogPostListCache } as any}>
          <LocaleContext.Provider value={{ currentLocale, availableLocales: [], isLoading: false }}>
            <Component />
          </LocaleContext.Provider>
        </RepositoryContext.Provider>
      );
    });

    expect(returnValues.length).toBe(2);
    expect(returnValues[0]).toEqual([[], true]);
    expect(returnValues[1]).toEqual([[], false]);
    expect(blogPostApi.getAllByLocale).toHaveBeenCalledWith(currentLocale);
    expect(blogPostListCache.has).toHaveBeenCalledWith(currentLocale);
    expect(blogPostListCache.get).not.toHaveBeenCalled();
    expect(blogPostListCache.set).not.toHaveBeenCalled();
  });

  it("triggers rendering once with the values [BlogPost[], false] after checking the cache and getting the blog posts from the cache", async () => {
    const blogPosts = Symbol();
    const currentLocale: any = Symbol();
    const blogPostApi = { getAllByLocale: jest.fn() };
    const blogPostListCache = { has: jest.fn(() => true), get: jest.fn(() => blogPosts), set: jest.fn() };
    const returnValues: any[] = [];

    const Component = () => {
      returnValues.push(useBlogPosts());

      return null;
    }

    await act(async () => {
      create(
        <RepositoryContext.Provider value={{ blogPostApi, blogPostListCache } as any}>
          <LocaleContext.Provider value={{ currentLocale, availableLocales: [], isLoading: false }}>
            <Component />
          </LocaleContext.Provider>
        </RepositoryContext.Provider>
      );
    });

    expect(returnValues.length).toBe(1);
    expect(returnValues[0]).toEqual([blogPosts, false]);
    expect(blogPostApi.getAllByLocale).not.toHaveBeenCalled();
    expect(blogPostListCache.has).toHaveBeenCalledWith(currentLocale);
    expect(blogPostListCache.get).toHaveBeenCalledWith(currentLocale);
    expect(blogPostListCache.set).not.toHaveBeenCalled();
  });  
});
